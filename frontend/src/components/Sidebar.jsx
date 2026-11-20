import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  LayoutDashboard, ClipboardList, BookOpen,
  BarChart3, Shield, LogOut, Brain, Pencil, Home, X
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['admin', 'teacher', 'student'] },
  { to: '/assessments', icon: ClipboardList, label: 'Assessments', roles: ['admin', 'teacher'] },
  { to: '/grader', icon: Pencil, label: 'AI Grader', roles: ['admin', 'teacher'] },
  { to: '/toolkit', icon: BookOpen, label: "Teacher's Toolkit", roles: ['admin', 'teacher'] },
  { to: '/analytics', icon: BarChart3, label: 'Analytics', roles: ['admin', 'teacher', 'student'] },
  { to: '/admin', icon: Shield, label: 'Admin Panel', roles: ['admin'] },
];

export default function Sidebar({ open = false, onClose = () => {} }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userNav = navItems.filter(item => item.roles.includes(user?.role));

  return (
    <>
    {/* Backdrop for the mobile drawer */}
    {open && (
      <div
        className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
    )}
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 max-w-[85vw] transform transition-transform duration-200 ease-out
        lg:static lg:z-20 lg:translate-x-0 lg:max-w-none
        ${open ? 'translate-x-0' : '-translate-x-full'}
        flex-shrink-0 bg-white border-r border-slate-200/80 flex flex-col h-full shadow-sm`}
    >
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#18181b] flex items-center justify-center text-white font-black text-sm shadow-sm">
            M
          </div>
          <div>
            <h1 className="font-extrabold text-lg text-slate-900 tracking-tight leading-none">
              MarkMitra
            </h1>
            <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">Academic Intelligence • MAIT</p>
          </div>
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="lg:hidden p-1.5 -mr-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-5 space-y-1 overflow-y-auto">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider px-4 mb-3">Main Menu</p>
        
        {userNav.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            id={`nav-${label.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
               ${isActive
                ? 'bg-[#ffede1] text-[#ff5c00] shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
               }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#ff5c00]' : 'text-slate-400'}`} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}

        <div className="pt-4 mt-4 border-t border-slate-100">
          <Link
            to="/"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all"
          >
            <Home className="w-4 h-4 text-slate-400" />
            <span>Public Home</span>
          </Link>
        </div>
      </nav>

      {/* User Profile Card */}
      <div className="p-5 border-t border-slate-100 bg-slate-50/60">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white border border-slate-200/80 mb-2 shadow-xs">
          <div className="w-8 h-8 rounded-full bg-[#18181b] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-sm">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-900 truncate">{user?.name || 'User'}</p>
            <p className="text-[10px] text-[#ff5c00] font-semibold capitalize">{user?.role || 'student'}</p>
          </div>
        </div>
        
        <button
          id="btn-logout"
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 border border-slate-200/60 transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
    </>
  );
}
