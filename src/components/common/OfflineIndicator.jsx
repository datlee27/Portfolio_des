import React, { useState, useEffect } from 'react';
import { WifiOff, Check } from 'lucide-react';

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(() =>
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      const timer = setTimeout(() => setShowReconnected(false), 4000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowReconnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !showReconnected) return null;

  return (
    <aside
      aria-label="Thông báo trạng thái mạng"
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 16px',
        borderRadius: 8,
        fontSize: 12.5,
        fontWeight: 600,
        fontFamily: 'var(--font-inter, sans-serif)',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s ease',
        backgroundColor: isOnline ? '#065f46' : '#18181b',
        color: isOnline ? '#d1fae5' : '#f4f4f5',
        border: isOnline ? '1px solid #10b981' : '1px solid #3f3f46',
      }}
    >
      {isOnline ? (
        <>
          <Check size={16} color="#34d399" />
          <span>Đã khôi phục kết nối Internet</span>
        </>
      ) : (
        <>
          <WifiOff size={16} color="#fe3c01" />
          <div>
            <div>Bạn đang ngoại tuyến</div>
            <div style={{ fontSize: 11, color: '#a1a1aa', fontWeight: 400 }}>
              Đang hiển thị dữ liệu tĩnh dự phòng
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
