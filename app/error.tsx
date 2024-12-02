'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-blue-900 to-sky-900 flex items-center justify-center">
      <div className="text-center space-y-6">
        <h2 className="text-4xl font-bold text-white">Something went wrong!</h2>
        <p className="text-sky-200">{error.message || 'An unexpected error occurred'}</p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="bg-sky-500 text-white px-6 py-3 rounded-lg hover:bg-sky-600 transition-colors"
          >
            Try again
          </button>
          <Link 
            href="/"
            className="inline-block bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
} 