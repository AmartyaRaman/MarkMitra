import { Bell, Search, HelpCircle, ChevronDown, Menu } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from 'react-router-dom';

export default function Topbar({ onMenuClick }) {
  const { user } = useAuth();
  const location = useLocation();

  const getBreadcrumb = () => {
    const path = location.pathname.replace('/', '');
    if (!path || path === 'dashboard') return 'Dashboard';
    if (path === 'assessments') return 'Assignments & Evaluations';
    if (path === 'grader') return 'AI Grader';
    if (path === 'toolkit') return "Teacher's Toolkit";
    if (path === 'analytics') return 'Student Performance';
    if (path === 'admin') return 'Administration';
    return path;
  };

  return (
    <header className="h-[68px] bg-white/90 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between gap-3 px-4 sm:px-8 md:px-10 flex-shrink-0 z-10 shadow-xs">

      {/* Breadcrumb & Search */}
      <div className="flex items-center gap-3 sm:gap-6 min-w-0">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 min-w-0">
          <span className="text-slate-400 hidden sm:inline">Platform</span>
          <span className="text-slate-300 hidden sm:inline">/</span>
          <span className="text-[#ff5c00] capitalize truncate">{getBreadcrumb()}</span>
        </div>

        <div className="relative hidden md:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="topbar-search"
            type="text"
            placeholder="Search students, assessments..."
            className="bg-slate-50 border border-slate-200 rounded-full pl-9 pr-4 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#ff5c00] focus:bg-white transition-all w-64 shadow-xs"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        <button className="p-2 rounded-full text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors hidden sm:block" title="Help">
          <HelpCircle className="w-4 h-4" />
        </button>

        <button id="btn-notifications" className="relative p-2 rounded-full text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ff5c00] rounded-full" />
        </button>

        <div className="h-5 w-px bg-slate-200 mx-1" />

        {/* User Badge */}
        <div className="flex items-center gap-2.5 pl-1 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-[#18181b] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-bold text-slate-900 leading-tight">{user?.name || 'Academic User'}</p>
            <p className="text-[10px] text-slate-400 capitalize">{user?.institution || 'MAIT, Rohini'}</p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
        </div>
      </div>

    </header>
  );
}
