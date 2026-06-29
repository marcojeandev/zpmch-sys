import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  Heart,
  UserCheck,
  Shield,
  CheckCircle
} from 'lucide-react';

const Register = () => {
  const [form, setForm] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    suffix: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | ''>('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Check password strength
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password match
    if (form.password !== form.password_confirmation) {
      toast.error('Passwords do not match.');
      return;
    }

    if (!agreeToTerms) {
      toast.error('Please agree to the Terms and Conditions.');
      return;
    }

    setLoading(true);
    try {
      await register(form);
      toast.success('Registration successful! Please check your email for verification.');
      navigate('/login');
    } catch (error) {
      // Error already handled in AuthContext
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-rose-50/30 p-4">
      <div className="w-full max-w-lg">
        {/* Back to Landing */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Register Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-rose-600 shadow-lg shadow-red-500/25 mb-4">
              <UserCheck className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
            <p className="text-gray-500 text-sm mt-1">
              Join the ZP HR System
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  First Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50/50 hover:bg-white"
                    placeholder="Juan"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50/50 hover:bg-white"
                  placeholder="Dela Cruz"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Middle Name <span className="text-gray-400">(optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="middle_name"
                    value={form.middle_name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50/50 hover:bg-white"
                    placeholder="Dela Cruz"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Suffix <span className="text-gray-400">(optional)</span>
                </label>
                <input
                    name="suffix"
                    value={form.suffix}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50/50 hover:bg-white"
                    placeholder="Jr., Sr., III"
                />
              </div>
            </div>


            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50/50 hover:bg-white"
                  placeholder="you@hospital.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
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
              {form.password.length > 0 && (
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
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="password_confirmation"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={form.password_confirmation}
                  onChange={handleChange}
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

            {/* Terms & Conditions */}
            <div className="flex items-start gap-3 mt-2">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                required
              />
              <label className="text-sm text-gray-600">
                I agree to the{' '}
                <Link to="/terms" className="text-red-600 hover:text-red-700 transition-colors font-medium">
                  Terms and Conditions
                </Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-red-600 hover:text-red-700 transition-colors font-medium">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
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
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
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

export default Register;