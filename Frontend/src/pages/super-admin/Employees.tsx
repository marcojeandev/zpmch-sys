import { useEffect, useState } from 'react';
import { employeeApi } from '../../services/super-admin/Employee';
import toast from 'react-hot-toast';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Users,
  UserCheck,
  UserX,
  User,
  X,
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
  UserPlus,
  FileText,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  DollarSign,
  Shield,
  Building2,
  Award,
  Filter,
  ChevronDown,
  MoreVertical
} from 'lucide-react';

interface Employee {
  id: number;
  employee_id: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  suffix: string | null;
  email: string;
  contact_number: string | null;
  gender: string | null;
  civil_status: string | null;
  date_of_birth: string | null;
  department_id: number | null;
  job_title_id: number | null;
  employment_type_id: number | null;
  supervisor_id: number | null;
  date_hired: string | null;
  employment_status: string;
  basic_salary: number;
  allowance: number;
  deductions: number;
  net_pay: number;
  profile_picture: string | null;
  department?: { id: number; name: string; code: string };
  job_title?: { id: number; title: string; code: string };
  employment_type?: { id: number; name: string; code: string };
  supervisor?: { id: number; first_name: string; last_name: string };
  account_status?: string;
}

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [viewingEmployee, setViewingEmployee] = useState<Employee | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    suffix: '',
    email: '',
    contact_number: '',
    employment_status: 'probationary',
    department_id: '',
    job_title_id: '',
    employment_type_id: '',
    supervisor_id: '',
    date_hired: '',
    basic_salary: '',
    allowance: '',
    deductions: '',
    password: '',
    password_confirmation: '',
  });

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const response = await employeeApi.getAll();
      const data = response.data?.data || response.data || [];
      setEmployees(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openCreateModal = () => {
    setEditingEmployee(null);
    setFormData({
      first_name: '',
      middle_name: '',
      last_name: '',
      suffix: '',
      email: '',
      contact_number: '',
      employment_status: 'probationary',
      department_id: '',
      job_title_id: '',
      employment_type_id: '',
      supervisor_id: '',
      date_hired: '',
      basic_salary: '',
      allowance: '',
      deductions: '',
      password: '',
      password_confirmation: '',
    });
    setShowModal(true);
  };

  const openEditModal = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData({
      first_name: employee.first_name,
      middle_name: employee.middle_name || '',
      last_name: employee.last_name,
      suffix: employee.suffix || '',
      email: employee.email,
      contact_number: employee.contact_number || '',
      employment_status: employee.employment_status,
      department_id: employee.department_id?.toString() || '',
      job_title_id: employee.job_title_id?.toString() || '',
      employment_type_id: employee.employment_type_id?.toString() || '',
      supervisor_id: employee.supervisor_id?.toString() || '',
      date_hired: employee.date_hired || '',
      basic_salary: employee.basic_salary?.toString() || '',
      allowance: employee.allowance?.toString() || '',
      deductions: employee.deductions?.toString() || '',
      password: '',
      password_confirmation: '',
    });
    setShowModal(true);
  };

  const openViewModal = (employee: Employee) => {
    setViewingEmployee(employee);
    setShowViewModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        first_name: formData.first_name,
        middle_name: formData.middle_name || null,
        last_name: formData.last_name,
        suffix: formData.suffix || null,
        email: formData.email,
        contact_number: formData.contact_number || null,
        employment_status: formData.employment_status,
        department_id: formData.department_id ? parseInt(formData.department_id) : null,
        job_title_id: formData.job_title_id ? parseInt(formData.job_title_id) : null,
        employment_type_id: formData.employment_type_id ? parseInt(formData.employment_type_id) : null,
        supervisor_id: formData.supervisor_id ? parseInt(formData.supervisor_id) : null,
        date_hired: formData.date_hired || null,
        basic_salary: parseFloat(formData.basic_salary) || 0,
        allowance: parseFloat(formData.allowance) || 0,
        deductions: parseFloat(formData.deductions) || 0,
        password: formData.password || undefined,
        password_confirmation: formData.password_confirmation || undefined,
      };

      if (editingEmployee) {
        await employeeApi.update(editingEmployee.id, payload);
        toast.success('Employee updated successfully!');
      } else {
        await employeeApi.create(payload);
        toast.success('Employee created successfully!');
      }
      setShowModal(false);
      fetchEmployees();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const handleApprove = async (id: number) => {
    if (!confirm('Approve this employee?')) return;
    try {
      await employeeApi.approve(id);
      toast.success('Employee approved successfully!');
      fetchEmployees();
    } catch (error) {
      toast.error('Failed to approve employee');
    }
  };

  const handleDisapprove = async (id: number) => {
    if (!confirm('Disapprove this employee?')) return;
    try {
      await employeeApi.disapprove(id);
      toast.success('Employee disapproved successfully!');
      fetchEmployees();
    } catch (error) {
      toast.error('Failed to disapprove employee');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this employee?')) return;
    try {
      await employeeApi.delete(id);
      toast.success('Employee deleted successfully!');
      fetchEmployees();
    } catch (error) {
      toast.error('Failed to delete employee');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'active': 'bg-emerald-50 text-emerald-700 border border-emerald-200',
      'probationary': 'bg-blue-50 text-blue-700 border border-blue-200',
      'regular': 'bg-emerald-50 text-emerald-700 border border-emerald-200',
      'contractual': 'bg-purple-50 text-purple-700 border border-purple-200',
      'resigned': 'bg-red-50 text-red-700 border border-red-200',
      'terminated': 'bg-red-50 text-red-700 border border-red-200',
      'retired': 'bg-gray-50 text-gray-700 border border-gray-200',
      'on_leave': 'bg-yellow-50 text-yellow-700 border border-yellow-200',
      'suspended': 'bg-orange-50 text-orange-700 border border-orange-200',
      'deceased': 'bg-gray-50 text-gray-700 border border-gray-200',
      'pending': 'bg-yellow-50 text-yellow-700 border border-yellow-200',
    };
    return styles[status] || 'bg-gray-50 text-gray-700 border border-gray-200';
  };

  const getStatusDot = (status: string) => {
    const styles: Record<string, string> = {
      'active': 'bg-emerald-500',
      'regular': 'bg-emerald-500',
      'probationary': 'bg-blue-500',
      'contractual': 'bg-purple-500',
      'resigned': 'bg-red-500',
      'terminated': 'bg-red-500',
      'retired': 'bg-gray-500',
      'on_leave': 'bg-yellow-500',
      'suspended': 'bg-orange-500',
      'deceased': 'bg-gray-500',
      'pending': 'bg-yellow-500',
    };
    return styles[status] || 'bg-gray-500';
  };

  const getAccountStatusBadge = (status?: string) => {
  if (!status) return 'bg-emerald-50 text-emerald-700';
  const styles: Record<string, string> = {
    'active': 'bg-emerald-50 text-emerald-700',
    'inactive': 'bg-gray-50 text-gray-700',
    'locked': 'bg-red-50 text-red-700',
    'pending': 'bg-yellow-50 text-yellow-700',
    'deactivated': 'bg-gray-50 text-gray-700',
  };
  return styles[status] || 'bg-gray-50 text-gray-700';
};

  const getStatusCounts = () => ({
    all: employees.length,
    active: employees.filter(e => e.employment_status === 'active').length,
    probationary: employees.filter(e => e.employment_status === 'probationary').length,
    regular: employees.filter(e => e.employment_status === 'regular').length,
    contractual: employees.filter(e => e.employment_status === 'contractual').length,
    resigned: employees.filter(e => e.employment_status === 'resigned').length,
    terminated: employees.filter(e => e.employment_status === 'terminated').length,
    on_leave: employees.filter(e => e.employment_status === 'on_leave').length,
    pending: employees.filter(e => e.employment_status === 'pending').length,
  });

  const statusCounts = getStatusCounts();

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.first_name?.toLowerCase().includes(search.toLowerCase()) ||
      emp.last_name?.toLowerCase().includes(search.toLowerCase()) ||
      emp.employee_id?.toLowerCase().includes(search.toLowerCase()) ||
      emp.email?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || emp.employment_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (date: string | null) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading employees...</p>
        </div>
      </div>
    );
  }

  const pendingEmployees = employees.filter(e => e.employment_status === 'pending');

  return (
    <div className="space-y-6">
      {/* ===== HEADER ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your workforce efficiently</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl hover:from-red-700 hover:to-rose-700 transition-all duration-200 text-sm font-semibold shadow-lg shadow-red-500/25"
        >
          <UserPlus className="h-4 w-4" />
          Add Employee
        </button>
      </div>

      {/* ===== STATS CARDS ===== */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-blue-50 rounded-xl">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">Total</p>
            <p className="text-2xl font-bold text-gray-900">{statusCounts.all}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-emerald-50 rounded-xl">
            <UserCheck className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">Active</p>
            <p className="text-2xl font-bold text-emerald-600">{statusCounts.active}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-yellow-50 rounded-xl">
            <Clock className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-red-50 rounded-xl">
            <UserX className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">Inactive</p>
            <p className="text-2xl font-bold text-red-600">{statusCounts.resigned + statusCounts.terminated}</p>
          </div>
        </div>
      </div>

      {/* ===== PENDING EMPLOYEES SECTION ===== */}
      {statusCounts.pending > 0 && (
        <div className="bg-yellow-50/50 border border-yellow-200 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <h3 className="font-semibold text-yellow-800">Pending Approvals</h3>
              <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium bg-yellow-200 text-yellow-800 rounded-full">
                {statusCounts.pending}
              </span>
            </div>
            <button
              onClick={() => setStatusFilter('pending')}
              className="text-xs text-yellow-700 hover:text-yellow-900 font-medium"
            >
              View all
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {pendingEmployees.slice(0, 6).map((emp) => (
              <div key={emp.id} className="bg-white rounded-xl shadow-sm border border-yellow-100 p-3 flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center text-yellow-700 font-semibold text-sm flex-shrink-0">
                    {emp.first_name?.charAt(0)?.toUpperCase() || 'U'}
                    {emp.last_name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{emp.first_name} {emp.last_name}</p>
                    <p className="text-xs text-gray-500">{emp.employee_id}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleApprove(emp.id)}
                    className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                    title="Approve"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDisapprove(emp.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Disapprove"
                  >
                    <XCircle className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== SEARCH & FILTER TABS ===== */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, ID, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-200 bg-white/50 hover:bg-white"
          />
        </div>
      </div>

      {/* ===== TAB NAVIGATION ===== */}
      <div className="flex flex-wrap gap-1.5 border-b border-gray-200 pb-0.5">
        {['all', 'active', 'probationary', 'regular', 'contractual', 'resigned', 'on_leave', 'pending'].map((tab) => {
          const label = tab === 'all' ? 'All' : tab === 'on_leave' ? 'On Leave' : tab.charAt(0).toUpperCase() + tab.slice(1);
          const count = statusCounts[tab as keyof typeof statusCounts] || 0;
          const isActive = statusFilter === tab;
          return (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-200 ${
                isActive
                  ? 'bg-red-50 text-red-600 border-b-2 border-red-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {label}
              {count > 0 && (
                <span className={`ml-1.5 px-1.5 py-0.5 text-xs rounded-full ${
                  isActive ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Employee ID</th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-center px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12">
                    <div className="flex flex-col items-center justify-center">
                      <Users className="h-12 w-12 text-gray-300 mb-3" />
                      <p className="text-gray-500 font-medium">No employees found</p>
                      <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp, index) => (
                  <tr key={emp.id} className="hover:bg-gray-50/50 transition-colors duration-150">
                    <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center text-red-700 font-semibold text-sm flex-shrink-0">
                          {emp.first_name?.charAt(0)?.toUpperCase() || 'U'}
                          {emp.last_name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {emp.first_name} {emp.middle_name ? emp.middle_name + ' ' : ''}{emp.last_name}
                            {emp.suffix && ` ${emp.suffix}`}
                          </p>
                          <p className="text-xs text-gray-400">{emp.employee_id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-mono font-medium text-gray-900 bg-gray-50 px-2.5 py-1 rounded-md">
                        {emp.employee_id}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{emp.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadge(emp.employment_status)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(emp.employment_status)}`} />
                        {emp.employment_status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => openViewModal(emp)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(emp)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        {emp.employment_status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(emp.id)}
                              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Approve"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDisapprove(emp.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Disapprove"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDelete(emp.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ======== ADD/EDIT MODAL ======== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {editingEmployee ? 'Edit Employee' : 'Add Employee'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name *</label>
                  <input name="first_name" value={formData.first_name} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name *</label>
                  <input name="last_name" value={formData.last_name} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Middle Name</label>
                  <input name="middle_name" value={formData.middle_name} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Suffix</label>
                  <input name="suffix" value={formData.suffix} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none" placeholder="Jr., Sr., III" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                  <input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Number</label>
                  <input name="contact_number" value={formData.contact_number} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Employment Status *</label>
                <select name="employment_status" value={formData.employment_status} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none bg-white">
                  <option value="active">Active</option>
                  <option value="probationary">Probationary</option>
                  <option value="regular">Regular</option>
                  <option value="contractual">Contractual</option>
                  <option value="resigned">Resigned</option>
                  <option value="terminated">Terminated</option>
                  <option value="retired">Retired</option>
                  <option value="on_leave">On Leave</option>
                  <option value="suspended">Suspended</option>
                  <option value="deceased">Deceased</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Date Hired</label>
                  <input name="date_hired" type="date" value={formData.date_hired} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Basic Salary</label>
                  <input name="basic_salary" type="number" step="0.01" value={formData.basic_salary} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none" placeholder="0.00" />
                </div>
              </div>

              {!editingEmployee && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Password *</label>
                    <input name="password" type="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none" required minLength={8} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password *</label>
                    <input name="password_confirmation" type="password" value={formData.password_confirmation} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none" required />
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button type="submit" disabled={submitting} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:from-red-700 hover:to-rose-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : editingEmployee ? 'Update Employee' : 'Create Employee'}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======== VIEW MODAL ======== */}
      {showViewModal && viewingEmployee && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
      
      {/* ===== HEADER ===== */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 px-6 py-4 border-b border-gray-100 flex items-center justify-between rounded-t-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-red-500/25 flex-shrink-0">
            {viewingEmployee.first_name?.charAt(0)?.toUpperCase() || 'U'}
            {viewingEmployee.last_name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {viewingEmployee.first_name} {viewingEmployee.last_name}
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">{viewingEmployee.employee_id}</span>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusBadge(viewingEmployee.employment_status)}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(viewingEmployee.employment_status)}`} />
                {viewingEmployee.employment_status}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {/* Open change password modal */}}
            className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
          >
            Change Password
          </button>
          <button
            onClick={() => setShowViewModal(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* ===== BODY ===== */}
      <div className="p-6 space-y-6">
        
        {/* Personal & Employment Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Personal Information */}
          <div className="bg-gray-50/50 rounded-xl p-5 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-4 w-4 text-gray-400" />
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Personal Information</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Employee ID</span>
                <span className="text-sm font-medium text-gray-900">{viewingEmployee.employee_id}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Email</span>
                <span className="text-sm font-medium text-gray-900">{viewingEmployee.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Contact</span>
                <span className="text-sm font-medium text-gray-900">{viewingEmployee.contact_number || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Gender</span>
                <span className="text-sm font-medium text-gray-900 capitalize">{viewingEmployee.gender?.toLowerCase() || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Civil Status</span>
                <span className="text-sm font-medium text-gray-900">{viewingEmployee.civil_status || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-500">Date of Birth</span>
                <span className="text-sm font-medium text-gray-900">{formatDate(viewingEmployee.date_of_birth)}</span>
              </div>
            </div>
          </div>

          {/* Employment Details */}
          <div className="bg-gray-50/50 rounded-xl p-5 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="h-4 w-4 text-gray-400" />
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Employment Details</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Status</span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusBadge(viewingEmployee.employment_status)}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(viewingEmployee.employment_status)}`} />
                  {viewingEmployee.employment_status}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Department</span>
                <span className="text-sm font-medium text-gray-900">{viewingEmployee.department?.name || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Job Title</span>
                <span className="text-sm font-medium text-gray-900">{viewingEmployee.job_title?.title || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Employment Type</span>
                <span className="text-sm font-medium text-gray-900">{viewingEmployee.employment_type?.name || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Date Hired</span>
                <span className="text-sm font-medium text-gray-900">{formatDate(viewingEmployee.date_hired)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-500">Supervisor</span>
                <span className="text-sm font-medium text-gray-900">
                  {viewingEmployee.supervisor ? `${viewingEmployee.supervisor.first_name} ${viewingEmployee.supervisor.last_name}` : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== SALARY INFORMATION ===== */}
        <div className="bg-gray-50/50 rounded-xl p-5 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="h-4 w-4 text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Salary Information</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 text-center border border-gray-200 shadow-sm">
              <p className="text-xs text-gray-500 font-medium">Basic Salary</p>
              <p className="text-xl font-bold text-blue-600">{formatCurrency(viewingEmployee.basic_salary)}</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-gray-200 shadow-sm">
              <p className="text-xs text-gray-500 font-medium">Allowance</p>
              <p className="text-xl font-bold text-emerald-600">{formatCurrency(viewingEmployee.allowance)}</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-gray-200 shadow-sm">
              <p className="text-xs text-gray-500 font-medium">Deductions</p>
              <p className="text-xl font-bold text-red-600">{formatCurrency(viewingEmployee.deductions)}</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-gray-200 shadow-sm">
              <p className="text-xs text-gray-500 font-medium">Net Pay</p>
              <p className="text-xl font-bold text-purple-600">{formatCurrency(viewingEmployee.net_pay)}</p>
            </div>
          </div>
        </div>

        {/* ===== ACCOUNT INFORMATION ===== */}
        <div className="bg-gray-50/50 rounded-xl p-5 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-4 w-4 text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Account Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
              <span className="text-sm text-gray-500">Account Status</span>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getAccountStatusBadge(viewingEmployee.account_status)}`}>
                {viewingEmployee.account_status || 'Active'}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
              <span className="text-sm text-gray-500">Last Login</span>
              <span className="text-sm font-medium text-gray-900">N/A</span>
            </div>
          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <div className="border-t border-gray-100 pt-4 flex justify-end gap-3">
          <button
            onClick={() => setShowViewModal(false)}
            className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
          >
            Close
          </button>
          <button
            onClick={() => {
              setShowViewModal(false);
              openEditModal(viewingEmployee);
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg shadow-blue-500/25"
          >
            <Edit className="h-4 w-4 inline mr-2" />
            Edit Employee
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Employees;