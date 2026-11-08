import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import { Plus, Search, FileText, Clock, CheckCircle, ChevronRight, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const statusMap = {
  draft: { label: 'Draft', cls: 'badge-warning' },
  active: { label: 'Active', cls: 'badge-success' },
  graded: { label: 'Graded', cls: 'badge-info' },
};

const mockAssessments = [
  { id: 1, title: 'Class 10 – Physics Mid-Term (Kinematics & Optics)', subject: 'Physics', class: '10A', due_date: '2026-10-25', status: 'active', total_marks: 100, submissions: 28 },
  { id: 2, title: 'Class 12 – Chemistry Organic Reactions Evaluation', subject: 'Chemistry', class: '12B', due_date: '2026-10-22', status: 'graded', total_marks: 50, submissions: 35 },
  { id: 3, title: 'Class 9 – Mathematics Linear Equations Quiz', subject: 'Mathematics', class: '9C', due_date: '2026-10-30', status: 'draft', total_marks: 75, submissions: 0 },
  { id: 4, title: 'Class 11 – English Essay & Comprehension', subject: 'English', class: '11A', due_date: '2026-10-28', status: 'active', total_marks: 30, submissions: 15 },
];

function CreateModal({ open, onClose }) {
  const qc = useQueryClient();
  const [form, setForm] = useState({ title: '', subject: '', class: '', total_marks: 100, due_date: '' });

  const mutation = useMutation({
    mutationFn: (data) => api.post('/assessments', data),
    onSuccess: () => {
      toast.success('Assessment created successfully!');
      qc.invalidateQueries(['assessments']);
      onClose();
    },
    onError: () => toast.error('Failed to create assessment'),
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="relative bg-white border border-slate-200 rounded-3xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Create Assessment</h2>
            <p className="text-xs text-slate-500 mt-0.5">Schedule a new academic test or evaluation</p>
          </div>
          <button id="btn-close-modal" onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {[
            { id: 'input-title', label: 'Title', key: 'title', type: 'text', placeholder: 'e.g. Class 10 Physics Mid-Term' },
            { id: 'input-subject', label: 'Subject', key: 'subject', type: 'text', placeholder: 'e.g. Physics' },
            { id: 'input-class', label: 'Class / Section', key: 'class', type: 'text', placeholder: 'e.g. 10A' },
            { id: 'input-marks', label: 'Total Marks', key: 'total_marks', type: 'number', placeholder: '100' },
            { id: 'input-due', label: 'Due Date', key: 'due_date', type: 'date', placeholder: '' },
          ].map(f => (
            <div key={f.key}>
              <label htmlFor={f.id} className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">{f.label}</label>
              <input
                id={f.id}
                type={f.type}
                value={form[f.key]}
                onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:border-[#ff5c00] focus:ring-2 focus:ring-orange-100 transition-all"
              />
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-8">
          <button
            id="btn-cancel-create"
            onClick={onClose}
            className="flex-1 py-3 rounded-full border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-all"
          >
            Cancel
          </button>
          <button
            id="btn-submit-assessment"
            onClick={() => mutation.mutate(form)}
            disabled={mutation.isPending}
            className="flex-1 py-3 rounded-full bg-[#18181b] hover:bg-black text-white text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2"
          >
            {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {mutation.isPending ? 'Publishing...' : 'Save & Publish'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AssessmentPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const { data: assessments = mockAssessments } = useQuery({
    queryKey: ['assessments'],
    queryFn: () => api.get('/assessments').then(r => r.data).catch(() => mockAssessments),
  });

  const filtered = assessments.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.subject.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || a.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-8">
      <CreateModal open={showCreate} onClose={() => setShowCreate(false)} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Assessments &amp; Evaluations
          </h1>
          <p className="text-slate-500 mt-1 text-sm">Schedule, distribute and oversee all academic test papers and exams</p>
        </div>

        <button
          id="btn-create-assessment"
          onClick={() => setShowCreate(true)}
          className="btn-markmitra-dark text-xs px-5 py-2.5 rounded-full flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Assessment</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="assessment-search"
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title, subject..."
            className="w-full bg-white border border-slate-200 rounded-full pl-9 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#ff5c00] transition-all shadow-2xs"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['all', 'active', 'draft', 'graded'].map(f => (
            <button
              key={f}
              id={`filter-${f}`}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all capitalize whitespace-nowrap
                ${filter === f
                  ? 'bg-[#18181b] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
            >
              {f === 'all' ? 'All Tests' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Assessment Cards */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.map(a => {
          const { label, cls } = statusMap[a.status] || statusMap.draft;
          return (
            <div key={a.id} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#ffede1] text-[#ff5c00] flex items-center justify-center font-bold flex-shrink-0 shadow-2xs">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-base font-bold text-slate-900">{a.title}</h3>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${cls}`}>{label}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 flex-wrap">
                    <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">{a.subject}</span>
                    <span>Class {a.class}</span>
                    <span>•</span>
                    <span className="font-semibold text-slate-800">{a.total_marks} Marks</span>
                    {a.submissions > 0 && (
                      <>
                        <span>•</span>
                        <span className="text-emerald-700 font-semibold">{a.submissions} Submissions</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Due {new Date(a.due_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                </div>
                <button
                  id={`btn-view-assessment-${a.id}`}
                  className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1"
                >
                  <span>Open</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-800 font-bold">No assessments match your criteria</p>
            <p className="text-slate-500 text-xs mt-1">Try resetting the filter or search keyword.</p>
          </div>
        )}
      </div>
    </div>
  );
}
