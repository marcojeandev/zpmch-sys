import { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  Building2,
  Calendar,
  FileText,
  Clock,
  DollarSign,
  Receipt,
  Activity,
  Megaphone,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  UserCircle,
  Heart,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronUp
} from 'lucide-react';

const SuperAdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Grouped navigation items
  const navGroups = [
    {
      label: 'Human Resources',
      icon: Users,
      items: [
        { to: '/super-admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/super-admin/employees', icon: Users, label: 'Employees' },
        { to: '/super-admin/departments', icon: Building2, label: 'Departments' },
        { to: '/super-admin/attendance', icon: Calendar, label: 'Attendance' },
        { to: '/super-admin/leave', icon: FileText, label: 'Leave Management' },
      ]
    },
    {
      label: 'Payroll & Finance',
      icon: DollarSign,
      items: [
        { to: '/super-admin/overtime', icon: Clock, label: 'Overtime' },
        { to: '/super-admin/payroll', icon: DollarSign, label: 'Payroll' },
        { to: '/super-admin/payslips', icon: Receipt, label: 'Payslips' },
      ]
    },
    {
      label: 'System Management',
      icon: Settings,
      items: [
        { to: '/super-admin/activity-logs', icon: Activity, label: 'Activity Logs' },
        { to: '/super-admin/announcements', icon: Megaphone, label: 'Announcements' },
        { to: '/super-admin/settings', icon: Settings, label: 'Settings' },
      ]
    }
  ];

  // State for expanded groups
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => {
    const defaultState: Record<string, boolean> = {};
    navGroups.forEach(group => {
      defaultState[group.label] = true;
    });
    return defaultState;
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [window.location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleGroup = (groupLabel: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupLabel]: !prev[groupLabel]
    }));
  };

  // Check if any item in a group is active
  const isGroupActive = (items: any[]) => {
    return items.some(item => window.location.pathname === item.to);
  };

  // Get icon color by label
  const getIconColor = (label: string) => {
    const colors: Record<string, string> = {
      'Dashboard': 'text-rose-400',
      'Employees': 'text-blue-400',
      'Departments': 'text-emerald-400',
      'Attendance': 'text-amber-400',
      'Leave Management': 'text-purple-400',
      'Overtime': 'text-indigo-400',
      'Payroll': 'text-green-400',
      'Payslips': 'text-cyan-400',
      'Activity Logs': 'text-orange-400',
      'Announcements': 'text-pink-400',
      'Settings': 'text-gray-400',
    };
    return colors[label] || 'text-gray-400';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ======== SIDEBAR ======== */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        bg-gray-900 text-white
        transform transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${sidebarCollapsed ? 'w-[72px]' : 'w-[280px]'}
        flex flex-col h-full shadow-2xl
      `}>
        {/* Brand */}
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-4 h-20 border-b border-gray-800/50`}>
          {!sidebarCollapsed ? (
            <>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/25 flex-shrink-0">
                  <img className="w-10 h-10 rounded-full" src="/final-logo.jpg" alt="" />
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight">ZP<span className="text-red-400">HR</span></h1>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Hospital HR System</p>
                </div>
              </div>
              <button 
                onClick={toggleSidebar}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/25 flex-shrink-0">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <button 
                onClick={toggleSidebar}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {/* User Profile */}
        {sidebarCollapsed ? (
          <div className="flex justify-center py-4 border-b border-gray-800/50">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-semibold text-sm">
                {user?.first_name?.charAt(0)?.toUpperCase() || 'A'}
                {user?.last_name?.charAt(0)?.toUpperCase() || 'A'}
              </span>
            </div>
          </div>
        ) : (
          <div className="px-4 py-4 border-b border-gray-800/50">
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gray-800/50">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold text-sm">
                  {user?.first_name?.charAt(0)?.toUpperCase() || 'A'}
                  {user?.last_name?.charAt(0)?.toUpperCase() || 'A'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {user?.role === 'super_admin' ? 'Super Admin' : user?.role || 'Admin'}
                </p>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
            </div>
          </div>
        )}

        {/* Navigation - with clean scrollbar */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-600">
          <style>{`
            /* For WebKit browsers (Chrome, Safari, Edge) */
            nav::-webkit-scrollbar {
              width: 4px;
            }
            nav::-webkit-scrollbar-track {
              background: transparent;
            }
            nav::-webkit-scrollbar-thumb {
              background: #374151;
              border-radius: 10px;
            }
            nav::-webkit-scrollbar-thumb:hover {
              background: #4B5563;
            }
            /* For Firefox */
            nav {
              scrollbar-width: thin;
              scrollbar-color: #374151 transparent;
            }
          `}</style>

          {navGroups.map((group) => {
            const isExpanded = expandedGroups[group.label];
            const hasActive = isGroupActive(group.items);
            const GroupIcon = group.icon;

            return (
              <div key={group.label} className="space-y-1">
                {/* Group Header */}
                {!sidebarCollapsed ? (
                  <button
                    onClick={() => toggleGroup(group.label)}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs font-semibold text-gray-400 uppercase tracking-wider hover:bg-gray-800/50 transition-colors ${
                      hasActive ? 'text-red-400' : ''
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <GroupIcon size={14} />
                      {group.label}
                    </span>
                    {isExpanded ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    )}
                  </button>
                ) : (
                  <div className="flex justify-center py-2">
                    <GroupIcon size={18} className="text-gray-500" />
                  </div>
                )}

                {/* Group Items */}
                {!sidebarCollapsed && isExpanded && (
                  <div className="space-y-1">
                    {group.items.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ml-2 ${
                            isActive
                              ? 'bg-gradient-to-r from-red-600/20 to-red-600/5 text-white shadow-sm'
                              : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <item.icon 
                              size={18} 
                              className={`${getIconColor(item.label)} ${isActive ? 'text-red-400' : ''} group-hover:text-white transition-colors flex-shrink-0`} 
                            />
                            <span className="text-sm font-medium flex-1">{item.label}</span>
                            {isActive && (
                              <span className="w-1 h-6 rounded-full bg-red-500" />
                            )}
                          </>
                        )}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className={`p-4 border-t border-gray-800/50 ${sidebarCollapsed ? 'flex justify-center' : ''}`}>
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl text-gray-300 hover:bg-red-600/20 hover:text-red-400 transition-all duration-200 group ${sidebarCollapsed ? 'justify-center w-full' : ''}`}
          >
            <LogOut size={20} className="group-hover:text-red-400 flex-shrink-0" />
            {!sidebarCollapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* ======== MAIN CONTENT ======== */}
      <main className={`flex-1 overflow-y-auto transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-0' : ''}`}>
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200/60">
          <div className="flex items-center justify-between px-6 h-16">
            <div className="flex items-center gap-4">
              <button 
                className="lg:hidden text-gray-600 hover:text-gray-900"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={24} />
              </button>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {navGroups.flatMap(g => g.items).find(item => item.to === window.location.pathname)?.label || 'Dashboard'}
                </h2>
                <p className="text-xs text-gray-500">
                  Welcome back, {user?.first_name || 'Admin'}!
                </p>
              </div>
            </div>

            {/* Right side - Search, Notifications, User */}
            <div className="flex items-center gap-3">
              {/* Search */}
              {/* <div className="hidden md:flex items-center relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-48 lg:w-64 pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50/50 hover:bg-white"
                />
              </div> */}

              {/* Notifications */}
              <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
                <Bell size={20} className="text-gray-500" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* User Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
                    <span className="text-white font-semibold text-xs">
                      {user?.first_name?.charAt(0)?.toUpperCase() || 'A'}
                      {user?.last_name?.charAt(0)?.toUpperCase() || 'A'}
                    </span>
                  </div>
                  <ChevronDown size={16} className={`text-gray-500 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Dropdown Menu */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-800">
                        {user?.first_name} {user?.last_name}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold text-red-600 bg-red-50 rounded-full">
                        {user?.role || 'Admin'}
                      </span>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => navigate('/super-admin/profile')}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <UserCircle size={16} className="text-gray-400" />
                        Profile
                      </button>
                      <button
                        onClick={() => navigate('/super-admin/settings')}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Settings size={16} className="text-gray-400" />
                        Settings
                      </button>
                      <hr className="my-1 border-gray-100" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SuperAdminLayout;