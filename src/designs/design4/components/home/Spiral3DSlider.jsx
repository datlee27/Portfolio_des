import React, {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import {
  DoubleSide,
  LinearFilter,
  SRGBColorSpace,
  TextureLoader,
} from 'three';
import { WebGLErrorBoundary, WebGLFallback } from '../common/webgl-error-boundary';

// 7 Curated User Pinterest Slides
const DEFAULT_SPIRAL_SLIDES = [
  {
    src: '/assets/gallery/pin-3.jpg',
    alt: 'Fluid Motion • Illuminated Pages in Flow',
  },
  {
    src: '/assets/gallery/pin-4.jpg',
    alt: 'Digital in Nature • Screen on Wildflower Hill',
  },
  {
    src: '/assets/gallery/pin-5.jpg',
    alt: 'Cosmic Halo • Person in Flower Meadow under Vortex',
  },
  {
    src: '/assets/gallery/pin-11.jpg',
    alt: 'Ethereal Botanicals • Glowing Sunlit Daisies',
  },
  {
    src: '/assets/gallery/pin-12.jpg',
    alt: 'Surrealist Monolith • Mirror Portal in Green Hills',
  },
  {
    src: '/assets/gallery/pin-13.jpg',
    alt: 'Kinetic Vista • Speeding Train Window & Clouds',
  },
  {
    src: '/assets/gallery/pin-2.jpg',
    alt: 'Surrealist Path • Paintbrush Painting Ahead',
  },
];

const vertexShader = `
  uniform float uBend;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 transformed = position;
    float curve = 1.0 - cos(position.x * 3.14159265);
    transformed.z -= curve * uBend;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uImageAspect;
  uniform float uPlaneAspect;
  uniform float uBlur;
  varying vec2 vUv;

  vec2 coverUv(vec2 uv) {
    vec2 scale = vec2(1.0);
    if (uImageAspect > uPlaneAspect) {
      scale.x = uPlaneAspect / uImageAspect;
    } else {
      scale.y = uImageAspect / uPlaneAspect;
    }
    return (uv - 0.5) * scale + 0.5;
  }

  void main() {
    vec2 uv = coverUv(vUv);
    vec2 stepSize = vec2(0.0065) * uBlur;
    vec4 color = texture2D(uTexture, uv) * 0.23;

    color += texture2D(uTexture, uv + vec2(stepSize.x, 0.0)) * 0.12;
    color += texture2D(uTexture, uv - vec2(stepSize.x, 0.0)) * 0.12;
    color += texture2D(uTexture, uv + vec2(stepSize.x * 2.0, 0.0)) * 0.06;
    color += texture2D(uTexture, uv - vec2(stepSize.x * 2.0, 0.0)) * 0.06;
    color += texture2D(uTexture, uv + vec2(0.0, stepSize.y)) * 0.12;
    color += texture2D(uTexture, uv - vec2(0.0, stepSize.y)) * 0.12;
    color += texture2D(uTexture, uv + vec2(0.0, stepSize.y * 2.0)) * 0.06;
    color += texture2D(uTexture, uv - vec2(0.0, stepSize.y * 2.0)) * 0.06;
    color += texture2D(uTexture, uv + stepSize) * 0.025;
    color += texture2D(uTexture, uv - stepSize) * 0.025;

    float luminance = dot(color.rgb, vec3(0.2126, 0.7152, 0.0722));
    color.rgb = mix(vec3(luminance), color.rgb, 1.18);
    color.rgb = (color.rgb - 0.5) * 1.08 + 0.5;
    float brightness = 1.04 - min(uBlur * 0.025, 0.07);
    gl_FragColor = vec4(clamp(color.rgb * brightness, 0.0, 1.0), 1.0);
  }
`;

function wrappedPosition(value, length) {
  const wrapped = ((value % length) + length) % length;
  return wrapped > length / 2 ? wrapped - length : wrapped;
}

function imageAspect(texture) {
  const image = texture?.image;
  const width = image?.naturalWidth ?? image?.width ?? 1;
  const height = image?.naturalHeight ?? image?.height ?? 1;
  return width / Math.max(height, 1);
}

function SpiralScene({
  items,
  targetProgress,
  radius,
  verticalGap,
  cardWidth,
  cardAspectRatio,
  autoRotate,
  autoSpeed,
  smoothing,
  blurStrength,
  bend,
  _reducedMotion,
  lastInteraction,
}) {
  // Replicate 6 items to create continuous spiral depth
  const sceneItems = useMemo(
    () =>
      Array.from(
        { length: Math.max(items.length, 16) },
        (_, index) => items[index % items.length]
      ),
    [items]
  );

  const textures = useLoader(
    TextureLoader,
    sceneItems.map((item) => item.src)
  );

  const { gl, viewport } = useThree();
  const progress = useRef(0);
  const meshes = useRef([]);
  const materials = useRef([]);

  const uniforms = useMemo(
    () =>
      textures.map((texture) => ({
        uTexture: { value: texture },
        uImageAspect: { value: imageAspect(texture) },
        uPlaneAspect: { value: cardAspectRatio },
        uBlur: { value: 0 },
        uBend: { value: 0 },
      })),
    [cardAspectRatio, textures]
  );

  useEffect(() => {
    textures.forEach((texture) => {
      texture.colorSpace = SRGBColorSpace;
      texture.minFilter = LinearFilter;
      texture.magFilter = LinearFilter;
      texture.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
      texture.needsUpdate = true;
    });
  }, [gl, textures]);

  // Continuous smooth auto-rotation when user is idle
  useFrame((_state, delta) => {
    const timeSinceInteraction = performance.now() - lastInteraction.current;
    if (autoRotate && timeSinceInteraction > 1200) {
      targetProgress.current += autoSpeed * 0.35 * Math.min(delta, 0.05);
    }

    const frameScale = Math.min(delta * 60, 3);
    const ease = 1 - Math.pow(1 - smoothing, frameScale);
    progress.current += (targetProgress.current - progress.current) * ease;

    const factor = Math.max(viewport.factor || 1, 1);
    const isMobile = viewport.width < 7.5;

    // Responsive plane width & spiral radius for Mobile vs Desktop
    const planeWidth = isMobile
      ? viewport.width * 0.55
      : Math.min(cardWidth / factor, viewport.width * 0.25);
    const planeHeight = planeWidth / cardAspectRatio;
    const spiralRadius = isMobile
      ? viewport.width * 0.38
      : Math.min(radius / factor, viewport.width * 0.245);
    const gap = isMobile
      ? viewport.height * 0.092
      : Math.min(verticalGap / factor, viewport.height * 0.082);
    // Subtle, gentle curvature (reduced from 0.17 to 0.035 to eliminate heavy image warping)
    const activeBend = isMobile ? 0.025 : bend;
    const count = sceneItems.length;

    meshes.current.forEach((mesh, index) => {
      const material = materials.current[index];
      if (!mesh || !material) return;

      const position = wrappedPosition(index - progress.current, count);
      const angle = position * 0.78;
      const depth = (Math.cos(angle) + 1) / 2;
      const distance = Math.min(Math.abs(position) / (count * 0.43), 1);
      const scale = isMobile ? 0.78 + depth * 0.22 : 0.74 + depth * 0.26;

      mesh.position.set(
        Math.sin(angle) * spiralRadius,
        -position * gap,
        Math.cos(angle) * 2.55
      );
      mesh.rotation.set(0, Math.sin(angle) * -1.12, 0);
      mesh.scale.set(planeWidth * scale, planeHeight * scale, 1);

      if (material.uniforms?.uBlur) {
        material.uniforms.uBlur.value = Math.pow(distance, 1.28) * blurStrength;
      }
      if (material.uniforms?.uBend) {
        material.uniforms.uBend.value = planeWidth * activeBend;
      }
      if (material.uniforms?.uPlaneAspect) {
        material.uniforms.uPlaneAspect.value = cardAspectRatio;
      }
    });
  });

  return (
    <>
      {sceneItems.map((item, index) => (
        <mesh
          key={`${item.src}-${index}`}
          ref={(node) => {
            meshes.current[index] = node;
          }}
          frustumCulled={false}
        >
          <planeGeometry args={[1, 1, 48, 2]} />
          <shaderMaterial
            ref={(node) => {
              materials.current[index] = node;
            }}
            uniforms={uniforms[index]}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            side={DoubleSide}
            depthTest
            depthWrite
          />
        </mesh>
      ))}
    </>
  );
}

export default function Spiral3DSlider({
  items = DEFAULT_SPIRAL_SLIDES,
  className = '',
  radius = 235,
  verticalGap = 64,
  cardWidth = 255,
  cardAspectRatio = 3 / 2,
  autoRotate = true,
  autoSpeed = 0.48,
  scrollSensitivity = 0.0024,
  smoothing = 0.065,
  blurStrength = 1.65,
  bend = 0.035,
  fov = 44,
  ariaLabel = 'Interactive Spiral 3D Gallery',
}) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const targetProgress = useRef(0);
  const dragOffset = useRef(0);
  const lastWheelTime = useRef(0);
  const lastInteraction = useRef(0);
  const visible = useRef(false);
  const [isCanvasVisible, setIsCanvasVisible] = useState(false);

  const [isMobileScreen, setIsMobileScreen] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobileScreen(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Pointer Drag State for manual swipe on Desktop & Mobile
  const [isPointerDragging, setIsPointerDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const isHorizontalSwipeRef = useRef(false);

  // Early preload of slide textures into browser cache to avoid jank on scroll arrival
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const preloadImages = () => {
      items.forEach((item) => {
        if (!item?.src) return;
        const img = new Image();
        img.src = item.src;
      });
    };
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(preloadImages, { timeout: 1500 });
    } else {
      setTimeout(preloadImages, 300);
    }
  }, [items]);

  // Scroll listener tracking progress through the sticky section
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Generous rootMargin (900px) warms up Canvas & shaders early before user scrolls in
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isInter = Boolean(entry?.isIntersecting);
        visible.current = isInter;
        setIsCanvasVisible(isInter);
      },
      { rootMargin: '900px 0px', threshold: 0 }
    );
    observer.observe(section);

    let scrollRafId = null;
    const handlePageScroll = () => {
      if (scrollRafId) return;
      scrollRafId = requestAnimationFrame(() => {
        scrollRafId = null;
        if (!sectionRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();
        const windowH = window.innerHeight;
        const totalScrollDistance = sectionRef.current.offsetHeight - windowH;

        if (totalScrollDistance <= 0) return;

        const scrolled = -rect.top;
        const ratio = Math.max(0, Math.min(1, scrolled / totalScrollDistance));

        // Map scroll ratio to smooth rotation across all items (gives ~1.05 full cycles for natural pace)
        const totalRotations = items.length * 1.05;
        targetProgress.current = ratio * totalRotations + dragOffset.current;

        if (visible.current) {
          lastInteraction.current = performance.now();
        }
      });
    };

    window.addEventListener('scroll', handlePageScroll, { passive: true });
    handlePageScroll();

    return () => {
      observer.disconnect();
      if (scrollRafId) cancelAnimationFrame(scrollRafId);
      window.removeEventListener('scroll', handlePageScroll);
    };
  }, [items.length]);

  const handleWheel = (event) => {
    lastWheelTime.current = performance.now();
    lastInteraction.current = lastWheelTime.current;
    const delta = Math.sign(event.deltaY) * Math.min(Math.abs(event.deltaY), 120);
    dragOffset.current += delta * scrollSensitivity * 0.45;
    targetProgress.current += delta * scrollSensitivity * 0.45;
  };

  // Drag handlers with smart gesture detection (allows vertical scroll on mobile)
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    isHorizontalSwipeRef.current = false;
    lastInteraction.current = performance.now();
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    if (!isHorizontalSwipeRef.current) {
      if (Math.abs(dx) > 5 && Math.abs(dx) > Math.abs(dy)) {
        isHorizontalSwipeRef.current = true;
        setIsPointerDragging(true);
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch { }
      }
    }

    if (isHorizontalSwipeRef.current) {
      const delta = -dx * 0.0055;
      dragOffset.current += delta;
      targetProgress.current += delta;
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      lastInteraction.current = performance.now();
    }
  };

  const handlePointerUp = (e) => {
    if (isDraggingRef.current) {
      try {
        if (e.currentTarget.hasPointerCapture && e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch { }
      isDraggingRef.current = false;
      setIsPointerDragging(false);
      isHorizontalSwipeRef.current = false;
    }
  };

  if (!items || !items.length) return null;

  return (
    <section
      ref={sectionRef}
      id="d4-spiral-gallery"
      className={`des4-spiral-section ${className}`}
      style={{
        position: 'relative',
        height: isMobileScreen ? '135vh' : '170vh',
        background: '#0E0F12',
        color: '#ffffff',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        boxSizing: 'border-box',
      }}
    >
      {/* Sticky 100vh Full Viewport Frame */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          maxHeight: '100dvh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: isMobileScreen ? '24px 20px 24px' : '44px 56px 36px',
          boxSizing: 'border-box',
          userSelect: 'none',
        }}
      >
        {/* 1. Header Row (Top Left) */}
        <div
          style={{
            position: 'relative',
            zIndex: 15,
            pointerEvents: 'none',
            maxWidth: '1200px',
            width: '100%',
            margin: '0 auto',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-sans, "Inter", sans-serif)',
              fontSize: 'clamp(32px, 6vw, 84px)',
              fontWeight: 500,
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              color: '#ffffff',
              margin: '0 0 10px 0',
              textTransform: 'lowercase',
            }}
          >
            visual archive<span style={{ color: '#fe3c01' }}>*</span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans, "Inter", sans-serif)',
              fontSize: isMobileScreen ? 12.5 : 13.5,
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.65)',
              maxWidth: 480,
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            <span style={{ color: '#fe3c01', fontWeight: 700 }}>* </span>
            tactile prototypes, interactive experiments, and creative visual archive.
          </p>
        </div>

        {/* 2. 3D WebGL Canvas Stage (Full Background Viewport) */}
        <div
          ref={stageRef}
          role="region"
          aria-label={ariaLabel}
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            cursor: isPointerDragging ? 'grabbing' : 'grab',
            touchAction: 'pan-y',
            zIndex: 5,
          }}
        >
          <WebGLErrorBoundary fallback={<WebGLFallback className="des4-webgl-fallback" />}>
            <div style={{ position: 'absolute', inset: 0 }}>
              <Canvas
                frameloop={isCanvasVisible ? 'always' : 'never'}
                dpr={[1, 1.5]}
                camera={{
                  position: [0, 0, isMobileScreen ? 11 : 9.6],
                  fov: isMobileScreen ? 48 : fov,
                  near: 0.1,
                  far: 100,
                }}
                gl={{
                  alpha: true,
                  antialias: true,
                  powerPreference: 'high-performance',
                }}
              >
                <Suspense fallback={null}>
                  <SpiralScene
                    items={items}
                    targetProgress={targetProgress}
                    radius={radius}
                    verticalGap={verticalGap}
                    cardWidth={cardWidth}
                    cardAspectRatio={isMobileScreen ? 1.4 : cardAspectRatio}
                    autoRotate={autoRotate}
                    autoSpeed={autoSpeed}
                    smoothing={smoothing}
                    blurStrength={blurStrength}
                    bend={bend}
                    reducedMotion={{ current: prefersReducedMotion }}
                    lastInteraction={lastInteraction}
                  />
                </Suspense>
              </Canvas>
            </div>
          </WebGLErrorBoundary>
        </div>
      </div>
    </section>
  );
}
