import React, { useState, useEffect, useRef, useMemo, useCallback, startTransition } from 'react';

const FRAME = 32;
const DEFAULT_SPRITE_URL =
    "https://raw.githubusercontent.com/kyrie25/spicetify-oneko/main/assets/oneko/oneko-classic.gif";

const WEBNEKO_SKINS = {
    Classic: "white",
    Black: "black",
    Gray: "gray",
    Calico: "calico",
    Robot: "robot",
    Peach: "peach",
    Colourful: "colourful",
    Earth: "earth",
    Air: "air",
    Water: "water",
    Fire: "fire",
    Spirit: "spirit",
    Rainbow: "rainbow",
    Silversky: "silversky",
    Orange: "orange",
    Ghetto: "ghetto",
    Neon: "neon",
    Pink: "pink",
    Ghost: "ghost",
    Lucky: "lucky",
    Moka: "moka",
    USA: "usa",
    Rose: "rose",
    Blue: "blue",
    Silver: "silver",
    Kuramecha: "kuramecha",
    Kina: "kina",
    Ace: "ace",
    Spooky: "spooky",
    Holiday: "holiday",
    Valentine: "valentine",
    Marmalade: "marmalade",
    Royal: "royal",
    Mermaid: "mermaid",
    Socks: "socks",
    Dave: "dave",
    Jess: "jess",
    Mike: "mike",
    Lucy: "lucy",
    Fancy: "fancy",
};

const WEBNEKO_BASE = "https://webneko.net";

const spriteSets = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    tired: [[-3, -2]],
    sleeping: [
        [-2, 0],
        [-2, -1],
    ],
    scratchSelf: [
        [-5, 0],
        [-6, 0],
        [-7, 0],
    ],
    scratchWallN: [
        [0, 0],
        [0, -1],
    ],
    scratchWallS: [
        [-7, -1],
        [-6, -2],
    ],
    scratchWallE: [
        [-2, -2],
        [-2, -3],
    ],
    scratchWallW: [
        [-4, 0],
        [-4, -1],
    ],
    N: [
        [-1, -2],
        [-1, -3],
    ],
    NE: [
        [0, -2],
        [0, -3],
    ],
    E: [
        [-3, 0],
        [-3, -1],
    ],
    SE: [
        [-5, -1],
        [-5, -2],
    ],
    S: [
        [-6, -3],
        [-7, -2],
    ],
    SW: [
        [-5, -3],
        [-6, -1],
    ],
    W: [
        [-4, -2],
        [-4, -3],
    ],
    NW: [
        [-1, 0],
        [-1, -1],
    ],
};

const useIsStaticRenderer = () => false;

