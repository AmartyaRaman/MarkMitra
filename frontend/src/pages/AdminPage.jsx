import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import {
  Shield, Users, BookOpen, Plus, Search,
  X, Loader2, CheckCircle, Trash2, Key
} from 'lucide-react';
import toast from 'react-hot-toast';

const mockUsers = [
  { id: 1, name: 'Dr. Ramesh Sharma', email: 'admin@markmitra.in', role: 'admin', institution: 'MAIT, Rohini', created_at: '2026-01-15' },
  { id: 2, name: 'Prof. Ananya Sen', email: 'teacher@markmitra.in', role: 'teacher', institution: 'MAIT, Rohini', created_at: '2026-02-01' },
  { id: 3, name: 'Aarav Patel', email: 'student@markmitra.in', role: 'student', institution: 'MAIT, Rohini', created_at: '2026-02-10' },
  { id: 4, name: 'Priya Verma', email: 'priya.v@dps.edu', role: 'student', institution: 'Delhi Public School', created_at: '2026-02-15' },
  { id: 5, name: 'Vikram Malhotra', email: 'vikram.m@dps.edu', role: 'teacher', institution: 'Delhi Public School', created_at: '2026-03-01' },
  { id: 6, name: 'Sunita Rao', email: 'sunita.r@dps.edu', role: 'teacher', institution: 'Delhi Public School', created_at: '2026-03-10' },
];

const roleIcon = { admin: Shield, teacher: BookOpen, student: Users };
const roleColor = {
  admin: 'bg-purple-100 text-purple-700',
  teacher: 'bg-[#ffede1] text-[#ff5c00]',
  student: 'bg-emerald-100 text-emerald-700'
};

function AddUserModal({ open, onClose }) {
  const qc = useQueryClient();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student', institution: '' });

  const mutation = useMutation({
    mutationFn: (data) => api.post('/users', data),
    onSuccess: () => {
      toast.success('User created successfully!');
      qc.invalidateQueries(['users']);
      onClose();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to create user');
    },
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="relative bg-white border border-slate-200 rounded-3xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Add New User</h2>
            <p className="text-xs text-slate-500 mt-0.5">Provision institutional accounts</p>
          </div>
          <button id="btn-close-user-modal" onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Full Name</label>
            <input
              id="input-new-user-name"
              type="text"
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              placeholder="e.g. Dr. Rajesh Kumar"
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#ff5c00] focus:ring-2 focus:ring-orange-100"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Email Address</label>
            <input
              id="input-new-user-email"
              type="email"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              placeholder="e.g. rajesh@institution.edu"
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#ff5c00] focus:ring-2 focus:ring-orange-100"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Password</label>
            <input
              id="input-new-user-pass"
              type="password"
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              placeholder="Min. 8 characters"
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#ff5c00] focus:ring-2 focus:ring-orange-100"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Institution</label>
            <input
              id="input-new-user-inst"
              type="text"
              value={form.institution}
              onChange={e => setForm(p => ({ ...p, institution: e.target.value }))}
              placeholder="e.g. Delhi Public School"
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#ff5c00] focus:ring-2 focus:ring-orange-100"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Role</label>
            <select
              id="select-new-user-role"
              value={form.role}
              onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#ff5c00]"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            id="btn-cancel-user"
            onClick={onClose}
            className="flex-1 py-3 rounded-full border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-all"
          >
            Cancel
          </button>
          <button
            id="btn-submit-user"
            onClick={() => mutation.mutate(form)}
            disabled={mutation.isPending}
            className="flex-1 py-3 rounded-full bg-[#18181b] hover:bg-black text-white text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2"
          >
            {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {mutation.isPending ? 'Creating...' : 'Create Account'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const { data: users = mockUsers } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.get('/users').then(r => r.data).catch(() => mockUsers),
  });

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const stats = {
    admin: users.filter(u => u.role === 'admin').length,
    teacher: users.filter(u => u.role === 'teacher').length,
    student: users.filter(u => u.role === 'student').length,
  };

  return (
    <div className="space-y-8">
      <AddUserModal open={showAdd} onClose={() => setShowAdd(false)} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Admin Panel
          </h1>
          <p className="text-slate-500 mt-1 text-sm">Manage institutional users, role assignments, and platform permissions</p>
        </div>

        <button
          id="btn-add-user"
          onClick={() => setShowAdd(true)}
          className="btn-markmitra-dark text-xs px-5 py-2.5 rounded-full flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* Role Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {Object.entries(stats).map(([role, count]) => {
          const Icon = roleIcon[role];
          return (
            <div key={role} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
              <div className={`w-12 h-12 rounded-xl ${roleColor[role]} flex items-center justify-center mb-4 shadow-2xs`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 mb-1">{count}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider capitalize">{role} Accounts</div>
            </div>
          );
        })}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Registered Accounts</h2>
            <p className="text-xs text-slate-500 mt-0.5">Total {filtered.length} users active</p>
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="user-search"
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search name or email..."
                className="w-full sm:w-60 bg-slate-50 border border-slate-200 rounded-full pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#ff5c00] focus:bg-white transition-all shadow-2xs"
              />
            </div>
            <select
              id="role-filter"
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#ff5c00]"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admins</option>
              <option value="teacher">Teachers</option>
              <option value="student">Students</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                {['User', 'Email', 'Role', 'Institution', 'Joined'].map(h => (
                  <th key={h} className="text-left py-3.5 px-6">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(u => {
                const Icon = roleIcon[u.role];
                return (
                  <tr key={u.id} className="hover:bg-slate-50/70 transition-all">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${roleColor[u.role]} flex items-center justify-center text-xs font-extrabold flex-shrink-0 shadow-xs`}>
                          {u.name[0]}
                        </div>
                        <span className="font-bold text-slate-900">{u.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-600 font-mono text-[11px]">{u.email}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full capitalize
                        ${u.role === 'admin' ? 'badge-info' : u.role === 'teacher' ? 'badge-orange-highlight' : 'badge-success'}`}>
                        <Icon className="w-3 h-3" />
                        {u.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-700 font-medium">{u.institution}</td>
                    <td className="py-4 px-6 text-slate-400">{new Date(u.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
