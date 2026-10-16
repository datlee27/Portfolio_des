import React, {
  forwardRef,
  useRef,
  useCallback,
  useEffect,
  useMemo,
  useImperativeHandle,
  startTransition,
} from 'react';

/**
 * ============================================================================
 * 🌸 BẢNG THÔNG SỐ CẤU HÌNH HOVERBLOOM (BẠN CÓ THỂ TỰ ĐIỀU CHỈNH TẠI ĐÂY)
 * ============================================================================
 * Bạn có thể thay đổi trực tiếp các số bên dưới để điều chỉnh theo ý thích:
 */
export const BLOOM_CONFIG = {
  // 1. TỐC ĐỘ MỌC CÀNH (Mỗi bước tiến bao nhiêu px)
  // - 2.0: Cực chậm, uốn lượn từ từ
  // - 3.5: Vừa phải, tự nhiên (hiện tại)
  // - 5.0: Nhanh
  STEM_STEP_SIZE: 3.5,

  // Số bước mọc trên mỗi frame (thường là 1)
  STEM_STEPS_PER_FRAME: 1,

  // 2. KÍCH THƯỚC HOA CƠ SỞ (Bán kính cánh hoa tính bằng px)
  // - Giá trị càng lớn thì bông hoa nở ra càng to
  PETAL_RADIUS_UPRIGHT: 7.6, // Dáng vươn thẳng
  PETAL_RADIUS_CREEP: 6.0,   // Dáng dây leo

  // 3. TỶ LỆ KÍCH THƯỚC HOA NGẪU NHIÊN (Random nở hoa to - nhỏ)
  // Hệ thống chia làm 3 tầng: 40% nụ nhỏ, 45% hoa vừa, 15% hoa to
  SIZE_TIERS: {
    SMALL: { min: 0.55, max: 0.75 },   // Nụ hoa nhỏ
    MEDIUM: { min: 0.80, max: 1.10 },  // Bông vừa
    LARGE: { min: 1.20, max: 1.50 },   // Bông hoa lớn bung nở rực rỡ
  },

  // 4. TỐC ĐỘ BUNG NỞ CỦA HOA (Tính theo số frame, ở 60fps)
  // - 60 frame = ~1.0 giây (nở nhanh)
  // - 110 frame = ~1.8 giây (vừa vặn, mượt mà - hiện tại)
  // - 160 frame = ~2.6 giây (nở rất chậm)
  BLOOM_DURATION_FRAMES: 110,

  // 5. ĐỘ DÀY THÂN CÀNH
  STEM_STROKE_BASE: 1.8,

  // 6. TUỔI THỌ TỒN TẠI CỦA HOA TRÊN MÀN HÌNH (Số frame)
  BLOOM_LIFESPAN_MIN: 180,
  BLOOM_LIFESPAN_EXTRA: 120,
};

/**
 * HoverBloom Component
 */
