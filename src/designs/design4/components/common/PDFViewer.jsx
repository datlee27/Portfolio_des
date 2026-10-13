import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  RotateCw,
  Download,
  FileText,
  Layout,
} from 'lucide-react';

const PDFJS_SCRIPT_URL = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
const PDFJS_WORKER_URL = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

let pdfjsScriptLoading = null;
function loadPdfJsScript() {
  if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
  if (pdfjsScriptLoading) return pdfjsScriptLoading;

  pdfjsScriptLoading = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${PDFJS_SCRIPT_URL}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve(window.pdfjsLib));
      existing.addEventListener('error', reject);
      return;
    }

    const script = document.createElement('script');
    script.src = PDFJS_SCRIPT_URL;
    script.async = true;
    script.onload = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
        resolve(window.pdfjsLib);
      } else {
        reject(new Error('pdfjsLib not found on window'));
      }
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return pdfjsScriptLoading;
}

export default function PDFViewer({
  pdfUrl = '/sample-cv.pdf',
  title = 'Lê Văn Đạt – Curriculum Vitae',
  downloadName = 'LeVanDat_CV.pdf',
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const [pdfDoc, setPdfDoc] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [rotation, setRotation] = useState(0);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [renderMode, setRenderMode] = useState('canvas'); // 'canvas' | 'native'

  // Load PDF Document
  useEffect(() => {
    let cancelled = false;
    setStatus('loading');

    loadPdfJsScript()
      .then((pdfjs) => {
        if (cancelled) return;
        return pdfjs.getDocument({ url: pdfUrl, withCredentials: false }).promise;
      })
      .then((doc) => {
        if (cancelled || !doc) return;
        setPdfDoc(doc);
        setNumPages(doc.numPages);
        setCurrentPage(1);
        setStatus('ready');
      })
      .catch((err) => {
        if (cancelled) return;
        console.warn('PDF.js render failed, switching to fallback:', err);
        setStatus('error');
        setErrorMsg(err?.message || 'Failed to render PDF using Canvas');
      });

    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  // Render Page onto Canvas
  const renderPage = useCallback(
    async (pageNum) => {
      if (!pdfDoc || status !== 'ready' || !canvasRef.current) return;

      try {
        const page = await pdfDoc.getPage(pageNum);
        const viewport = page.getViewport({ scale, rotation });
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;

        canvas.width = Math.floor(viewport.width * dpr);
        canvas.height = Math.floor(viewport.height * dpr);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const renderContext = {
          canvasContext: ctx,
          viewport,
          transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : null,
        };

        await page.render(renderContext).promise;
      } catch (err) {
        console.error('Error rendering page:', err);
      }
    },
    [pdfDoc, status, scale, rotation]
  );

  useEffect(() => {
    if (renderMode === 'canvas') {
      renderPage(currentPage);
    }
  }, [renderPage, currentPage, renderMode]);

  // Handlers
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < numPages) setCurrentPage((prev) => prev + 1);
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(3.0, Math.round((prev + 0.2) * 10) / 10));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(0.6, Math.round((prev - 0.2) * 10) / 10));
  };

  const handleFitWidth = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth - 80;
      setScale(Math.max(0.8, Math.min(2.0, containerWidth / 620)));
    }
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = downloadName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  return (
    <div
      ref={containerRef}
      className="des4-pdf-viewer-root"
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: 1100,
        margin: '0 auto',
        borderRadius: 16,
        overflow: 'hidden',
        background: '#0f172a',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* ─── Top Utility Banner (Instructions for User) ─── */}
      <div
        style={{
          background: 'linear-gradient(90deg, #1e293b, #0f172a)',
          padding: '10px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <FileText size={18} style={{ color: '#fe3c01' }} />
          <span style={{ color: '#ffffff', fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 700 }}>
            {title}
          </span>
          <span
            style={{
              background: 'rgba(254, 60, 1, 0.15)',
              color: '#ff6b3d',
              border: '1px solid rgba(254, 60, 1, 0.3)',
              fontSize: 10,
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: 100,
              fontFamily: 'monospace',
            }}
          >
            PDF PREVIEW
          </span>
        </div>

        {/* View Mode Toggle: Canvas vs Native Embed */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => setRenderMode(renderMode === 'canvas' ? 'native' : 'canvas')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#94a3b8',
              fontSize: 11,
              fontWeight: 600,
              fontFamily: 'var(--font-inter)',
              padding: '4px 10px',
              borderRadius: 6,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            title="Switch between Canvas renderer and Native Browser viewer"
          >
            <Layout size={14} />
            <span>{renderMode === 'canvas' ? 'Switch to Native Embed' : 'Switch to Canvas 3D'}</span>
          </button>
        </div>
      </div>

      {/* ─── Main Interactive Toolbar ─── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          padding: '10px 16px',
          background: '#1e293b',
          color: '#f8fafc',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* Left: Page Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            className="des4-pdf-btn"
            title="Previous Page"
            style={{ opacity: currentPage <= 1 ? 0.35 : 1 }}
          >
            <ChevronLeft size={16} />
          </button>

          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 12,
              fontWeight: 700,
              color: '#f8fafc',
              padding: '0 6px',
            }}
          >
            Page {currentPage} / {numPages || 1}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage >= numPages}
            className="des4-pdf-btn"
            title="Next Page"
            style={{ opacity: currentPage >= numPages ? 0.35 : 1 }}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Center: Zoom Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button onClick={handleZoomOut} className="des4-pdf-btn" title="Zoom Out">
            <ZoomOut size={16} />
          </button>

          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 12,
              fontWeight: 700,
              color: '#94a3b8',
              minWidth: 46,
              textAlign: 'center',
            }}
          >
            {Math.round(scale * 100)}%
          </span>

          <button onClick={handleZoomIn} className="des4-pdf-btn" title="Zoom In">
            <ZoomIn size={16} />
          </button>

          <button
            onClick={handleFitWidth}
            className="des4-pdf-btn"
            title="Fit to Width"
            style={{ fontSize: 11, fontWeight: 700, padding: '4px 8px', width: 'auto' }}
          >
            Fit Width
          </button>
        </div>

        {/* Right: Rotate, Download, Fullscreen */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button onClick={handleRotate} className="des4-pdf-btn" title="Rotate 90°">
            <RotateCw size={15} />
          </button>

          <button
            onClick={handleDownload}
            className="des4-pdf-btn"
            style={{
              background: '#fe3c01',
              color: '#ffffff',
              fontWeight: 700,
              padding: '0 12px',
              width: 'auto',
              gap: 6,
            }}
            title="Download PDF"
          >
            <Download size={14} />
            <span style={{ fontSize: 11 }}>Download</span>
          </button>

          <button onClick={handleFullscreen} className="des4-pdf-btn" title="Toggle Fullscreen">
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>
        </div>
      </div>

      {/* ─── PDF Canvas / Embed Display Area ─── */}
      <div
        style={{
          minHeight: 650,
          maxHeight: isFullscreen ? 'calc(100vh - 100px)' : '820px',
          overflow: 'auto',
          background: '#090d16',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '30px 16px',
          position: 'relative',
        }}
      >
        {renderMode === 'native' ? (
          /* Native Browser PDF Embed */
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0`}
            title="PDF Preview"
            style={{
              width: '100%',
              height: 750,
              border: 'none',
              borderRadius: 8,
              background: '#ffffff',
            }}
          />
        ) : status === 'loading' ? (
          /* Loading State */
          <div style={{ textAlign: 'center', color: '#94a3b8' }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                border: '3px solid rgba(254, 60, 1, 0.2)',
                borderTopColor: '#fe3c01',
                animation: 'des4Spin 0.8s linear infinite',
                margin: '0 auto 16px auto',
              }}
            />
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13 }}>
              Loading PDF Document…
            </p>
          </div>
        ) : status === 'error' ? (
          /* Fallback on Error */
          <div style={{ textAlign: 'center', padding: 24, maxWidth: 500 }}>
            <p style={{ color: '#ef4444', fontSize: 14, marginBottom: 12 }}>
              {errorMsg}
            </p>
            <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 20 }}>
              You can switch to native viewer or download the file directly.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button
                onClick={() => setRenderMode('native')}
                style={{
                  background: '#fe3c01',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                Use Native Browser Viewer
              </button>
              <button
                onClick={handleDownload}
                style={{
                  background: '#ffffff',
                  color: '#0f172a',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                Download PDF
              </button>
            </div>
          </div>
        ) : (
          /* Canvas View */
          <div
            style={{
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              borderRadius: 4,
              overflow: 'hidden',
              background: '#ffffff',
              transition: 'transform 0.2s ease',
            }}
          >
            <canvas ref={canvasRef} style={{ display: 'block' }} />
          </div>
        )}
      </div>

      {/* ─── Bottom Status / Helper ─── */}
      <div
        style={{
          background: '#090d16',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          padding: '8px 18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'monospace',
          fontSize: 11,
          color: '#64748b',
        }}
      >
        <span>
          📄 File: <code style={{ color: '#fe3c01' }}>{pdfUrl}</code>
        </span>
        <span>
          Official Resume: <strong style={{ color: '#e2e8f0' }}>Lê Văn Đạt</strong> (Software Engineering)
        </span>
      </div>
    </div>
  );
}
