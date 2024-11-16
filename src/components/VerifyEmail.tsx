import React, { useEffect, useState } from 'react';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';

interface VerifyEmailProps {
  token: string;
  onVerificationComplete: () => void;
}

export function VerifyEmail({ token, onVerificationComplete }: VerifyEmailProps) {
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Simulate API call to verify token
        await new Promise(resolve => setTimeout(resolve, 2000));
        setStatus('success');
        setTimeout(onVerificationComplete, 1500);
      } catch (error) {
        setStatus('error');
      }
    };

    verifyToken();
  }, [token, onVerificationComplete]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 p-8 rounded-xl max-w-md w-full text-center">
        {status === 'verifying' && (
          <>
            <Loader2 className="h-12 w-12 text-blue-400 mx-auto animate-spin mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Verifying Your Email</h2>
            <p className="text-gray-300">Please wait while we verify your email address...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Email Verified!</h2>
            <p className="text-gray-300">Redirecting you to the platform...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Verification Failed</h2>
            <p className="text-gray-300 mb-6">The verification link is invalid or has expired.</p>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
            >
              Back to Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
}