const HoverBloom = forwardRef(function HoverBloom(props, ref) {
  const {
    spawnOn = 'move',
    growthMode = 'upright',
    spawnRate = 5,
    maxBlooms = 70,
    resetOnLeave = false,
    backgroundColor = '#F6F4EF',
    paperTint = '#EBE5D8',
    grid = true,
    gridSize = 24,
    gridDotSize = 1,
    gridColor = 'rgba(0,0,0,0.06)',
    paletteMode = 'mixed',
    useCustomPalette = false,
    customPalette = [],
    stemHue = 115,
    stemSaturation = 28,
    stemLightness = 35,
    flowerSaturation = 82,
    flowerLightness = 58,
    bloomScale = 0.85,
    blur = 0.45,
    watercolor = 0.6,
    trailFade = 0.06,
    style,
  } = props;

  const hostRef = useRef(null);
  const canvasRef = useRef(null);
  const paintCanvasRef = useRef(null);
  const rafRef = useRef(null);
  const runningRef = useRef(false);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const hoverRef = useRef(false);
  const lastPointerRef = useRef(null);
  const spawnAccRef = useRef(0);
  const stemsRef = useRef([]);
  const bloomsRef = useRef([]);

  const colorsForMode = useCallback((mode) => {
    switch (mode) {
      case 'warm':
        return [12, 22, 35, 5, 18];
      case 'cool':
        return [210, 245, 190, 275, 200];
      case 'pink':
        return [330, 345, 350, 315, 5];
      default: // 'mixed'
        return [350, 15, 330, 40, 300, 5, 345, 20];
    }
  }, []);

  const pick = useCallback((arr) => arr[(Math.random() * arr.length) | 0], []);
  const clamp01 = (v) => Math.max(0, Math.min(1, v));

  const hexToHsl = useCallback((hex) => {
    if (!hex) return null;
    const raw = hex.trim().replace(/^#/, '');
    const s = raw.length === 3 ? raw.split('').map((c) => c + c).join('') : raw;
    if (!/^([0-9a-fA-F]{6})$/.test(s)) return null;
    const r = parseInt(s.slice(0, 2), 16) / 255;
    const g = parseInt(s.slice(2, 4), 16) / 255;
    const b = parseInt(s.slice(4, 6), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    let h = 0;
    const l = (max + min) / 2;
    const sat = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
    if (d !== 0) {
      switch (max) {
        case r:
          h = ((g - b) / d) % 6;
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h *= 60;
      if (h < 0) h += 360;
    }
    return { h, s: sat * 100, l: l * 100 };
  }, []);

  const get2D = useCallback((c) => {
    return c.getContext('2d', { alpha: true, desynchronized: true }) || c.getContext('2d');
  }, []);

  const hsl = useCallback((c, a) => {
    const hh = ((c.h % 360) + 360) % 360;
    return `hsla(${hh}, ${Math.max(0, Math.min(100, c.s))}%, ${Math.max(
      0,
      Math.min(100, c.l)
    )}%, ${Math.max(0, Math.min(1, a))})`;
  }, []);

  const ensureCanvases = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (!paintCanvasRef.current) {
      paintCanvasRef.current = document.createElement('canvas');
    }
  }, []);

  const resizeToHost = useCallback(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const paint = paintCanvasRef.current;
    if (!host || !canvas || !paint) return;

    const rect = host.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width));
    const h = Math.max(1, Math.round(rect.height));
    const dpr = Math.max(1, Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1));
    const prev = sizeRef.current;

    if (prev.w === w && prev.h === h && prev.dpr === dpr) return;
    sizeRef.current = { w, h, dpr };

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    const prevW = paint.width;
    const prevH = paint.height;
    const snapshot = document.createElement('canvas');
    snapshot.width = prevW;
    snapshot.height = prevH;
    const snapCtx = snapshot.getContext('2d');
    if (snapCtx) snapCtx.drawImage(paint, 0, 0);

    paint.width = Math.floor(w * dpr);
    paint.height = Math.floor(h * dpr);
    const pctx = get2D(paint);
    if (pctx) {
      pctx.setTransform(1, 0, 0, 1, 0, 0);
      pctx.scale(dpr, dpr);
      pctx.lineCap = 'round';
      pctx.lineJoin = 'round';
      pctx.globalCompositeOperation = 'source-over';
      pctx.fillStyle = backgroundColor;
      pctx.fillRect(0, 0, w, h);

      if (prevW > 0 && prevH > 0) {
        const dx = (w * dpr - prevW) * 0.5;
        const dy = h * dpr - prevH;
        pctx.setTransform(1, 0, 0, 1, 0, 0);
        pctx.drawImage(snapshot, dx, dy);
        pctx.setTransform(1, 0, 0, 1, 0, 0);
        pctx.scale(dpr, dpr);

        const shiftX = dx / dpr;
        const shiftY = dy / dpr;
        for (const s of stemsRef.current) {
          s.x += shiftX;
          s.y += shiftY;
          for (const seg of s.segs) {
            seg.x += shiftX;
            seg.y += shiftY;
          }
        }
        for (const b of bloomsRef.current) {
          b.x += shiftX;
          b.y += shiftY;
        }
      }
    }
  }, [backgroundColor, get2D]);

  const clearAll = useCallback(() => {
    const paint = paintCanvasRef.current;
    const canvas = canvasRef.current;
    if (!paint || !canvas) return;

    const { w, h, dpr } = sizeRef.current;
    const pctx = get2D(paint);
    const dctx = get2D(canvas);
    if (!pctx || !dctx) return;

    pctx.setTransform(1, 0, 0, 1, 0, 0);
    pctx.clearRect(0, 0, paint.width, paint.height);
    pctx.scale(dpr, dpr);
    pctx.fillStyle = backgroundColor;
    pctx.fillRect(0, 0, w, h);

    dctx.setTransform(1, 0, 0, 1, 0, 0);
    dctx.clearRect(0, 0, canvas.width, canvas.height);

    stemsRef.current = [];
    bloomsRef.current = [];
  }, [backgroundColor, get2D]);

  const spawnStemAt = useCallback(
    (x, y, intensity) => {
      const { w, h } = sizeRef.current;
      if (w <= 0 || h <= 0) return;

      if (stemsRef.current.length + bloomsRef.current.length >= Math.max(1, maxBlooms)) {
        stemsRef.current.splice(0, Math.max(0, stemsRef.current.length - (maxBlooms - 1)));
        bloomsRef.current.splice(0, Math.max(0, bloomsRef.current.length - (maxBlooms - 1)));
      }

      let hue = 0;
      let sat = flowerSaturation;
      let light = flowerLightness;

      const canUseCustom = useCustomPalette && Array.isArray(customPalette) && customPalette.length > 0;
      if (canUseCustom) {
        const chosen = pick(customPalette);
        const parsed = hexToHsl(String(chosen));
        if (parsed) {
          hue = parsed.h;
          sat = parsed.s;
          light = parsed.l;
        }
      }

      if (!canUseCustom || hue === 0) {
        const hueChoices = colorsForMode(paletteMode);
        hue = pick(hueChoices) + (Math.random() * 10 - 5);
        sat = flowerSaturation;
        light = flowerLightness;
      }

      // 🌸 TÍNH KÍCH THƯỚC NGẪU NHIÊN THEO 3 TẦNG
      const randDist = Math.random();
      const tiers = BLOOM_CONFIG.SIZE_TIERS;
      let sizeMult;
      if (randDist < 0.4) {
        sizeMult = tiers.SMALL.min + Math.random() * (tiers.SMALL.max - tiers.SMALL.min);
      } else if (randDist < 0.85) {
        sizeMult = tiers.MEDIUM.min + Math.random() * (tiers.MEDIUM.max - tiers.MEDIUM.min);
      } else {
        sizeMult = tiers.LARGE.min + Math.random() * (tiers.LARGE.max - tiers.LARGE.min);
      }

      const scale = Math.max(0.2, bloomScale) * sizeMult * (0.8 + intensity * 0.35);

      const isCreep = growthMode === 'creep';
      const targetA = isCreep ? -Math.PI * 0.15 : -Math.PI / 2;
      const maxStemH = Math.min(185, h * 0.36);
      const len = (35 + Math.random() * maxStemH + (isCreep ? 30 : 0)) * (0.65 + scale * 0.35);
      const angle = targetA + (Math.random() - 0.5) * (isCreep ? 0.7 : 0.6);

      const s = {
        id: `${Date.now()}-${Math.random()}`,
        x: Math.max(w * 0.03, Math.min(w * 0.97, x + (Math.random() - 0.5) * 12)),
        y: Math.max(h * 0.1, Math.min(h * 0.98, y + 8 + Math.random() * 12)),
        targetLen: len,
        grown: 0,
        speed: 0.9 + Math.random() * 0.6,
        a: angle,
        targetA,
        segs: [{ x, y, a: angle }],
        done: false,
        hasFlower: false,
        type: isCreep ? (Math.random() * 4) | 0 : (Math.random() * 6) | 0,
        scale,
        hue,
        sat,
        light,
      };

      stemsRef.current.push(s);
    },
    [
      bloomScale,
      colorsForMode,
      customPalette,
      flowerLightness,
      flowerSaturation,
      growthMode,
      hexToHsl,
      maxBlooms,
      paletteMode,
      pick,
      useCustomPalette,
    ]
  );

  const addBloom = useCallback((x, y, type, scale, hue, sat, light) => {
    const b = {
      id: `${Date.now()}-${Math.random()}`,
      x,
      y,
      age: 0,
      maxAge: BLOOM_CONFIG.BLOOM_LIFESPAN_MIN + Math.random() * BLOOM_CONFIG.BLOOM_LIFESPAN_EXTRA,
      type,
      scale,
      hue,
      sat,
      light,
    };
    bloomsRef.current.push(b);
  }, []);

  const drawBlob = useCallback(
    (ctx, x, y, r, c, a, angle = 0, stretch = 1.6) => {
      const jitter = r * 0.25;
      for (let i = 0; i < 2; i++) {
        const jx = (Math.random() - 0.5) * jitter;
        const jy = (Math.random() - 0.5) * jitter;
        const rr = Math.max(0.6, r * (0.75 + Math.random() * 0.5));
        const rx = rr * stretch;
        const ry = rr * (0.55 + Math.random() * 0.55);
        const aa = angle + (Math.random() - 0.5) * 0.35;
        ctx.beginPath();
        ctx.ellipse(x + jx, y + jy, rx, ry, aa, 0, Math.PI * 2);
        ctx.fillStyle = hsl(
          {
            h: c.h + (Math.random() * 10 - 5),
            s: c.s,
            l: c.l + (Math.random() * 12 - 6),
          },
          a
        );
        ctx.fill();
      }
    },
    [hsl]
  );

  const stroke = useCallback(
    (ctx, x1, y1, x2, y2, c, w, a) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = hsl(
        {
          h: c.h + (Math.random() * 8 - 4),
          s: c.s,
          l: c.l + (Math.random() * 10 - 5),
        },
        a
      );
      ctx.lineWidth = Math.max(0.2, w * (0.8 + Math.random() * 0.5));
      ctx.stroke();
    },
    [hsl]
  );

  // 🌱 TÍNH BƯỚC MỌC CÀNH (Sử dụng config STEM_STEP_SIZE)
  const stepStem = useCallback((s) => {
    const stepSize = BLOOM_CONFIG.STEM_STEP_SIZE;
    const steps = BLOOM_CONFIG.STEM_STEPS_PER_FRAME;

    for (let k = 0; k < steps; k++) {
      if (s.grown >= s.targetLen) {
        s.done = true;
        break;
      }
      const last = s.segs[s.segs.length - 1];
      let a = last.a;
      a += ((s.targetA ?? -Math.PI / 2) - a) * 0.035 + (Math.random() - 0.5) * 0.09;
      const nx = last.x + Math.cos(a) * stepSize;
      const ny = last.y + Math.sin(a) * stepSize;
      s.segs.push({ x: nx, y: ny, a });
      s.grown += stepSize;
      if (ny <= 20) {
        s.done = true;
        break;
      }
    }
    if (s.grown >= s.targetLen) s.done = true;
  }, []);

  const drawStem = useCallback(
    (ctx, s) => {
      const segs = s.segs;
      if (segs.length < 2) return;

      const stemBase = { h: stemHue, s: stemSaturation, l: stemLightness };
      const stemAlt = { h: stemHue + 18, s: stemSaturation, l: Math.max(10, stemLightness - 8) };
      const maxI = segs.length - 1;
      const total = Math.max(1, Math.floor(s.targetLen / 5));
      const start = Math.max(1, maxI - 4);

      for (let i = start; i <= maxI; i++) {
        const prev = segs[i - 1];
        const cur = segs[i];
        const t = i / total;
        const w = (BLOOM_CONFIG.STEM_STROKE_BASE * (1 - t) + 0.6) * s.scale;
        stroke(ctx, prev.x, prev.y, cur.x, cur.y, stemAlt, w * 0.7, 0.16);
        stroke(ctx, prev.x, prev.y, cur.x, cur.y, stemBase, w, 0.13);

        const leafChance = s.targetA > -1.2 ? 0.15 : 0.08;
        if (i > 5 && i < maxI - 3 && Math.random() < leafChance) {
          const a = cur.a + (Math.random() < 0.5 ? -1 : 1) * (0.6 + Math.random() * 0.7);
          const len = (8 + Math.random() * 16) * s.scale;
          const tipX = cur.x + Math.cos(a) * len;
          const tipY = cur.y + Math.sin(a) * len;
          const leaf = {
            h: stemHue + (Math.random() * 10 - 5),
            s: stemSaturation,
            l: Math.min(65, stemLightness + 10),
          };
          drawBlob(ctx, (cur.x + tipX) * 0.5, (cur.y + tipY) * 0.5, (2.5 + Math.random() * 3) * s.scale, leaf, 0.08, a, 2.0);
          stroke(ctx, cur.x, cur.y, tipX, tipY, stemAlt, Math.max(0.3, w * 0.3), 0.13);
        }
      }
    },
    [drawBlob, stemHue, stemLightness, stemSaturation, stroke]
  );

  // 🌺 VẼ BÔNG HOA BUNG NỞ (Sử dụng config BLOOM_DURATION_FRAMES và PETAL_RADIUS)
  const drawBloom = useCallback(
    (ctx, b) => {
      b.age += 1;
      const duration = BLOOM_CONFIG.BLOOM_DURATION_FRAMES;
      const rawT = clamp01(b.age / duration);
      // Đường cong mượt cubic ease-out
      const t = 1 - Math.pow(1 - rawT, 2.2);
      const bloom = 0.15 + t * 0.85;

      const persist = !resetOnLeave;
      const fadeOut = persist ? 1 : clamp01((b.maxAge - b.age) / 25);
      const hue = b.hue;
      const fs = b.sat;
      const fl = b.light;
      const base = { h: hue, s: fs, l: fl };
      const light = { h: hue + 2, s: Math.max(20, fs - 10), l: Math.min(92, fl + 12) };
      const dark = { h: hue, s: Math.min(100, fs + 12), l: Math.max(16, fl - 22) };
      const stamen = { h: 40, s: 85, l: 52 };
      const s = b.scale;
      const headX = b.x + (Math.random() - 0.5) * 0.2;
      const headY = b.y - (5 + Math.random() * 4) * s * bloom;

      const creep = b.type <= 3;
      const petalCount = creep
        ? b.type === 0
          ? 12
          : b.type === 1
          ? 5
          : b.type === 2
          ? 8
          : 6
        : b.type === 1
        ? 5
        : b.type === 4
        ? 9
        : b.type === 3
        ? 7
        : 6;

      // 🌸 BÁN KÍNH CÁNH HOA TỪ CONFIG
      const baseRadius = creep ? BLOOM_CONFIG.PETAL_RADIUS_CREEP : BLOOM_CONFIG.PETAL_RADIUS_UPRIGHT;
      const radius = baseRadius * s * bloom;
      const spread = creep ? (b.type === 1 ? 1.2 : 1) : b.type === 2 ? 0.8 : 1;

      for (let i = 0; i < petalCount; i++) {
        if (Math.random() > 0.78) continue;
        const baseA =
          creep && b.type === 1
            ? -Math.PI / 2 + (i % 2 === 0 ? -0.45 : 0.45) + (Math.random() - 0.5) * 0.25
            : -Math.PI / 2 + (Math.PI * 2 * i) / petalCount;
        const a = baseA + (Math.random() - 0.5) * 0.35;
        const dist = radius * (0.75 + Math.random() * 0.85) * spread;
        const px = headX + Math.cos(a) * dist;
        const py = headY + Math.sin(a) * dist;
        const stretch = (creep ? 2.0 : 1.5) + Math.random() * (creep ? 0.8 : 0.7);
        const main = Math.random() > 0.65 ? light : base;

        drawBlob(ctx, px, py, radius * (0.5 + Math.random() * 0.22), main, fadeOut * 0.05 * (0.6 + watercolor * 0.8), a, stretch);
        drawBlob(ctx, (px + headX) * 0.5, (py + headY) * 0.5, radius * 0.38, dark, fadeOut * 0.035 * (0.7 + watercolor * 0.7), a + 0.1, stretch * 0.95);
      }

      const core = (2.8 + Math.random() * 2) * s * bloom;
      drawBlob(ctx, headX, headY + 1 * s, core * 1.05, dark, fadeOut * 0.055 * (0.7 + watercolor * 0.8), 0, 1.2);

      if (b.age > 15) {
        for (let i = 0; i < 6; i++) {
          if (Math.random() > 0.55) continue;
          const aa = Math.random() * Math.PI * 2;
          const dd = (1 + Math.random() * 4) * s * bloom;
          const dx = headX + Math.cos(aa) * dd;
          const dy = headY + Math.sin(aa) * dd;
          drawBlob(ctx, dx, dy, (0.8 + Math.random() * 1.2) * s * bloom, stamen, fadeOut * 0.065, aa, 1);
        }
      }
    },
    [clamp01, drawBlob, resetOnLeave, watercolor]
  );

  const render = useCallback(
    function render() {
      const canvas = canvasRef.current;
      const paint = paintCanvasRef.current;
      if (!canvas || !paint) return;

      const { w, h, dpr } = sizeRef.current;
      if (w <= 0 || h <= 0) return;

      const pctx = get2D(paint);
      const dctx = get2D(canvas);
      if (!pctx || !dctx) return;

      const persist = !resetOnLeave;
      if (!persist) {
        pctx.save();
        pctx.globalCompositeOperation = 'source-over';
        pctx.fillStyle = backgroundColor;
        pctx.globalAlpha = Math.max(0.02, clamp01(trailFade) * 0.35);
        pctx.setTransform(1, 0, 0, 1, 0, 0);
        pctx.scale(dpr, dpr);
        pctx.fillRect(0, 0, w, h);
        pctx.restore();
      }

      for (const s of stemsRef.current) {
        if (!s.done) {
          stepStem(s);
          drawStem(pctx, s);
        } else if (!s.hasFlower) {
          const segs = s.segs;
          const anchor = segs[Math.max(1, segs.length - 2)];
          const randS = Math.random();
          const tiers = BLOOM_CONFIG.SIZE_TIERS;
          const flowerMult =
            randS < 0.4
              ? tiers.SMALL.min + Math.random() * (tiers.SMALL.max - tiers.SMALL.min)
              : randS < 0.85
              ? tiers.MEDIUM.min + Math.random() * (tiers.MEDIUM.max - tiers.MEDIUM.min)
              : tiers.LARGE.min + Math.random() * (tiers.LARGE.max - tiers.LARGE.min);

          addBloom(anchor.x, anchor.y, s.type, Math.max(0.2, s.scale * flowerMult), s.hue, s.sat, s.light);

          // Nụ phụ bên hông cành
          if (segs.length > 22 && Math.random() > 0.65) {
            const node = segs[Math.max(5, segs.length - (8 + ((Math.random() * 8) | 0)))];
            const side = Math.random() < 0.5 ? -1 : 1;
            const a = node.a + side * (0.85 + Math.random() * 0.5);
            const budX = node.x + Math.cos(a) * (8 + Math.random() * 10) * s.scale;
            const budY = node.y + Math.sin(a) * (8 + Math.random() * 10) * s.scale;
            addBloom(
              budX,
              budY,
              (s.type + 1 + ((Math.random() * 3) | 0)) % 6,
              Math.max(0.16, s.scale * (0.35 + Math.random() * 0.25)),
              s.hue + 8,
              s.sat,
              s.light
            );
          }
          s.hasFlower = true;
        }
      }

      let anyBloomAlive = false;
      const blooms = bloomsRef.current;
      for (let i = 0; i < blooms.length; i++) {
        const b = blooms[i];
        if (b.age < b.maxAge) {
          drawBloom(pctx, b);
          anyBloomAlive = true;
        }
      }

      dctx.setTransform(1, 0, 0, 1, 0, 0);
      dctx.clearRect(0, 0, canvas.width, canvas.height);
      dctx.scale(dpr, dpr);

      const blurPx = Math.max(0, blur);
      const wc = clamp01(watercolor);
      dctx.filter = `blur(${blurPx * (0.5 + wc * 0.9)}px) contrast(${1.02 + wc * 0.08}) saturate(${1.05 + wc * 0.15})`;
      dctx.globalAlpha = 1;
      dctx.drawImage(paint, 0, 0, w * dpr, h * dpr, 0, 0, w, h);
      dctx.filter = 'none';

      stemsRef.current = stemsRef.current.filter((s) => !(s.done && s.hasFlower));
      if (bloomsRef.current.length > maxBlooms) {
        bloomsRef.current.splice(0, bloomsRef.current.length - maxBlooms);
      }

      const shouldContinue = hoverRef.current || stemsRef.current.length > 0 || anyBloomAlive;
      if (shouldContinue) {
        rafRef.current = requestAnimationFrame(render);
      } else {
        if (!persist) {
          clearAll();
        }
        runningRef.current = false;
        rafRef.current = null;
      }
    },
    [addBloom, backgroundColor, blur, clearAll, drawBloom, drawStem, get2D, maxBlooms, resetOnLeave, stepStem, trailFade, watercolor]
  );

  const ensureLoop = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (runningRef.current) return;
    runningRef.current = true;
    rafRef.current = requestAnimationFrame(render);
  }, [render]);

  const onPointerEnter = useCallback(() => {
    hoverRef.current = true;
    ensureLoop();
  }, [ensureLoop]);

  const onPointerLeave = useCallback(() => {
    hoverRef.current = false;
    lastPointerRef.current = null;
    spawnAccRef.current = 0;
    if (resetOnLeave) {
      clearAll();
    }
  }, [clearAll, resetOnLeave]);

  const onPointerMove = useCallback(
    (e) => {
      if (!hoverRef.current) return;
      const host = hostRef.current;
      if (!host) return;

      const rect = host.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
      const last = lastPointerRef.current;
      let intensity = 0.35;

      if (last) {
        const dt = Math.max(1, now - last.t);
        const dx = x - last.x;
        const dy = y - last.y;
        const speed = Math.sqrt(dx * dx + dy * dy) / dt;
        intensity = clamp01(0.25 + speed * 3.2);
      }
      lastPointerRef.current = { x, y, t: now };

      if (spawnOn === 'move') {
        const rate = Math.max(0, spawnRate);
        const dt = last ? Math.max(0, now - last.t) / 1000 : 1 / 60;
        spawnAccRef.current += rate * dt;
        while (spawnAccRef.current >= 1) {
          spawnAccRef.current -= 1;
          spawnStemAt(x + (Math.random() - 0.5) * 10, y + (Math.random() - 0.5) * 10, intensity);
        }
        ensureLoop();
      }
    },
    [ensureLoop, spawnOn, spawnRate, spawnStemAt]
  );

  const onPointerDown = useCallback(
    (e) => {
      const host = hostRef.current;
      if (!host) return;
      const rect = host.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spawnStemAt(x, y, 0.9);
      ensureLoop();
    },
    [ensureLoop, spawnStemAt]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    ensureCanvases();
    resizeToHost();
    const host = hostRef.current;
    if (!host) return;

    let ro = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        resizeToHost();
      });
      ro.observe(host);
    }
    return () => {
      if (ro) ro.disconnect();
    };
  }, [ensureCanvases, resizeToHost]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      runningRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    startTransition(() => {
      resizeToHost();
    });
  }, [backgroundColor, resizeToHost]);

  const gridBackground = useMemo(() => {
    if (!grid) return 'none';
    const s = Math.max(6, gridSize);
    const dot = Math.max(0.5, gridDotSize);
    return `radial-gradient(${gridColor} ${dot}px, transparent ${dot}px)`;
  }, [grid, gridColor, gridDotSize, gridSize]);

  useImperativeHandle(ref, () => ({
    clear() {
      clearAll();
    },
    exportImage() {
      try {
        const c = canvasRef.current;
        const p = paintCanvasRef.current;
        if (!c || !p) return null;
        const exportCanvas = document.createElement('canvas');
        exportCanvas.width = c.width;
        exportCanvas.height = c.height;
        const ctx = exportCanvas.getContext('2d');
        ctx.fillStyle = backgroundColor || '#F6F4EF';
        ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
        ctx.drawImage(p, 0, 0);
        ctx.drawImage(c, 0, 0);
        return exportCanvas.toDataURL('image/png');
      } catch (e) {
        console.warn('Failed exporting canvas:', e);
        return null;
      }
    },
  }));

  return (
    <div
      ref={hostRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor,
        backgroundImage: gridBackground,
        backgroundSize: grid ? `${Math.max(6, gridSize)}px ${Math.max(6, gridSize)}px` : undefined,
        boxShadow: `inset 0 0 80px rgba(0,0,0,0.03)`,
        touchAction: 'none',
        ...style,
      }}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerMove={onPointerMove}
      onPointerDown={onPointerDown}
      role="application"
      aria-label="Hover Bloom canvas"
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${paperTint} 0%, rgba(255,255,255,0) 62%)`,
          mixBlendMode: 'multiply',
          opacity: 0.55,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
});

export default HoverBloom;
