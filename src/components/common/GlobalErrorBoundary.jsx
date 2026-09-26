import React, { Component } from 'react';
import { AlertTriangle, RefreshCw, Trash2, Home } from 'lucide-react';

export class GlobalErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Global React Error Caught:', error, errorInfo);
    this.setState({ errorInfo });
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
        <div
          style={{
            minHeight: '100vh',
            width: '100%',
            backgroundColor: '#0c0a09',
            color: '#f5f5f4',
            fontFamily: 'var(--font-inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px 20px',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              maxWidth: 620,
              width: '100%',
              backgroundColor: '#1c1917',
              border: '1px solid #292524',
              borderRadius: 12,
              padding: '36px 32px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
              textAlign: 'center',
            }}
          >
            {/* Error Icon */}
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                color: '#ef4444',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}
            >
              <AlertTriangle size={28} />
            </div>

            {/* Error Title */}
            <h1
              style={{
                fontFamily: 'var(--font-outfit, sans-serif)',
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                margin: '0 0 10px 0',
              }}
            >
              Đã Xảy Ra Lỗi Kết Xuất Giao Diện
            </h1>

            <p
              style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: '#a8a29e',
                margin: '0 0 28px 0',
              }}
            >
              Một tiến trình giao diện gặp sự cố không mong muốn. Dữ liệu tĩnh và cấu hình gốc vẫn an toàn.
              Bạn có thể làm mới trang hoặc khôi phục dữ liệu mặc định.
            </p>

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 12,
                justifyContent: 'center',
                marginBottom: 24,
              }}
            >
              <button
                type="button"
                onClick={this.handleReload}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 20px',
                  backgroundColor: '#fe3c01',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 13.5,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                <RefreshCw size={15} />
                <span>Tải Lại Trang</span>
              </button>

              <button
                type="button"
                onClick={this.handleResetCache}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 20px',
                  backgroundColor: '#292524',
                  color: '#fecaca',
                  border: '1px solid #44403c',
                  borderRadius: 6,
                  fontSize: 13.5,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                title="Khôi phục dữ liệu gốc và xóa bộ nhớ cache cục bộ nếu bị lỗi xung đột"
              >
                <Trash2 size={15} />
                <span>Khôi Phục Dữ Liệu Gốc</span>
              </button>

              <button
                type="button"
                onClick={this.handleGoHome}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 20px',
                  backgroundColor: '#292524',
                  color: '#e7e5e4',
                  border: '1px solid #44403c',
                  borderRadius: 6,
                  fontSize: 13.5,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <Home size={15} />
                <span>Trang Chủ</span>
              </button>
            </div>

            {/* Error Trace Accordion */}
            {this.state.error && (
              <div style={{ textAlign: 'left', marginTop: 20 }}>
                <button
                  type="button"
                  onClick={() => this.setState({ showDetails: !this.state.showDetails })}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#78716c',
                    fontSize: 12,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    padding: 0,
                  }}
                >
                  {this.state.showDetails ? 'Ẩn chi tiết kỹ thuật' : 'Xem chi tiết lỗi (Technical Stack Trace)'}
                </button>

                {this.state.showDetails && (
                  <pre
                    style={{
                      marginTop: 10,
                      padding: 14,
                      borderRadius: 6,
                      backgroundColor: '#0c0a09',
                      color: '#f87171',
                      fontSize: 11,
                      lineHeight: 1.5,
                      overflowX: 'auto',
                      maxHeight: 180,
                      fontFamily: 'monospace',
                    }}
                  >
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;
