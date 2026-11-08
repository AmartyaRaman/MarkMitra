import { useState } from 'react';
import {
  Users, TrendingUp, AlertTriangle, Award,
  ArrowUpRight, ArrowDownRight, Search, ChevronRight
} from 'lucide-react';
import {
  BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Cell
} from 'recharts';

const mockStudents = [
  { id: 1, name: 'Aarav Patel', class: '10A', roll: '1001', avg: 88, status: 'excelling', trend: '+4%', weakSubject: 'History' },
  { id: 2, name: 'Priya Verma', class: '10A', roll: '1002', avg: 92, status: 'excelling', trend: '+2%', weakSubject: 'None' },
  { id: 3, name: 'Rohan Sharma', class: '10A', roll: '1003', avg: 61, status: 'at-risk', trend: '-5%', weakSubject: 'Physics' },
  { id: 4, name: 'Ananya Gupta', class: '10B', roll: '1004', avg: 74, status: 'average', trend: '+1%', weakSubject: 'Math' },
  { id: 5, name: 'Dev Malik', class: '10B', roll: '1005', avg: 58, status: 'at-risk', trend: '-8%', weakSubject: 'Chemistry' },
  { id: 6, name: 'Kavya Nair', class: '10B', roll: '1006', avg: 85, status: 'excelling', trend: '+6%', weakSubject: 'Physics' },
];

const classPerformance = [
  { class: 'Class 9A', avg: 76, students: 38 },
  { class: 'Class 9B', avg: 72, students: 40 },
  { class: 'Class 10A', avg: 84, students: 35 },
  { class: 'Class 10B', avg: 79, students: 36 },
  { class: 'Class 11A', avg: 81, students: 30 },
  { class: 'Class 12A', avg: 86, students: 28 },
];

const radarData = [
  { subject: 'Math', A: 85, B: 72 },
  { subject: 'Physics', A: 78, B: 65 },
  { subject: 'Chemistry', A: 82, B: 80 },
  { subject: 'English', A: 90, B: 85 },
  { subject: 'Computer Sci', A: 88, B: 79 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white rounded-xl p-3 text-xs border border-slate-200 shadow-md">
        <p className="font-bold text-slate-800 mb-1">{label}</p>
        {payload.map(p => (
          <p key={p.name} className="text-slate-600">
            {p.name}: <span className="font-extrabold text-[#ff5c00]">{p.value}%</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function StudentAnalyticsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = mockStudents.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.class.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const atRisk = mockStudents.filter(s => s.avg < 65);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-2 border-b border-slate-200/60">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Student Learning Analytics
        </h1>
        <p className="text-slate-500 mt-1 text-sm">Deep learning diagnostics, competency benchmarking, and early intervention signals</p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Enrolled', value: '1,248', icon: Users, color: 'bg-blue-100 text-blue-700' },
          { label: 'Institutional Avg', value: '79.4%', icon: Award, color: 'bg-[#ffede1] text-[#ff5c00]' },
          { label: 'At-Risk Alerts', value: atRisk.length, icon: AlertTriangle, color: 'bg-rose-100 text-rose-700' },
          { label: 'Top Performers', value: mockStudents.filter(s => s.avg >= 85).length, icon: TrendingUp, color: 'bg-emerald-100 text-emerald-700' },
        ].map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3 shadow-2xs`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900">{stat.value}</div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Class Performance Bar */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Class-wise Performance Benchmarks</h2>
              <p className="text-xs text-slate-500">Average terminal examination scores</p>
            </div>
            <span className="badge-info text-[11px] font-bold px-3 py-1 rounded-full">Term I</span>
          </div>

          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={classPerformance} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="class" stroke="#94a3b8" tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#64748b', fontSize: 11 }} domain={[50, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="avg" name="Avg Score" radius={[6, 6, 0, 0]}>
                {classPerformance.map((entry, i) => (
                  <Cell key={i} fill={entry.avg >= 82 ? '#ff5c00' : entry.avg >= 75 ? '#0284c7' : '#f59e0b'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Radar Comparison */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Subject Comparison (10A vs 10B)</h2>
              <p className="text-xs text-slate-500">Competency radar across key disciplines</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-[#ff5c00]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5c00]" /> 10A
              </span>
              <span className="flex items-center gap-1.5 text-blue-600">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> 10B
              </span>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={230}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }} />
              <PolarRadiusAxis angle={30} domain={[40, 100]} stroke="#cbd5e1" tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <Radar name="Class 10A" dataKey="A" stroke="#ff5c00" fill="#ff5c00" fillOpacity={0.25} strokeWidth={2} />
              <Radar name="Class 10B" dataKey="B" stroke="#0284c7" fill="#0284c7" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Student List Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Student Score Registry</h2>
            <p className="text-xs text-slate-500 mt-0.5">Individual performance and intervention monitoring</p>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="student-search"
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search student or roll..."
                className="w-full sm:w-56 bg-slate-50 border border-slate-200 rounded-full pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#ff5c00] focus:bg-white transition-all shadow-2xs"
              />
            </div>
            <select
              id="student-status-filter"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#ff5c00]"
            >
              <option value="all">All Statuses</option>
              <option value="excelling">Excelling (&gt;80%)</option>
              <option value="average">Average (65–80%)</option>
              <option value="at-risk">At-Risk (&lt;65%)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                {['Student', 'Class', 'Roll', 'Avg Score', 'Trend', 'Focus Subject', 'Intervention Status'].map(h => (
                  <th key={h} className="text-left py-3.5 px-6">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-slate-50/70 transition-all">
                  <td className="py-4 px-6 font-bold text-slate-900">{s.name}</td>
                  <td className="py-4 px-6 font-semibold text-slate-600">{s.class}</td>
                  <td className="py-4 px-6 text-slate-400 font-mono text-[11px]">{s.roll}</td>
                  <td className="py-4 px-6">
                    <span className="font-extrabold text-slate-900 text-sm">{s.avg}%</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1 font-bold text-[11px] ${s.trend.startsWith('+') ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {s.trend.startsWith('+') ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                      {s.trend}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600 font-medium">{s.weakSubject}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full capitalize
                      ${s.status === 'excelling' ? 'badge-success' : s.status === 'at-risk' ? 'badge-error' : 'badge-warning'}`}>
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
