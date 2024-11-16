import React, { useState } from 'react';
import { Github, Linkedin, Loader2, Mail, X } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUp: (data: any) => void;
}

export function SignUpModal({ isOpen, onClose, onSignUp }: SignUpModalProps) {
  const { loginWithPopup } = useAuth0();
  const [formData, setFormData] = useState({
    email: '',
    company: '',
    role: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setVerificationSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialSignUp = async (provider: string) => {
    try {
      await loginWithPopup({
        connection: provider,
        authorizationParams: {
          prompt: 'login',
          screen_hint: 'signup',
        },
      });
      onClose();
      onSignUp({ provider });
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  if (verificationSent) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-gradient-to-b from-slate-800 to-slate-900 p-8 rounded-2xl max-w-md w-full text-center shadow-xl border border-slate-700">
          <Mail className="h-16 w-16 text-blue-400 mx-auto mb-6 animate-bounce" />
          <h2 className="text-3xl font-bold text-white mb-4">Check Your Email</h2>
          <p className="text-gray-300 mb-6 text-lg">
            We've sent a verification link to <strong className="text-blue-400">{formData.email}</strong>. Click the link to complete your registration and access the platform.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold transition-all transform hover:scale-105"
          >
            Got it!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-gradient-to-b from-slate-800 to-slate-900 p-8 rounded-2xl max-w-md w-full shadow-xl border border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Start Your Free Trial</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="space-y-4 mb-8">
          <button
            onClick={() => handleSocialSignUp('github')}
            className="w-full flex items-center justify-center space-x-3 bg-[#24292e] hover:bg-[#2f363d] text-white p-4 rounded-xl transition-all transform hover:scale-105 font-semibold text-lg"
          >
            <Github className="h-6 w-6" />
            <span>Continue with GitHub</span>
          </button>
          
          <button
            onClick={() => handleSocialSignUp('google-oauth2')}
            className="w-full flex items-center justify-center space-x-3 bg-[#ea4335] hover:bg-[#d33828] text-white p-4 rounded-xl transition-all transform hover:scale-105 font-semibold text-lg"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
          
          <button
            onClick={() => handleSocialSignUp('linkedin')}
            className="w-full flex items-center justify-center space-x-3 bg-[#0077b5] hover:bg-[#006399] text-white p-4 rounded-xl transition-all transform hover:scale-105 font-semibold text-lg"
          >
            <Linkedin className="h-6 w-6" />
            <span>Continue with LinkedIn</span>
          </button>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-gradient-to-b from-slate-800 to-slate-900 text-slate-400 text-lg">
              Or continue with email
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Work Email</label>
            <input
              type="email"
              required
              disabled={isSubmitting}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 text-lg transition-all"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@company.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
            <input
              type="text"
              required
              disabled={isSubmitting}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 text-lg transition-all"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Your company name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
            <select
              required
              disabled={isSubmitting}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 text-lg transition-all"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="">Select your role</option>
              <option value="data_engineer">Data Engineer</option>
              <option value="data_architect">Data Architect</option>
              <option value="data_analyst">Data Analyst</option>
              <option value="data_scientist">Data Scientist</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 rounded-xl transition-all transform hover:scale-105 text-lg font-semibold disabled:opacity-50 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Processing...
              </>
            ) : (
              'Start Free Trial'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}