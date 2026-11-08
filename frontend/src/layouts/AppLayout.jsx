import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#edf5fb] text-slate-800">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <main className="flex flex-col flex-1 overflow-y-auto px-8 py-10 pb-16 md:px-12 md:py-12">
          <div className="mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
