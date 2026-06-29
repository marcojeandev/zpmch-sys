import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  CreditCard, 
  Fingerprint, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Shield,
  Award,
  Heart,
  Building2,
  FileText,
  UserCheck,
  BarChart3,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* ======== NAVBAR ======== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/25">
                <Heart className="w-5 h-5 text-white fill-white/20" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 leading-tight">
                  ZP<span className="text-red-600">HR</span>
                </h1>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">
                  Hospital HR System
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
                Login
              </Link>
              <Link to="/register" className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl hover:from-red-700 hover:to-rose-700 transition-all shadow-lg shadow-red-500/25 text-sm font-semibold">
                Register
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* ======== HERO ======== */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-red-50 via-white to-rose-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                PWA Ready • Secure • ISO Compliant
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600">
                  Zamboanga Puericulture
                </span>
                <br />
                <span className="text-gray-800">Maternity &amp; Children's</span>
                <br />
                <span className="text-red-600">Hospital</span>
              </h1>

              <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-lg">
                A fully integrated HR, Payroll, and Biometric Attendance Management System designed for healthcare excellence.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/login"
                  className="px-8 py-3.5 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl hover:from-red-700 hover:to-rose-700 transition-all shadow-xl shadow-red-500/30 font-semibold flex items-center gap-2"
                >
                  <UserCheck className="w-5 h-5" />
                  Employee Login
                </Link>
                <Link
                  to="/register"
                  className="px-8 py-3.5 bg-white text-gray-700 border-2 border-gray-200 rounded-xl hover:border-red-400 hover:text-red-600 transition-all font-semibold flex items-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  Register
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-red-600" />
                  Secured
                </span>
                <span className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-red-600" />
                  DOH Accredited
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-red-600" />
                  24/7 Support
                </span>
              </div>
            </div>

            {/* Hero Image / Illustration */}
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-rose-500/20 rounded-3xl blur-3xl -z-10" />
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-2xl p-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-red-50 rounded-2xl p-4 text-center">
                      <Users className="w-8 h-8 text-red-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900">200+</p>
                      <p className="text-xs text-gray-500">Employees</p>
                    </div>
                    <div className="bg-emerald-50 rounded-2xl p-4 text-center">
                      <Fingerprint className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900">100%</p>
                      <p className="text-xs text-gray-500">Biometric</p>
                    </div>
                    <div className="bg-purple-50 rounded-2xl p-4 text-center">
                      <Users className="w-8 h-8 text-red-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900">250+</p>
                      <p className="text-xs text-gray-500">Daily Patients</p>
                    </div>
                    <div className="bg-amber-50 rounded-2xl p-4 text-center">
                      <Calendar className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900">99.9%</p>
                      <p className="text-xs text-gray-500">Uptime</p>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-sm font-medium text-gray-700">Powered by <span className="text-red-600">ZP HR</span> System</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== FEATURES ======== */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold text-red-600 uppercase tracking-wider">Features</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              Complete HR &amp; Biometric Solution
            </h2>
            <p className="mt-4 text-gray-500">
              Everything you need to manage healthcare staff efficiently — from attendance to payroll.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-6 rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-xl transition-all bg-white hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 rounded-xl bg-red-50 group-hover:bg-red-100 transition-colors flex items-center justify-center mb-4">
                <Fingerprint className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Biometric Attendance</h3>
              <p className="mt-2 text-gray-500 text-sm leading-relaxed">
                Real-time fingerprint &amp; facial recognition attendance tracking with automatic sync.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-6 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-xl transition-all bg-white hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Employee Management</h3>
              <p className="mt-2 text-gray-500 text-sm leading-relaxed">
                Complete employee records, credentials, certifications, and department assignments.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-6 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all bg-white hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 rounded-xl bg-purple-50 group-hover:bg-purple-100 transition-colors flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Payroll Management</h3>
              <p className="mt-2 text-gray-500 text-sm leading-relaxed">
                Automated payroll computation, deductions, payslips, and government remittances.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-6 rounded-2xl border border-gray-100 hover:border-amber-200 hover:shadow-xl transition-all bg-white hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 rounded-xl bg-amber-50 group-hover:bg-amber-100 transition-colors flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Leave Management</h3>
              <p className="mt-2 text-gray-500 text-sm leading-relaxed">
                Streamlined leave requests, approvals, accruals, and balances tracking.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group p-6 rounded-2xl border border-gray-100 hover:border-rose-200 hover:shadow-xl transition-all bg-white hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 rounded-xl bg-rose-50 group-hover:bg-rose-100 transition-colors flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-rose-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Reports &amp; Analytics</h3>
              <p className="mt-2 text-gray-500 text-sm leading-relaxed">
                Real-time dashboards, custom reports, and data-driven decision making.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group p-6 rounded-2xl border border-gray-100 hover:border-cyan-200 hover:shadow-xl transition-all bg-white hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 group-hover:bg-cyan-100 transition-colors flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Role-Based Access</h3>
              <p className="mt-2 text-gray-500 text-sm leading-relaxed">
                Granular permissions for Admin, HR, Department Heads, and Employees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======== STATS BANNER ======== */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-600 to-rose-600">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <p className="text-4xl font-bold">500+</p>
              <p className="text-sm text-red-100 mt-1">Employees</p>
            </div>
            <div>
              <p className="text-4xl font-bold">100%</p>
              <p className="text-sm text-red-100 mt-1">Biometric</p>
            </div>
            <div>
              <p className="text-4xl font-bold">₱15M+</p>
              <p className="text-sm text-red-100 mt-1">Annual Payroll</p>
            </div>
            <div>
              <p className="text-4xl font-bold">99.9%</p>
              <p className="text-sm text-red-100 mt-1">Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* ======== LOCATION & CONTACT ======== */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <span className="text-sm font-semibold text-red-600 uppercase tracking-wider">Location</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                Visit Our Hospital
              </h2>
              <p className="mt-4 text-gray-500 leading-relaxed">
                Zamboanga Puericulture Maternity &amp; Children's Hospital is a trusted healthcare institution serving the Zamboanga community.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-500 text-sm">
                      Pura Brillantes St., Zamboanga City,<br />
                      Zamboanga Sibugay, Philippines
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Contact</p>
                    <p className="text-gray-500 text-sm">(062) 991-0379 loc 108</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-500 text-sm">zpc114@yahoo.com</p>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.app.goo.gl/esqUdyAb9hBQghnF7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl hover:from-red-700 hover:to-rose-700 transition-all shadow-lg shadow-red-500/25 font-medium"
              >
                <MapPin className="w-5 h-5" />
                Get Directions
              </a>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-xl">
              <div className="aspect-[4/3] w-full bg-gray-200">
                <iframe
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Zamboanga+City+Puericulture+Center+Livelihood+Complex&center=6.9073867,122.0757994&zoom=17"
                    className="w-full h-full"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Zamboanga Puericulture Maternity & Children's Hospital Location"
                    />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== CTA ======== */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-600 to-rose-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-10" />
        <div className="max-w-4xl mx-auto text-center text-white relative z-10">
          <Heart className="w-16 h-16 mx-auto mb-6 text-white/30" />
          <h2 className="text-3xl sm:text-4xl font-bold">
            Ready to Transform Your Hospital HR?
          </h2>
          <p className="mt-4 text-red-100 text-lg max-w-2xl mx-auto">
            Join the Zamboanga Puericulture family — modernize your HR, attendance, and payroll today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/login"
              className="px-8 py-3.5 bg-white text-red-600 rounded-xl hover:bg-gray-50 transition-all shadow-xl font-semibold flex items-center gap-2"
            >
              <UserCheck className="w-5 h-5" />
              Employee Login
            </Link>
            <Link
              to="/register"
              className="px-8 py-3.5 bg-red-700/30 text-white border-2 border-white/50 rounded-xl hover:bg-red-700/50 transition-all font-semibold flex items-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Register Now
            </Link>
          </div>
        </div>
      </section>

      {/* ======== FOOTER ======== */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">ZP<span className="text-red-400">HR</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              A complete HR, Payroll, and Biometric Attendance System for healthcare institutions.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.32-12.288c0-.209-.005-.417-.015-.624A9.945 9.945 0 0024 4.59z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/login" className="hover:text-red-400 transition-colors">Login</Link></li>
              <li><Link to="/register" className="hover:text-red-400 transition-colors">Register</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Hospital</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Pura Brillantes St.</li>
              <li>Zamboanga City</li>
              <li>(062) 991-0379 loc 108</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Data Protection</li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Zamboanga Puericulture Maternity &amp; Children's Hospital. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing;