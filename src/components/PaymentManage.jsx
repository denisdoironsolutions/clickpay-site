import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const REDIRECT_DELAY_MS = 6000;

const AuthorizeNetRelay = () => {
  const formRef = useRef(null);
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [readyToContinue, setReadyToContinue] = useState(false);

  const params = new URLSearchParams(location.search);
  const token = params.get('t');
  const mode = params.get('m');

  const isProduction = mode?.toUpperCase() === 'P';

  const postUrl = isProduction
    ? 'https://accept.authorize.net/customer/manage'
    : 'https://test.authorize.net/customer/manage';

  useEffect(() => {
    if (!token) return;

    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const nextProgress = Math.min((elapsed / REDIRECT_DELAY_MS) * 100, 100);
      setProgress(nextProgress);

      if (elapsed >= REDIRECT_DELAY_MS) {
        clearInterval(interval);
        setProgress(100);
        setReadyToContinue(true);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [token]);

  const handleContinue = () => {
    formRef.current?.submit();
  };

  if (!token) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <h2>Invalid or expired link.</h2>
        <p>Please request a new secure payment invitation.</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        <img src="/EmailHeader.png" alt="Header" style={styles.bannerTop} />

        <div style={styles.card}>
          <div style={styles.badge}>Secure Payment Portal</div>

          <h1 style={styles.title}>Establishing Secure Connection</h1>

          <p style={styles.message}>
            We are preparing your secure connection to Authorize.net.
          </p>

          <p style={styles.subMessage}>
            Thank you for using ClickPay.
          </p>

          <div style={styles.progressTrack}>
            <div
              style={{
                ...styles.progressFill,
                width: `${progress}%`,
              }}
            />
            {!readyToContinue && <div style={styles.progressShimmer} />}
          </div>

          {!readyToContinue ? (
            <div style={styles.statusRow}>
              <span style={styles.statusDot} />
              <span style={styles.statusText}>
                Establishing secure connection...
              </span>
            </div>
          ) : (
            <div style={{ marginTop: 24 }}>
              <p style={styles.statusText}>
                Your secure session is ready.
              </p>
              <button type="button" onClick={handleContinue} style={styles.button}>
                Continue to Secure Portal
              </button>
            </div>
          )}

          <form ref={formRef} method="POST" action={postUrl}>
            <input type="hidden" name="token" value={token} />
          </form>

          <noscript>
            <div style={{ marginTop: 24 }}>
              <p style={styles.message}>
                JavaScript is disabled. Click below to continue to the secure payment portal.
              </p>
              <form method="POST" action={postUrl}>
                <input type="hidden" name="token" value={token} />
                <button type="submit" style={styles.button}>
                  Continue to Secure Portal
                </button>
              </form>
            </div>
          </noscript>
        </div>

        <img src="/EmailFooter.png" alt="Footer" style={styles.bannerBottom} />
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #f4f7fb 0%, #eaf0f7 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    fontFamily:
      'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  shell: {
    width: '100%',
    maxWidth: '760px',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0,0,0,0.10)',
    background: '#ffffff',
  },
  bannerTop: {
    display: 'block',
    width: '100%',
    height: 'auto',
  },
  bannerBottom: {
    display: 'block',
    width: '100%',
    height: 'auto',
  },
  card: {
    padding: '40px 36px',
    textAlign: 'center',
    background: '#ffffff',
  },
  badge: {
    display: 'inline-block',
    marginBottom: '18px',
    padding: '8px 14px',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    color: '#1f4f82',
    background: '#eaf3ff',
    borderRadius: '999px',
  },
  title: {
    margin: '0 0 14px',
    fontSize: '32px',
    lineHeight: 1.15,
    fontWeight: 700,
    color: '#1c2733',
  },
  message: {
    margin: '0 0 10px',
    fontSize: '17px',
    lineHeight: 1.6,
    color: '#425466',
  },
  subMessage: {
    margin: '0 0 28px',
    fontSize: '15px',
    lineHeight: 1.6,
    color: '#6b7b8c',
  },
  progressTrack: {
    position: 'relative',
    width: '100%',
    maxWidth: '460px',
    height: '14px',
    margin: '0 auto 18px',
    background: '#e6edf5',
    borderRadius: '999px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: '999px',
    background: 'linear-gradient(90deg, #2c6fb7 0%, #4f95df 100%)',
    transition: 'width 30ms linear',
    position: 'relative',
    zIndex: 2,
  },
  progressShimmer: {
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(110deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0) 100%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.4s linear infinite',
    zIndex: 3,
    pointerEvents: 'none',
  },
  statusRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '8px',
  },
  statusDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: '#2c6fb7',
    boxShadow: '0 0 0 6px rgba(44, 111, 183, 0.12)',
    animation: 'pulse 1.6s ease-in-out infinite',
  },
  statusText: {
    fontSize: '14px',
    color: '#5a6b7d',
  },
  button: {
    marginTop: '14px',
    padding: '12px 18px',
    border: 'none',
    borderRadius: '10px',
    background: '#1f4f82',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
  },
};

export default AuthorizeNetRelay;