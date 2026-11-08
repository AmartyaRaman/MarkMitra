import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Brain, Eye, EyeOff, Loader2, Shield, GraduationCap,
  BookOpen, Key, Mail, Sparkles, ArrowRight, ArrowLeft,
  CheckCircle2, FileText, BarChart3, Check, Award
} from 'lucide-react';
import toast from 'react-hot-toast';

const demoAccounts = [
  {
    role: 'Admin',
    email: 'admin@vedaai.in',
    password: 'admin123',
    icon: Shield,
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    title: 'Institutional Administrator',
    desc: 'Access user management, role assignments & institution analytics'
  },
  {
    role: 'Teacher',
    email: 'teacher@vedaai.in',
    password: 'teacher123',
    icon: BookOpen,
    color: 'bg-[#ffede1] text-[#ff5c00] border-[#ffd8c2]',
    title: 'Educator / Faculty',
    desc: 'AI Answer Sheet Grader, lesson planning & question authoring'
  },
  {
    role: 'Student',
    email: 'student@vedaai.in',
    password: 'student123',
    icon: GraduationCap,
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    title: 'Enrolled Learner',
    desc: 'View personal evaluations, performance scores & study roadmaps'
  },
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState('Admin');
  const [email, setEmail] = useState('admin@vedaai.in');
  const [password, setPassword] = useState('admin123');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSelectRole = (acc) => {
    setSelectedRole(acc.role);
    setEmail(acc.email);
    setPassword(acc.password);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back to VedaAI!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (acc) => {
    setSelectedRole(acc.role);
    setEmail(acc.email);
    setPassword(acc.password);
    setLoading(true);
    try {
      await login(acc.email, acc.password);
      toast.success(`Logged in as ${acc.role}!`);
      navigate('/dashboard');
    } catch (err) {
      toast.error('Login failed. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const currentRoleObj = demoAccounts.find(a => a.role === selectedRole) || demoAccounts[0];

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white text-slate-800 font-sans selection:bg-orange-100 selection:text-orange-900">
      
      {/* ── Left Half: Rich Visual Brand Showcase (55% width) ─ */}
      <div className="lg:w-[52%] xl:w-[55%] bg-gradient-to-br from-[#dbeafe]/80 via-[#edf5fc] to-[#f6faff] p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden border-r border-slate-200/60">
        
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-200/40 via-sky-100/30 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-orange-100/40 via-peach-50/20 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

        {/* Top: Logo & Incubated Tag */}
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#18181b] flex items-center justify-center text-white font-black shadow-sm">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                <path d="M12 22L2 4h4.5l5.5 11.5L17.5 4H22L12 22z" />
              </svg>
            </div>
            <span className="font-extrabold text-xl text-slate-900 tracking-tight">VedaAI</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-slate-200 shadow-2xs text-xs font-semibold text-slate-700">
            <div className="w-4 h-4 rounded-full bg-red-800 text-white flex items-center justify-center text-[9px] font-black">
              IIM
            </div>
            <span>Incubated at IIM Bangalore</span>
          </div>
        </div>

        {/* Center: Hero Value Proposition & Feature Cards */}
        <div className="my-10 lg:my-auto max-w-xl space-y-8">
          
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffede1] text-[#ff5c00] text-xs font-bold border border-[#ffd8c2]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Academic Intelligence Platform</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Redefining evaluation with <span className="text-[#ff5c00]">GenAI precision.</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Automated handwritten grading, instant NEP-aligned question paper generation, and longitudinal student analytics in one unified workspace.
            </p>
          </div>

          {/* 3 Showcase Pills / Cards */}
          <div className="space-y-3.5">
            <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/90 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
              <div className="w-11 h-11 rounded-xl bg-[#ffede1] text-[#ff5c00] flex items-center justify-center flex-shrink-0 font-bold shadow-2xs">
                <Brain className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-900">AI Answer Sheet Grader</h4>
                <p className="text-xs text-slate-500 mt-0.5">Instant handwritten script recognition with 98% rubric fidelity.</p>
              </div>
              <span className="badge-success text-[10px] font-bold px-2.5 py-1 rounded-full">Gemini 1.5</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/90 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
              <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0 font-bold shadow-2xs">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-900">Teacher's Curriculum Toolkit</h4>
                <p className="text-xs text-slate-500 mt-0.5">45-minute lesson plans, rubrics, and diagnostic test papers in seconds.</p>
              </div>
              <span className="badge-info text-[10px] font-bold px-2.5 py-1 rounded-full">NEP 2020</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/90 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 font-bold shadow-2xs">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-900">Student Competency Analytics</h4>
                <p className="text-xs text-slate-500 mt-0.5">Real-time benchmark radar charts and early intervention signals.</p>
              </div>
              <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-200">Live Insights</span>
            </div>
          </div>

        </div>

        {/* Bottom Social Proof */}
        <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-slate-700">10,000+ Assessments Processed</span>
          </div>
          <span>Enterprise 256-bit AES Encryption</span>
        </div>

      </div>

      {/* ── Right Half: Modern, Spacious Login Form (45-48% width) ─ */}
      <div className="lg:w-[48%] xl:w-[45%] bg-white p-8 sm:p-14 lg:p-16 xl:p-20 flex flex-col justify-between overflow-y-auto">
        
        {/* Top Header / Back Link */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-4 py-2 rounded-full transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <span className="text-xs font-medium text-slate-400">Institutional Portal</span>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-md mx-auto space-y-8 my-auto">
          
          {/* Header Texts */}
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Welcome back
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Sign in with your institutional credentials or select a demo account for one-click access.
            </p>
          </div>

          {/* ── Modern Role Picker Tabs ────────────────────────── */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-[#ff5c00]" />
                Demo Role Switcher
              </span>
              <span className="text-[11px] font-bold text-[#ff5c00] bg-[#ffede1] px-2.5 py-0.5 rounded-full">
                1-Click Auto-Fill
              </span>
            </div>

            {/* 3 Role Selection Pills */}
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
              {demoAccounts.map(acc => {
                const isSelected = selectedRole === acc.role;
                const Icon = acc.icon;
                return (
                  <button
                    key={acc.role}
                    type="button"
                    onClick={() => handleSelectRole(acc)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#ff5c00]' : 'text-slate-400'}`} />
                    <span>{acc.role}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Role Info Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-900">{currentRoleObj.title}</span>
                  <span className="text-[10px] text-slate-400 font-mono">({currentRoleObj.email})</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Password: <span className="font-mono font-bold text-[#ff5c00]">{currentRoleObj.password}</span></p>
              </div>

              <button
                type="button"
                onClick={() => handleQuickLogin(currentRoleObj)}
                disabled={loading}
                className="btn-veda-dark text-xs px-3.5 py-1.5 rounded-full font-bold flex items-center gap-1 shrink-0"
              >
                <span>Login</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">or enter credentials</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* ── Form Inputs ────────────────────────────────────── */}
          <form id="form-login" onSubmit={handleSubmit} className="space-y-5">
            
            <div className="space-y-2">
              <label htmlFor="input-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Institutional Email
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="input-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="e.g. admin@vedaai.in"
                  style={{ paddingLeft: '44px' }}
                  className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#ff5c00] focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="input-password" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <span className="text-xs text-slate-400">
                  Demo: <span className="font-mono text-[#ff5c00] font-bold">admin123</span>
                </span>
              </div>
              <div className="relative">
                <Key className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="input-password"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password..."
                  style={{ paddingLeft: '44px', paddingRight: '44px' }}
                  className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#ff5c00] focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all font-medium"
                />
                <button
                  type="button"
                  id="btn-toggle-password"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              id="btn-login"
              type="submit"
              disabled={loading}
              className="btn-veda-dark w-full py-4 rounded-full text-base font-bold shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
              {loading ? 'Authenticating...' : 'Sign In to VedaAI'}
            </button>

          </form>

        </div>

        {/* Bottom Legal / Trust Info */}
        <div className="pt-8 text-center text-xs text-slate-400">
          <span>Protected by VedaAI Enterprise Security • NEP 2020 Compliant</span>
        </div>

      </div>

    </div>
  );
}
