import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import SuperAdminLayout from './Layouts/SuperAdminLayout';

// Public pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// SuperAdmin pages (create these files)
import Dashboard from './pages/super-admin/Dashboard';
import Employees from './pages/super-admin/Employees';
import Departments from './pages/super-admin/Departments';
import Attendance from './pages/super-admin/Attendance';
import LeaveManagement from './pages/super-admin/LeaveManagement';
import Overtime from './pages/super-admin/Overtime';
import Payroll from './pages/super-admin/Payroll';
import Payslips from './pages/super-admin/Payslips';
import ActivityLogs from './pages/super-admin/ActivityLogs';
import Announcements from './pages/super-admin/Announcements';
import Settings from './pages/super-admin/Settings';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected routes (require authentication) */}
          <Route element={<ProtectedRoute />}>
            <Route element={<SuperAdminLayout />}>
              <Route path="/super-admin/dashboard" element={<Dashboard />} />
              <Route path="/super-admin/employees" element={<Employees />} />
              <Route path="/super-admin/departments" element={<Departments />} />
              <Route path="/super-admin/attendance" element={<Attendance />} />
              <Route path="/super-admin/leave" element={<LeaveManagement />} />
              <Route path="/super-admin/overtime" element={<Overtime />} />
              <Route path="/super-admin/payroll" element={<Payroll />} />
              <Route path="/super-admin/payslips" element={<Payslips />} />
              <Route path="/super-admin/activity-logs" element={<ActivityLogs />} />
              <Route path="/super-admin/announcements" element={<Announcements />} />
              <Route path="/super-admin/settings" element={<Settings />} />
            </Route>
          </Route>

          {/* Catch-all redirect to landing */}
          <Route path="*" element={<Landing />} />
        </Routes>
        <Toaster position="top-right" />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;