import React, { useMemo } from 'react';

/**
 * ScrollBlurByAki - Progressive Multi-Layer Backdrop Blur
 * Source: https://framer.com/m/ScrollBlurByAki-pwMQyG.js@SLso7ynHNmZV87OgToUp
 * Author: Tim Akihiro Heinrich
 *
 * Creates smooth progressive edge blur transitions where content dissolves
 * gracefully at the top or bottom of the viewport as the user scrolls.
 */

const LAYER_MIN = 1;
const LAYER_MAX = 8;
const QUALITY_LAYER_PRESETS = {
  low: 2,
  balanced: 3,
  high: 4,
};

function clampLayerCount(value) {
  return Math.min(LAYER_MAX, Math.max(LAYER_MIN, Math.round(value)));
}

function resolveLayerCount(quality, customLayers) {
  if (quality === 'custom') return clampLayerCount(customLayers);
  return clampLayerCount(QUALITY_LAYER_PRESETS[quality] || 2);
}

function getMaskDirection(direction) {
  return direction === 'top' ? 'to bottom' : 'to top';
}

function buildLayerMask(direction, index, total) {
  const segment = 100 / total;
  const edge = 100 - index * segment;
  const softStart = Math.max(0, edge - segment);
  return `linear-gradient(${getMaskDirection(direction)}, rgba(255,255,255,1) 0%, rgba(255,255,255,1) ${softStart}%, rgba(255,255,255,0) ${edge}%)`;
}

function buildLayerStyle(direction, index, total, blur) {
  const layerBlur = (blur * (index + 1)) / total;
  const blurFilter = `blur(${layerBlur}px)`;
  return {
    position: 'absolute',
    inset: 0,
    backdropFilter: blurFilter,
    WebkitBackdropFilter: blurFilter,
    maskImage: buildLayerMask(direction, index, total),
    WebkitMaskImage: buildLayerMask(direction, index, total),
    transform: 'translateZ(0)',
    pointerEvents: 'none',
  };
}

export default function ScrollBlurByAki({
  direction = 'bottom',
  blur = 10,
  quality = 'low',
  layers = 2,
  style = {},
  className = '',
}) {
  const effectiveLayers = resolveLayerCount(quality, layers);

  const layerElements = useMemo(() => {
    if (blur <= 0) return null;
    const elements = [];
    for (let i = 0; i < effectiveLayers; i++) {
      elements.push(
        <div key={i} style={buildLayerStyle(direction, i, effectiveLayers, blur)} />
      );
    }
    return elements;
  }, [direction, blur, effectiveLayers]);

  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    pointerEvents: 'none',
    contain: 'paint layout',
    ...style,
  };

  return (
    <div className={className} style={containerStyle} aria-hidden="true">
      {layerElements}
    </div>
  );
}
