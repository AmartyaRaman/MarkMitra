import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Brain, ArrowRight, CheckCircle2,
  BookOpen, BarChart3, ChevronRight, HelpCircle, Bell, Search
} from 'lucide-react';

export default function LandingPage() {
  const [meetingModal, setMeetingModal] = useState(false);

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
            <button onClick={() => setMeetingModal(true)} className="btn-markmitra-dark text-xs sm:text-sm px-5 py-2.5 rounded-full font-bold shadow-sm">
              Contact Us
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-6 sm:px-16 pt-20 pb-0 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b from-blue-100/70 via-sky-50/30 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-sm text-xs font-semibold text-slate-700">
          <div className="w-4 h-4 rounded-full bg-[#ff5c00] text-white flex items-center justify-center text-[8px] font-black leading-none">M</div>
          <span>Incubated at MAIT, Rohini</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] mb-5">
          AI Academic Assessment &amp;<br />
          <span className="inline-block mt-3 px-6 py-2 rounded-2xl bg-[#ffede1] text-[#ff5c00] font-black border border-[#ffd8c2] shadow-sm">
            Intelligence Platform
          </span>
        </h1>

        <p className="max-w-xl mx-auto text-slate-500 text-base sm:text-lg leading-relaxed mb-10">
          MarkMitra helps educational institutions elevate student performance, empower teachers, and increase academic results powered by AI.
        </p>

        <div className="flex flex-row items-center justify-center gap-4 mb-16">
          <Link to="/login" id="btn-hero-free-for-teachers" className="btn-markmitra-dark px-7 py-3 text-sm rounded-full shadow-md font-bold hover:scale-[1.02] transition-transform">
            Free for Teachers
          </Link>
          <button onClick={() => setMeetingModal(true)} id="btn-hero-book-meeting" className="btn-markmitra-light px-7 py-3 text-sm rounded-full shadow-sm font-semibold hover:bg-slate-50 transition-all">
            Book a meeting
          </button>
        </div>

        {/* Dashboard Preview */}
        <div className="w-full max-w-5xl mx-auto">
          <div className="rounded-t-3xl border-t border-x border-slate-300/70 bg-slate-100/80 p-3 sm:p-4 pb-0 shadow-2xl">
            <div className="bg-white rounded-t-2xl border-t border-x border-slate-200 overflow-hidden shadow-sm">

              <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded bg-[#18181b] flex items-center justify-center text-white text-[10px] font-black">M</div>
                    <span className="font-extrabold text-xs text-slate-900">MarkMitra</span>
                  </div>
                  <span className="text-slate-300">|</span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold">
                    <span className="text-slate-800">Assignments</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] text-slate-400">
                    <Search className="w-3 h-3 text-slate-400" />
                    <span>Search students, tests...</span>
                  </div>
                  <button className="text-slate-400"><HelpCircle className="w-3.5 h-3.5" /></button>
                  <button className="text-slate-400 relative">
                    <Bell className="w-3.5 h-3.5" />
                    <span className="w-1.5 h-1.5 bg-[#ff5c00] rounded-full absolute top-0 right-0" />
                  </button>
                  <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200 text-xs font-bold text-slate-800">
                    <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px] font-bold">MR</div>
                    <span className="hidden md:inline text-[11px]">Madhur Rastogi</span>
                    <span className="text-[9px] text-slate-400">?</span>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 bg-white text-left space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-3.5 py-1.5 rounded-lg bg-slate-900 text-white shadow-sm">Assessment Summary</span>
                    <span className="text-xs font-semibold px-3.5 py-1.5 text-slate-500 cursor-pointer hidden sm:inline">Active Evaluations</span>
                    <span className="text-xs font-semibold px-3.5 py-1.5 text-slate-500 cursor-pointer hidden sm:inline">Student Analytics</span>
                  </div>
                  <Link to="/dashboard" className="inline-flex items-center gap-2 text-xs font-bold text-[#ff5c00] hover:text-[#ea4e00] bg-[#ffede1] px-4 py-2 rounded-full transition-colors self-start sm:self-auto">
                    <span>Launch Live Platform</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
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

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Average Class Score</span>
                      <span className="badge-info text-[10px] px-2 py-0.5 rounded-full font-bold">Class 10A</span>
                    </div>
                    <div className="text-3xl font-black text-slate-900">82.4%</div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#ff5c00] h-full rounded-full" style={{ width: '82%' }} />
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#ffede1]/60 border border-[#ffd8c2] space-y-3">
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
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-6">
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
