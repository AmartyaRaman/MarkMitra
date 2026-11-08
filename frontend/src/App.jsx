import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AppLayout from './layouts/AppLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AssessmentPage from './pages/AssessmentPage';
import TeacherToolkitPage from './pages/TeacherToolkitPage';
import StudentAnalyticsPage from './pages/StudentAnalyticsPage';
import AdminPage from './pages/AdminPage';
import GraderPage from './pages/GraderPage';
import LandingPage from './pages/LandingPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 5 * 60 * 1000 }
  }
});

function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen bg-surface-900 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full border-4 border-primary-600 border-t-transparent animate-spin" />
        <p className="text-slate-400 text-sm">Loading VedaAI...</p>
      </div>
    </div>
  );
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" replace />;
  return children;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1e293b',
                color: '#f1f5f9',
                border: '1px solid #334155',
                borderRadius: '10px',
                fontSize: '14px',
              },
              success: { iconTheme: { primary: '#6366f1', secondary: '#fff' } },
            }}
          />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<DashboardPage />} />
              <Route
                path="assessments"
                element={
                  <ProtectedRoute roles={['admin', 'teacher']}>
                    <AssessmentPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="grader"
                element={
                  <ProtectedRoute roles={['admin', 'teacher']}>
                    <GraderPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="toolkit"
                element={
                  <ProtectedRoute roles={['admin', 'teacher']}>
                    <TeacherToolkitPage />
                  </ProtectedRoute>
                }
              />
              <Route path="analytics" element={<StudentAnalyticsPage />} />
              <Route
                path="admin"
                element={
                  <ProtectedRoute roles={['admin']}>
                    <AdminPage />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
