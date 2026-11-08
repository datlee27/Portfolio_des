import React, { Component } from 'react';

/**
 * ModalErrorBoundary — Catches any unexpected rendering errors inside project modals
 * so that a modal defect never crashes the entire page into a GlobalErrorBoundary screen.
 */
export default class ModalErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ModalErrorBoundary] Caught error inside project modal:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.onClose) {
        // Auto-close modal if it crashes
        setTimeout(() => this.props.onClose(), 50);
      }
      return null;
    }
    return this.props.children;
  }
}
