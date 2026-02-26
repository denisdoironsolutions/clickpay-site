import React, { useEffect, useRef } from 'react';

const AuthorizeNetRelay = () => {
  const formRef = useRef(null);
  
  // Get params from URL: ?t=TOKEN&m=P (or T)
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('t');
  const mode = queryParams.get('m'); // 'P' for Production, 'T' for Test

  // Determine the correct Authorize.Net endpoint
  const postUrl = mode?.toUpperCase() === 'P' 
    ? "https://accept.authorize.net/profile/manage" 
    : "https://test.authorize.net/profile/manage";

  useEffect(() => {
    // Only auto-submit if we have a token and the form is ready
    if (token && formRef.current) {
      formRef.current.submit();
    }
  }, [token]);

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-red-400 font-mono">
        <div className="p-8 border border-red-900/50 bg-red-950/20 rounded-xl">
          Error: Invalid or missing security token.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white">
      <div className="text-center animate-pulse">
        <h2 className="text-2xl font-bold mb-4">Redirecting to Secure {mode === 'P' ? 'Live' : 'Test'} Portal...</h2>
        <p className="text-slate-400">Please do not refresh the page.</p>
      </div>

      {/* Hidden form for the POST request */}
      <form 
        ref={formRef} 
        method="POST" 
        action={postUrl}
      >
        <input type="hidden" name="token" value={token} />
      </form>
    </div>
  );
};

export default AuthorizeNetRelay;