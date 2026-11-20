import { useAuth } from '../contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import {
  Users, FileText, CheckCircle, TrendingUp, Clock,
  Award, AlertTriangle, BarChart2, Zap, ArrowRight
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts';

const performanceData = [
  { month: 'Jun', avg: 68, submissions: 120 },
  { month: 'Jul', avg: 72, submissions: 145 },
  { month: 'Aug', avg: 70, submissions: 160 },
  { month: 'Sep', avg: 78, submissions: 180 },
  { month: 'Oct', avg: 82, submissions: 175 },
  { month: 'Nov', avg: 85, submissions: 200 },
];

const subjectData = [
  { name: 'Mathematics', score: 85, fill: '#ff5c00' },
  { name: 'Physics', score: 78, fill: '#0284c7' },
  { name: 'English', score: 91, fill: '#16a34a' },
  { name: 'History', score: 74, fill: '#d97706' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white rounded-xl p-3 text-xs border border-slate-200 shadow-lg">
        <p className="text-slate-500 font-semibold mb-1">{label}</p>
        {payload.map(p => (
          <p key={p.name} className="text-slate-800 font-bold">
            {p.name}: <span style={{ color: p.color }}>{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function StatCard({ icon: Icon, label, value, delta, color }) {
  return (
    <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center shadow-xs`}>
          <Icon className="w-5 h-5" />
        </div>
        {delta && (
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${delta > 0 ? 'badge-success' : 'badge-error'}`}>
            {delta > 0 ? '+' : ''}{delta}%
          </span>
        )}
      </div>
      <div className="text-4xl font-black text-slate-900 mb-2 tracking-tight">{value}</div>
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{label}</div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();

  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => api.get('/dashboard/stats').then(r => r.data).catch(() => ({
      totalStudents: 1248,
      assessmentsThisWeek: 34,
      avgScore: 82,
      pendingReviews: 12,
    })),
    placeholderData: {
      totalStudents: 1248,
      assessmentsThisWeek: 34,
      avgScore: 82,
      pendingReviews: 12,
    }
  });

  return (
    <div className="space-y-10 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/60">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-slate-500 mt-1 text-sm">Here's your institutional intelligence overview and active metrics for today.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/assessments" className="btn-markmitra-dark text-xs px-4 py-2.5 rounded-full">
            New Assessment
          </Link>
          <Link to="/grader" className="btn-markmitra-orange text-xs px-4 py-2.5 rounded-full">
            AI Grader
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={Users} label="Total Students" value={stats?.totalStudents?.toLocaleString() || '1,248'} delta={12} color="bg-blue-100 text-blue-700" />
        <StatCard icon={FileText} label="Assessments This Week" value={stats?.assessmentsThisWeek || '34'} delta={8} color="bg-purple-100 text-purple-700" />
        <StatCard icon={TrendingUp} label="Average Score" value={`${stats?.avgScore || 82}%`} delta={5} color="bg-[#ffede1] text-[#ff5c00]" />
        <StatCard icon={Clock} label="Pending Reviews" value={stats?.pendingReviews || '12'} color="bg-amber-100 text-amber-700" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Performance Trend */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-4 sm:p-7 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">Performance Trend</h2>
              <p className="text-xs text-slate-500 mt-0.5">Class average scores &amp; submission volume</p>
            </div>
            <span className="badge-info text-xs px-3 py-1 rounded-full font-bold">Last 6 months</span>
          </div>
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={performanceData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="avgGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff5c00" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#ff5c00" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="subGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#94a3b8" tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="avg" name="Avg Score" stroke="#ff5c00" fill="url(#avgGrad)" strokeWidth={2.5} dot={{ fill: '#ff5c00', r: 4 }} />
              <Area type="monotone" dataKey="submissions" name="Submissions" stroke="#0284c7" fill="url(#subGrad)" strokeWidth={2} dot={{ fill: '#0284c7', r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Performance */}
        <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-1">Subject Proficiency</h2>
            <p className="text-xs text-slate-500 mb-6">Average score distribution</p>
            <div className="space-y-4">
              {subjectData.map(s => (
                <div key={s.name}>
                  <div className="flex items-center justify-between mb-1 text-xs">
                    <span className="font-semibold text-slate-700">{s.name}</span>
                    <span className="font-extrabold text-slate-900">{s.score}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${s.score}%`, backgroundColor: s.fill }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4">
            <Link to="/analytics" className="text-xs font-bold text-[#ff5c00] hover:underline flex items-center gap-1">
              <span>View detailed breakdown</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Recent Assessments */}
        <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-slate-900">Recent Evaluations</h2>
            <Link to="/assessments" className="text-xs font-bold text-[#ff5c00] hover:underline">View all →</Link>
          </div>
          <div className="space-y-3">
            {[
              { title: 'Class 10 – Physics Mid-Term', status: 'graded', score: '84%', time: '2h ago' },
              { title: 'Class 12 – Chemistry Quiz', status: 'pending', score: '—', time: '5h ago' },
              { title: 'Class 9 – Math Unit Test', status: 'graded', score: '76%', time: '1d ago' },
              { title: 'Class 11 – English Essay', status: 'in-review', score: '—', time: '1d ago' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0
                  ${item.status === 'graded' ? 'bg-emerald-100 text-emerald-700' : item.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                  {item.status === 'graded' ? <CheckCircle className="w-4 h-4" /> :
                   item.status === 'pending' ? <Clock className="w-4 h-4" /> :
                   <AlertTriangle className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{item.title}</p>
                  <p className="text-xs text-slate-400">{item.time}</p>
                </div>
                <div className="text-sm font-extrabold text-slate-900">{item.score}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & AI Tip */}
        <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-4">Quick Navigation</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'New Assessment', icon: FileText, color: 'bg-purple-100 text-purple-700', path: '/assessments' },
                { label: 'Grade Papers', icon: CheckCircle, color: 'bg-[#ffede1] text-[#ff5c00]', path: '/grader' },
                { label: 'Lesson Planner', icon: Zap, color: 'bg-amber-100 text-amber-700', path: '/toolkit' },
                { label: 'Analytics Hub', icon: BarChart2, color: 'bg-emerald-100 text-emerald-700', path: '/analytics' },
              ].map(action => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.label}
                    to={action.path}
                    className="rounded-xl p-4 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/70 flex flex-col items-center gap-2 text-center transition-all shadow-2xs"
                  >
                    <div className={`w-9 h-9 rounded-xl ${action.color} flex items-center justify-center font-bold`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-700">{action.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* AI Tip matching screenshot style */}
          <div className="p-4 rounded-xl bg-[#ffede1]/70 border border-[#ffd8c2]">
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-[#ff5c00] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-[#ff5c00] uppercase tracking-wider mb-1">AI Academic Insight</p>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Class 10B shows a 15% dip in kinematics vector problems. Consider using the Teacher's Toolkit to generate a targeted 10-minute remedial worksheet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
