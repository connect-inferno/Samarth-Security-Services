'use client';

import { useEffect } from 'react';

/**
 * Last-resort boundary — catches errors thrown by the root layout itself.
 * It replaces the entire document, so it must render its own <html>/<body>
 * and cannot rely on the app's fonts or global CSS being available.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Fatal application error:', error.digest ?? error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#002451',
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
        }}
      >
        <div style={{ maxWidth: '40rem', padding: '0 1.5rem' }}>
          <p
            style={{
              margin: 0,
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#C8202F',
            }}
          >
            Samarth Security
          </p>
          <h1
            style={{
              margin: '1.25rem 0 0',
              fontSize: '2.25rem',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
            }}
          >
            Something went badly wrong.
          </h1>
          <p style={{ margin: '1.5rem 0 0', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)' }}>
            The page could not be loaded. Please refresh, or call us on +91 99600 99953.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: '2rem',
              padding: '1rem 2rem',
              border: 0,
              cursor: 'pointer',
              backgroundColor: '#C8202F',
              color: '#ffffff',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
