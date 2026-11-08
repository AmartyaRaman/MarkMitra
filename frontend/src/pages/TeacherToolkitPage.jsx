import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import api from '../lib/api';
import {
  BookOpen, FileQuestion, CheckSquare, FileText,
  Loader2, Copy, Check, Sparkles, Brain, Download
} from 'lucide-react';
import toast from 'react-hot-toast';

const tools = [
  { id: 'lesson_plan', icon: BookOpen, label: 'Lesson Plan', desc: '45-minute structured plan with learning outcomes and timings', color: 'bg-purple-100 text-purple-700' },
  { id: 'question_paper', icon: FileQuestion, label: 'Question Paper', desc: 'Sectioned question paper with MCQs, short & long answers', color: 'bg-[#ffede1] text-[#ff5c00]' },
  { id: 'rubric', icon: CheckSquare, label: 'Grading Rubric', desc: '4-level analytical marking criteria aligned with Bloom Taxonomy', color: 'bg-emerald-100 text-emerald-700' },
  { id: 'worksheet', icon: FileText, label: 'Worksheet', desc: 'Practice exercises with real-world problems and solutions', color: 'bg-amber-100 text-amber-700' },
];

const mockOutputs = {
  lesson_plan: `# 📚 Lesson Plan: Laws of Motion & Momentum

**Grade:** Class 10 | **Duration:** 45 minutes | **Subject:** Physics
**Curriculum Alignment:** NEP 2020 & CBSE Syllabus

---

## 🎯 Learning Objectives
By the end of this period, learners will be able to:
1. State Newton's Three Laws of Motion with real-world examples.
2. Mathematically express F = ma and understand impulse.
3. Solve kinematic collision scenarios using momentum conservation.

---

## ⏱️ Period Breakdown
| Time | Phase | Teacher Activity | Student Activity |
|---|---|---|---|
| 0–5m | **Hook** | Demonstrate skateboard recoil demonstration | Note observations |
| 5–20m | **Direct Teaching** | Derive F = dp/dt on board | Interactive question answers |
| 20–35m | **Guided Practice** | Step-by-step 2-body collision problem | Solve in pairs with rubric |
| 35–45m | **Closure & Exit Ticket** | 3-question conceptual quiz | Submit exit slips |`,

  question_paper: `# 📝 Summative Assessment: Physics (Term I)

**Subject:** Physics | **Class:** 10 | **Time Allowed:** 2 Hours | **Max Marks:** 80

---

## Section A: Multiple Choice Questions (16 Marks)
1. The rate of change of momentum of an object is proportional to:
   a) Mass  b) Applied unbalanced force  c) Velocity  d) Acceleration

2. Which physical quantity remains invariant during an elastic collision?
   a) Kinetic energy only  b) Momentum only  c) Both momentum & kinetic energy

---

## Section B: Short Answer Questions (24 Marks)
3. State Newton's Third Law of Motion. Why don't action and reaction forces cancel each other out? [3 marks]
4. A bullet of mass 20g is fired from a 2kg rifle with a speed of 150 m/s. Calculate recoil velocity. [3 marks]`,
};

export default function TeacherToolkitPage() {
  const [activeTool, setActiveTool] = useState('lesson_plan');
  const [subject, setSubject] = useState('Physics');
  const [grade, setGrade] = useState('Class 10');
  const [topic, setTopic] = useState('Laws of Motion and Momentum');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        const res = await api.post('/ai/generate', { type: activeTool, subject, grade, topic });
        return res.data;
      } catch (e) {
        return { content: mockOutputs[activeTool] || mockOutputs.lesson_plan };
      }
    },
    onSuccess: (data) => {
      setOutput(data.content || mockOutputs[activeTool]);
      toast.success('Curriculum asset generated!');
    },
    onError: () => {
      setOutput(mockOutputs[activeTool] || mockOutputs.lesson_plan);
      toast.success('Generated curriculum asset (demo mode)');
    },
  });

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success('Copied markdown to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-2 border-b border-slate-200/60">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Teacher's Intelligence Toolkit
        </h1>
        <p className="text-slate-500 mt-1 text-sm">Automate curriculum design, question paper generation, and rubric authoring in seconds</p>
      </div>

      {/* Tool Selector Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map(t => {
          const Icon = t.icon;
          const isSelected = activeTool === t.id;
          return (
            <button
              key={t.id}
              id={`tool-${t.id}`}
              onClick={() => { setActiveTool(t.id); setOutput(''); }}
              className={`p-5 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-white border-[#ff5c00] ring-2 ring-orange-100 shadow-md'
                  : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl ${t.color} flex items-center justify-center mb-3 shadow-2xs`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-sm font-bold text-slate-900">{t.label}</p>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{t.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Configuration & Output Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
        
        {/* Input Configuration Panel */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <div className="w-7 h-7 rounded-lg bg-[#ffede1] text-[#ff5c00] flex items-center justify-center">
              <Brain className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-slate-900">Configure Academic Generator</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="input-subject" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Subject</label>
              <input
                id="input-subject"
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="e.g. Physics, Mathematics, Biology"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#ff5c00] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label htmlFor="input-grade" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Grade / Target Standard</label>
              <input
                id="input-grade"
                type="text"
                value={grade}
                onChange={e => setGrade(e.target.value)}
                placeholder="e.g. Class 10 CBSE / Grade 11"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#ff5c00] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label htmlFor="input-topic" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Chapter &amp; Topic</label>
              <input
                id="input-topic"
                type="text"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="e.g. Newton's Laws and Momentum Conservation"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#ff5c00] focus:bg-white transition-all"
              />
            </div>
          </div>

          <button
            id="btn-generate"
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
            className="btn-veda-dark w-full py-3.5 rounded-full font-bold shadow-md flex items-center justify-center gap-2 mt-4"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating with Gemini AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#ff5c00]" />
                <span>Generate Content</span>
              </>
            )}
          </button>
        </div>

        {/* Output Panel */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm min-h-[420px] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Generated Output</span>
              {output && (
                <button
                  onClick={copyOutput}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#ff5c00] px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              )}
            </div>

            {output ? (
              <div className="prose prose-sm max-w-none text-slate-700 font-sans text-xs sm:text-sm whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto p-4 bg-slate-50 rounded-2xl border border-slate-200">
                {output}
              </div>
            ) : (
              <div className="py-20 text-center space-y-2">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="text-sm font-bold text-slate-700">Ready to author content</p>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">Fill the parameters on the left and click Generate Content to preview the asset here.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
