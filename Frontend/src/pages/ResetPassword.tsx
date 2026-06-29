import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authApi } from '../services/api';
import { Lock, Eye, EyeOff, ArrowLeft, Heart, CheckCircle, AlertCircle } from 'lucide-react';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | ''>('');
  const navigate = useNavigate();

  // Password strength checker
  const checkPasswordStrength = (pass: string) => {
    if (pass.length === 0) {
      setPasswordStrength('');
      return;
    }
    if (pass.length < 6) {
      setPasswordStrength('weak');
      return;
    }
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    const checks = [hasUpperCase, hasLowerCase, hasNumber, hasSpecial].filter(Boolean).length;

    if (checks >= 3 && pass.length >= 8) {
      setPasswordStrength('strong');
    } else if (checks >= 2 && pass.length >= 6) {
      setPasswordStrength('medium');
    } else {
      setPasswordStrength('weak');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    checkPasswordStrength(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate token and email
    if (!token || !email) {
      toast.error('Invalid reset link. Please request a new one.');
      return;
    }

    // Validate password
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return;
    }

    if (password !== passwordConfirmation) {
      toast.error('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await authApi.resetPassword({ 
        token, 
        email, 
        password, 
        password_confirmation: passwordConfirmation 
      });
      toast.success('Password reset successfully! Please login.');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  // If token or email is missing
  if (!token || !email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-rose-50/30 p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-100 mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Invalid Reset Link</h2>
            <p className="text-gray-500 text-sm mt-2">
              The password reset link is invalid or has expired.
            </p>
            <Link
              to="/forgot-password"
              className="mt-6 inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              Request new link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 'strong': return 'bg-emerald-500';
      case 'medium': return 'bg-amber-500';
      case 'weak': return 'bg-red-500';
      default: return 'bg-gray-200';
    }
  };

  const getPasswordStrengthLabel = () => {
    switch (passwordStrength) {
      case 'strong': return 'Strong ✓';
      case 'medium': return 'Medium';
      case 'weak': return 'Weak';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-rose-50/30 p-4">
      <div className="w-full max-w-md">
        {/* Back to Login */}
        <div className="mb-6">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>

        {/* Reset Password Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-rose-600 shadow-lg shadow-red-500/25 mb-4">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
            <p className="text-gray-500 text-sm mt-1">
              Create a new password for your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50/50 hover:bg-white"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password.length > 0 && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 rounded-full ${getPasswordStrengthColor()}`}
                        style={{ 
                          width: passwordStrength === 'strong' ? '100%' : 
                                 passwordStrength === 'medium' ? '66%' : 
                                 passwordStrength === 'weak' ? '33%' : '0%' 
                        }}
                      />
                    </div>
                    <span className={`text-xs font-medium ${
                      passwordStrength === 'strong' ? 'text-emerald-600' :
                      passwordStrength === 'medium' ? 'text-amber-600' :
                      passwordStrength === 'weak' ? 'text-red-600' : 'text-gray-400'
                    }`}>
                      {getPasswordStrengthLabel()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Minimum 8 characters with uppercase, lowercase, number, and special character
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50/50 hover:bg-white"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl hover:from-red-700 hover:to-rose-700 transition-all duration-200 font-semibold shadow-lg shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Resetting...
                </>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Remember your password?{' '}
            <Link to="/login" className="text-red-600 hover:text-red-700 font-medium transition-colors">
              Sign in
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Zamboanga Puericulture Maternity &amp; Children's Hospital
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;