export default function NekoCat(props) {
    const {
        followCursor = false,
        showToggle = true,
        showLabel = true,
        rememberChoice = true,
        speed = 10,
        fleeDistance = 120,
        fleeSpeedMultiplier = 1.35,
        size = "1x",
        zIndex = 9999,
        cat = "Black",
        customSprite = {
            src: "",
            alt: "Custom poodle sprite sheet",
        },
        idleBehavior = "sleep",
        catClickable = true,
        labelText = "You like poodles? 🐩",
        labelColor = "#000000",
        labelFont = {
            fontSize: "14px",
            variant: "Medium",
            letterSpacing: "-0.01em",
            lineHeight: "1.2em",
        },
        toggleCorner = "bottom-right",
        pillBackground = "#FFFFFF",
        pillBorderColor = "#EEEEEE",
        pillRadius = 999,
        pillPadding = "8px 10px",
        toggleOnColor = "#fe3c01",
        toggleOffColor = "#CCCCCC",
        toggleThumbColor = "#FFFFFF",
        showShadow = true,
        style,
    } = props;

    const isStatic = useIsStaticRenderer();
    const rootRef = useRef(null);
    const storageKey = "neko-cat-follow-choice";

    const mouseRef = useRef({ x: 0, y: 0 });
    const homeRef = useRef({ x: 0, y: 0 });
    const catRef = useRef({ x: 0, y: 0 });
    const behaviorRef = useRef("idle");
    const behaviorFrameRef = useRef(0);
    const idleTimeRef = useRef(0);
    const tickRef = useRef(0);
    const overrideTicksRef = useRef(0);
    const fleeTicksRef = useRef(0);
    const wasDisturbedRef = useRef(false);
    const undisturbedTicksRef = useRef(0);
    const returnHomeTicks = 5 * 60 * 10;

    const [renderTick, setRenderTick] = useState(0);
    const [isFollowing, setIsFollowing] = useState(followCursor);

    const sizeScale = useMemo(() => {
        if (size === "0.75x") return 0.75;
        if (size === "1.25x") return 1.25;
        if (size === "1.5x") return 1.5;
        if (size === "1.75x") return 1.75;
        if (size === "2x") return 2;
        if (size === "2.25x") return 2.25;
        if (size === "2.5x") return 2.5;
        if (size === "3x") return 3;
        if (size === "4x") return 4;
        return 1;
    }, [size]);

    const catPixelSize = FRAME * sizeScale;
    const isCustomSheet = Boolean(customSprite?.src);

    const frameNameMap = useMemo(
        () => ({
            idle: ["still"],
            alert: ["alert"],
            tired: ["yawn"],
            sleeping: ["sleep1", "sleep2"],
            scratchSelf: ["itch1", "itch2", "lickpaw"],
            scratchWallN: ["nscratch1", "nscratch2"],
            scratchWallS: ["sscratch1", "sscratch2"],
            scratchWallE: ["escratch1", "escratch2"],
            scratchWallW: ["wscratch1", "wscratch2"],
            N: ["nrun1", "nrun2"],
            NE: ["nerun1", "nerun2"],
            E: ["erun1", "erun2"],
            SE: ["serun1", "serun2"],
            S: ["srun1", "srun2"],
            SW: ["swrun1", "swrun2"],
            W: ["wrun1", "wrun2"],
            NW: ["nwrun1", "nwrun2"],
        }),
        []
    );

    const webnekoFolder = WEBNEKO_SKINS[cat] ?? "white";
    const frameUrl = useCallback(
        (name) => `${WEBNEKO_BASE}/${webnekoFolder}/${name}.gif`,
        [webnekoFolder]
    );

    useEffect(() => {
        if (isCustomSheet || typeof window === "undefined") return;
        const names = Object.values(frameNameMap).flat();
        const uniqueNames = Array.from(new Set(names));
        uniqueNames.forEach((name) => {
            const img = new window.Image();
            img.src = frameUrl(name);
        });
    }, [frameNameMap, frameUrl, isCustomSheet]);

    const measureHome = useCallback(() => {
        if (typeof window === "undefined") return;
        const el = rootRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = rect.left + rect.width / 2 - catPixelSize / 2;
        const y = rect.top + rect.height / 2 - catPixelSize / 2;
        homeRef.current = { x, y };
        if (catRef.current.x === 0 && catRef.current.y === 0) {
            catRef.current = { x, y };
        }
    }, [catPixelSize]);

    const getDirectionSet = useCallback(
        (dx, dy) => {
            const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
            if (angle >= -22.5 && angle < 22.5) return "E";
            if (angle >= 22.5 && angle < 67.5) return "SE";
            if (angle >= 67.5 && angle < 112.5) return "S";
            if (angle >= 112.5 && angle < 157.5) return "SW";
            if (angle >= 157.5 || angle < -157.5) return "W";
            if (angle >= -157.5 && angle < -112.5) return "NW";
            if (angle >= -112.5 && angle < -67.5) return "N";
            return "NE";
        },
        []
    );

    useEffect(() => {
        startTransition(() => setIsFollowing(followCursor));
    }, [followCursor]);

    useEffect(() => {
        if (isFollowing) {
            wasDisturbedRef.current = false;
            undisturbedTicksRef.current = 0;
        }
    }, [isFollowing]);

    useEffect(() => {
        if (typeof window === "undefined" || !rememberChoice) return;
        const saved = window.localStorage.getItem(storageKey);
        if (saved === null) return;
        startTransition(() => setIsFollowing(saved === "true"));
    }, [rememberChoice]);

    useEffect(() => {
        if (typeof window === "undefined" || !rememberChoice) return;
        window.localStorage.setItem(storageKey, String(isFollowing));
    }, [isFollowing, rememberChoice]);

    useEffect(() => {
        if (typeof window === "undefined" || isStatic) return;
        measureHome();

        const onMouseMove = (event) => {
            mouseRef.current = { x: event.clientX, y: event.clientY };
        };

        const onResizeOrScroll = () => {
            measureHome();
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("resize", onResizeOrScroll);
        window.addEventListener("scroll", onResizeOrScroll, { passive: true });

        const interval = window.setInterval(() => {
            tickRef.current += 1;
            let target = isFollowing
                ? {
                      x: mouseRef.current.x - catPixelSize / 2,
                      y: mouseRef.current.y - catPixelSize / 2,
                  }
                : homeRef.current;

            const toMouseX =
                mouseRef.current.x - (catRef.current.x + catPixelSize / 2);
            const toMouseY =
                mouseRef.current.y - (catRef.current.y + catPixelSize / 2);
            const mouseDistance = Math.hypot(toMouseX, toMouseY);
            const shouldFlee = !isFollowing && mouseDistance <= fleeDistance;

            if (shouldFlee) {
                fleeTicksRef.current = 4;
                wasDisturbedRef.current = true;
                undisturbedTicksRef.current = 0;
            } else if (fleeTicksRef.current > 0) {
                fleeTicksRef.current -= 1;
            } else if (!isFollowing && wasDisturbedRef.current) {
                undisturbedTicksRef.current += 1;
                if (undisturbedTicksRef.current >= returnHomeTicks) {
                    wasDisturbedRef.current = false;
                    undisturbedTicksRef.current = 0;
                }
            }

            const viewportMaxX = Math.max(0, window.innerWidth - catPixelSize);
            const viewportMaxY = Math.max(0, window.innerHeight - catPixelSize);

            if (!isFollowing && fleeTicksRef.current > 0) {
                const fleeMove = Math.max(1, speed * fleeSpeedMultiplier);
                const baseLen = Math.max(1, mouseDistance);
                let escapeX = -toMouseX / baseLen;
                let escapeY = -toMouseY / baseLen;
                const nextX = catRef.current.x + escapeX * fleeMove;
                const nextY = catRef.current.y + escapeY * fleeMove;
                const clampedNextX = Math.min(viewportMaxX, Math.max(0, nextX));
                const clampedNextY = Math.min(viewportMaxY, Math.max(0, nextY));
                const moved = Math.hypot(
                    clampedNextX - catRef.current.x,
                    clampedNextY - catRef.current.y
                );

                if (moved < fleeMove * 0.25) {
                    const perpA = { x: -escapeY, y: escapeX };
                    const perpB = { x: escapeY, y: -escapeX };
                    const testA = {
                        x: Math.min(
                            viewportMaxX,
                            Math.max(0, catRef.current.x + perpA.x * fleeMove)
                        ),
                        y: Math.min(
                            viewportMaxY,
                            Math.max(0, catRef.current.y + perpA.y * fleeMove)
                        ),
                    };
                    const testB = {
                        x: Math.min(
                            viewportMaxX,
                            Math.max(0, catRef.current.x + perpB.x * fleeMove)
                        ),
                        y: Math.min(
                            viewportMaxY,
                            Math.max(0, catRef.current.y + perpB.y * fleeMove)
                        ),
                    };
                    const distA = Math.hypot(
                        testA.x - catRef.current.x,
                        testA.y - catRef.current.y
                    );
                    const distB = Math.hypot(
                        testB.x - catRef.current.x,
                        testB.y - catRef.current.y
                    );
                    if (distA >= distB) {
                        escapeX = perpA.x;
                        escapeY = perpA.y;
                    } else {
                        escapeX = perpB.x;
                        escapeY = perpB.y;
                    }
                }

                catRef.current.x = Math.min(
                    viewportMaxX,
                    Math.max(0, catRef.current.x + escapeX * fleeMove)
                );
                catRef.current.y = Math.min(
                    viewportMaxY,
                    Math.max(0, catRef.current.y + escapeY * fleeMove)
                );
                behaviorRef.current = getDirectionSet(escapeX, escapeY);
                behaviorFrameRef.current = tickRef.current % 2;
                idleTimeRef.current = 0;
                overrideTicksRef.current = 0;
            } else {
                if (!isFollowing && wasDisturbedRef.current) {
                    target = { x: catRef.current.x, y: catRef.current.y };
                }
                const dx = target.x - catRef.current.x;
                const dy = target.y - catRef.current.y;
                const distance = Math.hypot(dx, dy);

                if (distance > 0.001 && distance > (isFollowing ? 48 : 4)) {
                    const move = Math.min(speed, distance);
                    catRef.current.x += (dx / distance) * move;
                    catRef.current.y += (dy / distance) * move;
                    catRef.current.x = Math.min(
                        viewportMaxX,
                        Math.max(0, catRef.current.x)
                    );
                    catRef.current.y = Math.min(
                        viewportMaxY,
                        Math.max(0, catRef.current.y)
                    );

                    behaviorRef.current = getDirectionSet(dx, dy);
                    behaviorFrameRef.current = tickRef.current % 2;
                    idleTimeRef.current = 0;
                    overrideTicksRef.current = 0;
                } else {
                    idleTimeRef.current += 1;

                    if (overrideTicksRef.current > 0) {
                        overrideTicksRef.current -= 1;
                        const frames = spriteSets[behaviorRef.current];
                        behaviorFrameRef.current =
                            (behaviorFrameRef.current + 1) % frames.length;
                    } else if (idleTimeRef.current < 10) {
                        behaviorRef.current = "idle";
                        behaviorFrameRef.current = 0;
                    } else if (idleTimeRef.current < 20) {
                        behaviorRef.current = "alert";
                        behaviorFrameRef.current = 0;
                    } else if (idleTimeRef.current < 30) {
                        behaviorRef.current = "tired";
                        behaviorFrameRef.current = 0;
                    } else {
                        const random = Math.random();
                        if (!isFollowing && idleBehavior === "sit") {
                            behaviorRef.current = "idle";
                            overrideTicksRef.current = 2;
                        } else if (random < 0.06) {
                            behaviorRef.current = "scratchSelf";
                            overrideTicksRef.current = 9;
                        } else if (random < 0.08) {
                            const walls = [
                                "scratchWallN",
                                "scratchWallS",
                                "scratchWallE",
                                "scratchWallW",
                            ];
                            behaviorRef.current =
                                walls[Math.floor(Math.random() * walls.length)];
                            overrideTicksRef.current = 6;
                        } else {
                            behaviorRef.current =
                                idleBehavior === "sit" ? "idle" : "sleeping";
                            overrideTicksRef.current = 12;
                        }
                        behaviorFrameRef.current = 0;
                        idleTimeRef.current = 20;
                    }
                }
            }

            startTransition(() => setRenderTick((value) => value + 1));
        }, 100);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("resize", onResizeOrScroll);
            window.removeEventListener("scroll", onResizeOrScroll);
            window.clearInterval(interval);
        };
    }, [
        isFollowing,
        speed,
        getDirectionSet,
        isStatic,
        measureHome,
        idleBehavior,
        fleeDistance,
        fleeSpeedMultiplier,
        catPixelSize,
        returnHomeTicks,
    ]);

    useEffect(() => {
        if (typeof window === "undefined" || isStatic) return;
        measureHome();
    }, [isFollowing, isStatic, measureHome]);

    const currentFrame = useMemo(() => {
        const frames = spriteSets[behaviorRef.current];
        return frames[behaviorFrameRef.current % frames.length];
    }, [renderTick]);

    const currentFrameName = useMemo(() => {
        const frames = frameNameMap[behaviorRef.current] ?? ["still"];
        return frames[behaviorFrameRef.current % frames.length] ?? "still";
    }, [frameNameMap, renderTick]);

    const catStyle = useMemo(() => {
        const [sx, sy] = currentFrame;
        return {
            width: catPixelSize,
            height: catPixelSize,
            backgroundImage: isCustomSheet
                ? `url("${customSprite?.src || DEFAULT_SPRITE_URL}")`
                : "none",
            backgroundPosition: `${sx * catPixelSize}px ${sy * catPixelSize}px`,
            backgroundSize: `${8 * catPixelSize}px ${4 * catPixelSize}px`,
            imageRendering: "pixelated",
            backgroundRepeat: "no-repeat",
            pointerEvents: catClickable ? "auto" : "none",
            cursor: catClickable ? "pointer" : "default",
            zIndex,
        };
    }, [
        currentFrame,
        isCustomSheet,
        customSprite,
        catPixelSize,
        zIndex,
        catClickable,
    ]);

    const fixedStyle = useMemo(() => {
        return {
            ...catStyle,
            position: "fixed",
            left: catRef.current.x,
            top: catRef.current.y,
        };
    }, [catStyle, renderTick]);

    const togglePositionStyle = useMemo(() => {
        const inset = 16;
        const pos = {
            position: "fixed",
            zIndex,
        };
        if (toggleCorner.includes("top")) pos.top = inset;
        if (toggleCorner.includes("bottom")) pos.bottom = inset;
        if (toggleCorner.includes("left")) pos.left = inset;
        if (toggleCorner.includes("right")) pos.right = inset;
        return pos;
    }, [toggleCorner, zIndex]);

    const onToggle = useCallback(() => {
        startTransition(() => setIsFollowing((value) => !value));
    }, []);

    const onCatClick = useCallback(() => {
        if (!catClickable) return;
        behaviorRef.current = Math.random() > 0.5 ? "scratchSelf" : "alert";
        behaviorFrameRef.current = 0;
        overrideTicksRef.current = 8;
        idleTimeRef.current = 0;
        startTransition(() => setRenderTick((value) => value + 1));
    }, [catClickable]);

    const onToggleKeyDown = useCallback(
        (event) => {
            if (event.key === " " || event.key === "Enter") {
                event.preventDefault();
                onToggle();
            }
        },
        [onToggle]
    );

    const toggleCard = (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: showLabel ? 10 : 0,
                background: pillBackground,
                border: `1px solid ${pillBorderColor}`,
                borderRadius: pillRadius,
                padding: pillPadding,
                boxShadow: showShadow ? "0 10px 24px rgba(0,0,0,0.12)" : "none",
                pointerEvents: "auto",
                justifyContent: showLabel ? "space-between" : "center",
            }}
        >
            {showLabel && (
                <span
                    style={{
                        color: labelColor,
                        fontSize: labelFont.fontSize,
                        letterSpacing: labelFont.letterSpacing,
                        lineHeight: labelFont.lineHeight,
                        fontWeight: labelFont.fontWeight,
                        fontStyle: labelFont.fontStyle,
                        fontFamily: labelFont.fontFamily,
                        whiteSpace: "nowrap",
                    }}
                >
                    {labelText}
                </span>
            )}
            <button
                type="button"
                role="switch"
                aria-checked={isFollowing}
                aria-label={labelText}
                onClick={onToggle}
                onKeyDown={onToggleKeyDown}
                style={{
                    width: 44,
                    height: 24,
                    borderRadius: 999,
                    border: "none",
                    background: isFollowing ? toggleOnColor : toggleOffColor,
                    position: "relative",
                    cursor: "pointer",
                    padding: 0,
                    outline: "none",
                }}
            >
                <span
                    aria-hidden
                    style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: toggleThumbColor,
                        position: "absolute",
                        top: 3,
                        left: isFollowing ? 23 : 3,
                        transition: "left 0.2s ease",
                    }}
                />
            </button>
        </div>
    );

    return (
        <div
            ref={rootRef}
            style={{
                position: "relative",
                minWidth: catPixelSize,
                minHeight: catPixelSize,
                overflow: "visible",
                ...style,
            }}
        >
            {isStatic ? (
                <>
                    {isCustomSheet ? (
                        <div
                            aria-hidden={!catClickable}
                            style={{
                                ...catStyle,
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                                marginLeft: -catPixelSize / 2,
                                marginTop: -catPixelSize / 2,
                            }}
                            onClick={onCatClick}
                        />
                    ) : (
                        <img
                            alt=""
                            aria-hidden={!catClickable}
                            src={frameUrl(currentFrameName)}
                            style={{
                                width: catPixelSize,
                                height: catPixelSize,
                                imageRendering: "pixelated",
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                                marginLeft: -catPixelSize / 2,
                                marginTop: -catPixelSize / 2,
                                pointerEvents: catClickable ? "auto" : "none",
                                cursor: catClickable ? "pointer" : "default",
                                zIndex,
                            }}
                            onClick={onCatClick}
                        />
                    )}
                    {showToggle && (
                        <div
                            style={{
                                ...togglePositionStyle,
                                pointerEvents: "none",
                            }}
                        >
                            {toggleCard}
                        </div>
                    )}
                </>
            ) : (
                <>
                    {isCustomSheet ? (
                        <div
                            aria-hidden={!catClickable}
                            style={fixedStyle}
                            onClick={onCatClick}
                            role={catClickable ? "button" : undefined}
                            tabIndex={catClickable ? 0 : -1}
                            onKeyDown={(event) => {
                                if (!catClickable) return;
                                if (
                                    event.key === " " ||
                                    event.key === "Enter"
                                ) {
                                    event.preventDefault();
                                    onCatClick();
                                }
                            }}
                        />
                    ) : (
                        <img
                            alt=""
                            aria-hidden={!catClickable}
                            src={frameUrl(currentFrameName)}
                            style={{
                                width: catPixelSize,
                                height: catPixelSize,
                                imageRendering: "pixelated",
                                position: "fixed",
                                left: catRef.current.x,
                                top: catRef.current.y,
                                pointerEvents: catClickable ? "auto" : "none",
                                cursor: catClickable ? "pointer" : "default",
                                zIndex,
                            }}
                            onClick={onCatClick}
                            role={catClickable ? "button" : undefined}
                            tabIndex={catClickable ? 0 : -1}
                            onKeyDown={(event) => {
                                if (!catClickable) return;
                                if (
                                    event.key === " " ||
                                    event.key === "Enter"
                                ) {
                                    event.preventDefault();
                                    onCatClick();
                                }
                            }}
                        />
                    )}
                    {showToggle && (
                        <div style={togglePositionStyle}>{toggleCard}</div>
                    )}
                </>
            )}
        </div>
    );
}
