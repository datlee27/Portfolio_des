import React, { Component } from 'react';

export class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('WebGL Rendering Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <WebGLFallback className={this.props.className} />
      );
    }
    return this.props.children;
  }
}

export function WebGLFallback({ className = '', style = {} }) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#090d16',
        color: '#94a3b8',
        padding: '60px 20px',
        textAlign: 'center',
        minHeight: 400,
        ...style,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: 'rgba(254, 60, 1, 0.15)',
          color: '#fe3c01',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 22,
          marginBottom: 16,
        }}
      >
        ✦
      </div>
      <h3 style={{ fontFamily: 'var(--font-outfit)', color: '#ffffff', fontSize: 20, margin: '0 0 8px 0' }}>
        3D Visual Stage
      </h3>
      <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, maxWidth: 420, lineHeight: 1.6, margin: 0 }}>
        WebGL hardware acceleration is paused. Enable hardware acceleration in your browser to experience the real-time 3D spiral physics.
      </p>
    </div>
  );
}
