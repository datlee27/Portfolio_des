import React, { Component } from 'react';
import ErrorPage from './ErrorPage';

export class GlobalErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[GlobalErrorBoundary] Caught React Component Error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  componentDidMount() {
    // Catch global unhandled promise rejections (async/await uncaught errors)
    this.handleUnhandledRejection = (event) => {
      console.error('[GlobalErrorBoundary] Unhandled Promise Rejection:', event.reason);
      const reasonError = event.reason instanceof Error ? event.reason : new Error(String(event.reason || 'Unhandled Async Rejection'));
      // Prevent browser default white crash if not handled
      if (!this.state.hasError) {
        this.setState({
          hasError: true,
          error: reasonError,
          errorInfo: { componentStack: 'Captured via window.onunhandledrejection' },
        });
      }
    };

    // Catch global window errors (script failures, network chunk fails)
    this.handleWindowError = (event) => {
      // Ignore routine resize or image load warnings
      if (!event.error && !event.message) return;
      console.error('[GlobalErrorBoundary] Global Window Error:', event.error || event.message);
      if (!this.state.hasError) {
        this.setState({
          hasError: true,
          error: event.error || new Error(event.message || 'Window Script Error'),
          errorInfo: { componentStack: `Line ${event.lineno}:${event.colno} in ${event.filename}` },
        });
      }
    };

    window.addEventListener('unhandledrejection', this.handleUnhandledRejection);
    window.addEventListener('error', this.handleWindowError);
  }

  componentWillUnmount() {
    if (this.handleUnhandledRejection) {
      window.removeEventListener('unhandledrejection', this.handleUnhandledRejection);
    }
    if (this.handleWindowError) {
      window.removeEventListener('error', this.handleWindowError);
    }
  }

  handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  handleResetCache = () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('portfolio_projects_override');
        localStorage.removeItem('portfolio_posts_override');
        localStorage.removeItem('portfolio_skills_override');
        localStorage.removeItem('portfolio_personal_override');
        localStorage.removeItem('portfolio_experience_override');
        sessionStorage.clear();
      } catch (e) {
        console.warn('Failed clearing cache:', e);
      }
      window.location.href = '/';
    }
  };

  handleGoHome = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          code="crash"
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onRetry={this.handleReload}
          onGoHome={this.handleGoHome}
          onResetCache={this.handleResetCache}
        />
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;
