import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const AuthorizeNetRelay = () => {
  const formRef = useRef(null);
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const token = params.get('t');
  const mode = params.get('m');

  const isProduction = mode?.toUpperCase() === 'P';

  const postUrl = isProduction
    ? "https://accept.authorize.net/customer/manage"
    : "https://test.authorize.net/customer/manage";

  useEffect(() => {
    if (!token) return;

    // Ensures DOM is fully committed before submit
    requestAnimationFrame(() => {
      formRef.current?.submit();
    });
  }, [token]);

  if (!token) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <h2>Invalid or expired link.</h2>
        <p>Please request a new secure payment invitation.</p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '120px', fontFamily: 'sans-serif' }}>
      <h2>Connecting to Secure Payment Portal…</h2>
      <p>Please do not refresh the page.</p>

      <form ref={formRef} method="POST" action={postUrl}>
        <input type="hidden" name="token" value={token} />
      </form>

      <noscript>
        <div style={{ marginTop: 20 }}>
          <p>JavaScript is disabled. Click below to continue.</p>
          <form method="POST" action={postUrl}>
            <input type="hidden" name="token" value={token} />
            <button type="submit">Manage Payment Information</button>
          </form>
        </div>
      </noscript>
    </div>
  );
};

export default AuthorizeNetRelay;