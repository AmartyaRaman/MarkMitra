import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Brain, ArrowRight, CheckCircle2,
  BookOpen, BarChart3, ChevronRight, HelpCircle, Bell, Search,
  AlertTriangle, Sparkles, Lock, Menu, X
} from 'lucide-react';

export default function LandingPage() {
  const [meetingModal, setMeetingModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [previewTab, setPreviewTab] = useState('summary');
  const [previewSearch, setPreviewSearch] = useState('');

  return (
    <div className="flex flex-col min-h-screen bg-[#edf5fb] text-slate-800 font-sans">

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[#edf5fb]/95 backdrop-blur-md border-b border-slate-200/60 h-16 flex items-center px-6 sm:px-16">
        <div className="w-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#18181b] flex items-center justify-center text-white font-black text-sm shadow-sm group-hover:scale-105 transition-transform">
              M
            </div>
            <span className="font-extrabold text-xl text-slate-900 tracking-tight">MarkMitra</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium">
            <Link to="/" className="text-[#ff5c00] font-bold">Home</Link>
            <a href="#solutions" className="text-slate-600 hover:text-slate-900 transition-colors">Solutions</a>
            <a href="#product" className="text-slate-600 hover:text-slate-900 transition-colors">Product</a>
            <a href="#company" className="text-slate-600 hover:text-slate-900 transition-colors">Company</a>
            <a href="#resources" className="text-slate-600 hover:text-slate-900 transition-colors">Resources</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden sm:inline-flex text-sm font-semibold text-slate-700 hover:text-slate-900 px-3 py-1.5 transition-colors">
              Sign In
            </Link>
            <button onClick={() => setMeetingModal(true)} className="btn-markmitra-dark text-xs! sm:text-sm! px-4! sm:px-5! py-2! sm:py-2.5! rounded-full font-bold shadow-sm">
              Contact Us
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(o => !o)}
              className="md:hidden p-2 -mr-2 text-slate-700 hover:text-slate-900"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="md:hidden absolute top-16 inset-x-0 bg-white border-b border-slate-200 shadow-lg px-6 py-4 flex flex-col gap-1 text-[15px] font-medium">
            <Link to="/" onClick={() => setMenuOpen(false)} className="py-2 text-[#ff5c00] font-bold">Home</Link>
            <a href="#solutions" onClick={() => setMenuOpen(false)} className="py-2 text-slate-700">Solutions</a>
            <a href="#product" onClick={() => setMenuOpen(false)} className="py-2 text-slate-700">Product</a>
            <a href="#company" onClick={() => setMenuOpen(false)} className="py-2 text-slate-700">Company</a>
            <a href="#resources" onClick={() => setMenuOpen(false)} className="py-2 text-slate-700">Resources</a>
            <Link to="/login" onClick={() => setMenuOpen(false)} className="mt-2 pt-3 border-t border-slate-100 py-2 font-semibold text-slate-900">Sign In</Link>
          </nav>
        )}
      </header>

      {/* Hero */}
      <section className="relative px-4 sm:px-16 pt-12 sm:pt-20 pb-0 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b from-blue-100/70 via-sky-50/30 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-sm text-xs font-semibold text-slate-700">
          <div className="w-4 h-4 rounded-full bg-[#ff5c00] text-white flex items-center justify-center text-[8px] font-black leading-none">M</div>
          <span>Incubated at MAIT, Rohini</span>
        </div>

        <h1 className="text-[1.75rem] sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] mb-5">
          AI Academic Assessment &amp;<br />
          <span className="inline-block mt-3 px-3 sm:px-6 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-[#ffede1] text-[#ff5c00] font-black border border-[#ffd8c2] shadow-sm">
            Intelligence Platform
          </span>
        </h1>

        <p className="max-w-xl mx-auto text-slate-500 text-base sm:text-lg leading-relaxed mb-10">
          MarkMitra helps educational institutions elevate student performance, empower teachers, and increase academic results powered by AI.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 max-w-xs sm:max-w-none mx-auto">
          <Link to="/login" id="btn-hero-free-for-teachers" className="btn-markmitra-dark px-7 py-3 text-sm rounded-full shadow-md font-bold hover:scale-[1.02] transition-transform">
            Free for Teachers
          </Link>
          <button onClick={() => setMeetingModal(true)} id="btn-hero-book-meeting" className="btn-markmitra-light px-7 py-3 text-sm rounded-full shadow-sm font-semibold hover:bg-slate-50 transition-all">
            Book a meeting
          </button>
        </div>

        {/* Dashboard Preview */}
        <div className="w-full max-w-5xl mx-auto my-8 px-2 sm:px-0">
          <div className="rounded-3xl border border-slate-300/80 bg-slate-900/5 p-2 sm:p-3 shadow-2xl backdrop-blur-md">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">

              {/* Browser Mockup Chrome Header */}
              <div className="px-4 py-2.5 border-b border-slate-200/80 bg-slate-100/90 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                </div>
                <div className="flex-1 max-w-md mx-auto hidden sm:flex items-center justify-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-[11px] text-slate-500 font-mono shadow-2xs">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <span>https://markmitra.mait.ac.in/dashboard</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Live Preview</span>
                </div>
              </div>

              {/* In-App Navigation Bar */}
              <div className="px-3 sm:px-5 py-3 border-b border-slate-100 flex items-center justify-between gap-2 bg-slate-50/80">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-md bg-[#18181b] flex items-center justify-center text-white text-[10px] font-black">M</div>
                    <span className="font-extrabold text-sm text-slate-900 tracking-tight">MarkMitra</span>
                  </div>
                  <span className="text-slate-300 hidden sm:inline">|</span>
                  <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-600 font-semibold truncate">
                    <span className="text-slate-800">MAIT Institutional Portal</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                  <div className="relative hidden lg:flex items-center">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
                    <input
                      type="text"
                      value={previewSearch}
                      onChange={(e) => setPreviewSearch(e.target.value)}
                      placeholder="Search students, tests..."
                      className="pl-8 pr-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#ff5c00] w-48 sm:w-56 transition-all"
                    />
                  </div>
                  <button className="text-slate-400 hover:text-slate-600 transition-colors p-1" title="Help"><HelpCircle className="w-4 h-4" /></button>
                  <button className="text-slate-400 hover:text-slate-600 transition-colors p-1 relative" title="Notifications">
                    <Bell className="w-4 h-4" />
                    <span className="w-1.5 h-1.5 bg-[#ff5c00] rounded-full absolute top-1 right-1" />
                  </button>
                  <div className="flex items-center gap-2 pl-2 border-l border-slate-200 text-xs font-bold text-slate-800">
                    <div className="w-6 h-6 rounded-full bg-[#18181b] text-white flex items-center justify-center text-[10px] font-bold">
                      RS
                    </div>
                    <span className="hidden md:inline text-[11px]">Dr. Ramesh (MAIT)</span>
                  </div>
                </div>
              </div>

              {/* In-App Content Area */}
              <div className="p-4 sm:p-7 bg-white text-left space-y-6">
                
                {/* Dashboard Tabs & Action */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setPreviewTab('summary')}
                      className={`text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                        previewTab === 'summary'
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <span>Assessment Summary</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewTab('evaluations')}
                      className={`text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                        previewTab === 'evaluations'
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <span>Active Evaluations</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        previewTab === 'evaluations' ? 'bg-[#ff5c00] text-white' : 'bg-slate-200 text-slate-700'
                      }`}>4</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewTab('analytics')}
                      className={`text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                        previewTab === 'analytics'
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <span>Student Analytics</span>
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse hidden sm:inline-block" />
                    </button>
                  </div>

                  <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#ff5c00] hover:text-[#ea4e00] bg-[#ffede1] hover:bg-[#ffd8c2] px-4 py-2 rounded-full transition-all self-start sm:self-auto shadow-2xs"
                  >
                    <span>Launch Live Platform</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* ── Tab View 1: Summary ────────────────────────── */}
                {previewTab === 'summary' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 hover:border-slate-300 transition-all">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Submissions</span>
                          <span className="badge-success text-[10px] px-2 py-0.5 rounded-full font-bold">+18%</span>
                        </div>
                        <div className="text-3xl font-black text-slate-900">1,248</div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>98% Auto-Graded by AI</span>
                        </div>
                      </div>

                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 hover:border-slate-300 transition-all">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Average Class Score</span>
                          <span className="badge-info text-[10px] px-2 py-0.5 rounded-full font-bold">Class 10A</span>
                        </div>
                        <div className="text-3xl font-black text-slate-900">82.4%</div>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div className="bg-[#ff5c00] h-full rounded-full transition-all duration-500" style={{ width: '82%' }} />
                        </div>
                      </div>

                      <div className="p-5 rounded-2xl bg-[#ffede1]/70 border border-[#ffd8c2] space-y-3 hover:border-[#ffb594] transition-all">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-[#ff5c00] uppercase tracking-wider">AI Grader Engine</span>
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <div className="text-2xl font-black text-slate-900">Gemini 1.5 Flash</div>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                          Instant multi-page handwritten recognition with NEP-aligned rubrics.
                        </p>
                      </div>
                    </div>

                    {/* Subject Benchmarks in Preview */}
                    <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Subject Competency Benchmarks (MAIT Department)</h4>
                        <span className="text-[11px] font-bold text-slate-400">Term 2 Analytics</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                          { subject: 'Mathematics', score: '88.5%', note: 'Top Performer' },
                          { subject: 'Physics', score: '82.4%', note: 'Class Median' },
                          { subject: 'Chemistry', score: '79.1%', note: 'Needs Practice' },
                          { subject: 'Computer Sci', score: '94.0%', note: 'Distinction' }
                        ].map(sub => (
                          <div key={sub.subject} className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs">
                            <span className="text-[11px] font-bold text-slate-500 block">{sub.subject}</span>
                            <span className="text-xl font-extrabold text-slate-900 mt-1 block">{sub.score}</span>
                            <span className="text-[10px] font-semibold text-slate-400 mt-0.5 block">{sub.note}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Tab View 2: Active Evaluations ─────────────── */}
                {previewTab === 'evaluations' && (
                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-slate-500 flex items-center justify-between pb-1">
                      <span>Showing active evaluations for MAIT Department</span>
                      <span className="text-[11px] text-slate-400">4 active test batches</span>
                    </div>

                    <div className="space-y-2.5">
                      {[
                        { title: 'Class 10A — Physics Term 2 Examination', count: '42 / 45 Graded', status: 'Auto-Graded', statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-200', avg: '82.4% avg' },
                        { title: 'Class 12B — Advanced Calculus Mid-Term', count: '38 / 38 Graded', status: 'Completed', statusColor: 'bg-blue-100 text-blue-800 border-blue-200', avg: '88.0% avg' },
                        { title: 'Class 9C — English Literature Essay', count: '31 / 35 Graded', status: 'AI Evaluating', statusColor: 'bg-amber-100 text-amber-800 border-amber-200', avg: '76.5% avg' },
                        { title: 'Class 11A — Computer Science Data Structures', count: '28 / 28 Graded', status: 'Approved', statusColor: 'bg-purple-100 text-purple-800 border-purple-200', avg: '92.5% avg' }
                      ]
                      .filter(item => !previewSearch || item.title.toLowerCase().includes(previewSearch.toLowerCase()))
                      .map((item, idx) => (
                        <div key={idx} className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-100/70 transition-colors">
                          <div className="space-y-1">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900">{item.title}</h4>
                            <div className="flex items-center gap-3 text-xs text-slate-500">
                              <span>{item.count}</span>
                              <span>•</span>
                              <span className="font-semibold text-slate-700">{item.avg}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 self-start sm:self-center">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${item.statusColor}`}>
                              {item.status}
                            </span>
                            <Link to="/assessments" className="text-xs font-bold text-[#ff5c00] hover:underline px-2 py-1">
                              Review
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Tab View 3: Student Analytics ──────────────── */}
                {previewTab === 'analytics' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Top Achievers */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Top Class Achievers</span>
                          <span className="badge-success text-[10px] font-bold px-2 py-0.5 rounded-full">Class 10A</span>
                        </div>
                        <div className="space-y-2">
                          {[
                            { name: 'Aarav Patel', score: '96.4%', rank: '#1', note: 'Consistent A1 across all subjects' },
                            { name: 'Priya Verma', score: '94.8%', rank: '#2', note: 'Top score in Physics & Math' },
                            { name: 'Rohan Mehta', score: '92.0%', rank: '#3', note: '+14% improvement in Term 2' }
                          ].map((student, i) => (
                            <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/80 text-xs">
                              <div className="flex items-center gap-2.5">
                                <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center">{student.rank}</span>
                                <div>
                                  <p className="font-bold text-slate-900">{student.name}</p>
                                  <p className="text-[10px] text-slate-400">{student.note}</p>
                                </div>
                              </div>
                              <span className="font-extrabold text-[#ff5c00]">{student.score}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* AI Early Intervention */}
                      <div className="p-4 rounded-2xl bg-[#fff5ed] border border-[#ffd8c2] space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#ea4e00] flex items-center gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5 text-[#ff5c00]" />
                              <span>AI Intervention Alert</span>
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">3 Students</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium">
                            3 students scored below 50% in <strong>Wave Optics &amp; Quadratic Equations</strong>. Immediate remedial assistance recommended prior to Board Finals.
                          </p>
                        </div>
                        <div className="pt-2">
                          <Link
                            to="/toolkit"
                            className="btn-markmitra-dark text-xs px-4 py-2 rounded-full w-full flex items-center justify-center gap-1.5 font-bold"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-[#ff5c00]" />
                            <span>Generate 1-Click Remedial Worksheet</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="solutions" className="bg-white border-t border-slate-200/80 py-28 px-6 sm:px-16">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#ff5c00] tracking-widest uppercase">Platform Capabilities</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Built specifically for modern educational ecosystems
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              Every tool is engineered to save teachers hundreds of hours while giving administrators real-time institutional insight.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-[#ffede1] text-[#ff5c00] flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">AI Answer Sheet Grader</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Upload handwritten or digital copies. Gemini 1.5 evaluates student answers against marking schemes and provides constructive feedback.</p>
              </div>
              <Link to="/grader" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#ff5c00] hover:underline">
                <span>Try Grader</span><ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">Teacher's Toolkit</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Generate 45-minute structured lesson plans, unit tests, Bloom's rubrics, and remedial worksheets with a single prompt.</p>
              </div>
              <Link to="/toolkit" className="inline-flex items-center gap-1.5 text-sm font-bold text-sky-700 hover:underline">
                <span>Open Toolkit</span><ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">Student Analytics</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Continuous competency radar graphs. Detect learning gaps and at-risk students well before board exams.</p>
              </div>
              <Link to="/analytics" className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:underline">
                <span>Explore Analytics</span><ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#121826] text-white py-12 px-6 sm:px-16 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#ff5c00] flex items-center justify-center text-white text-xs font-black">M</div>
            <span className="font-bold text-white text-sm">MarkMitra</span>
            <span>• Incubated at MAIT, Rohini</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/login" className="hover:text-white transition-colors">Teacher Portal</Link>
            <Link to="/admin" className="hover:text-white transition-colors">Admin Console</Link>
            <Link to="/dashboard" className="hover:text-white transition-colors font-bold text-[#ff5c00]">Live App</Link>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {meetingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full max-h-[calc(100vh-2rem)] overflow-y-auto shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Book a Personalized Demo</h3>
              <button onClick={() => setMeetingModal(false)} className="text-slate-400 hover:text-slate-700 text-lg">X</button>
            </div>
            <p className="text-sm text-slate-500">Schedule a 15-minute walkthrough with an academic technology consultant.</p>
            <div className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#ff5c00]" />
              <input type="email" placeholder="Official Email Address" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#ff5c00]" />
              <input type="text" placeholder="School / College / Institution" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#ff5c00]" />
              <button onClick={() => { alert('Thank you! We will reach out within 24 hours.'); setMeetingModal(false); }} className="btn-markmitra-orange w-full rounded-xl py-3.5 text-sm font-bold shadow-md">
                Confirm Request
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
