/**
 * Threat Intelligence Dashboard
 *
 * Your task: Build out this dashboard to match the provided design reference.
 * See the README for full requirements.
 *
 * The mock API is running at /api/indicators (proxied via Vite).
 * Types are defined in ./types/indicator.ts
 *
 * Good luck!
 */

import TheSidebar from '@/components/TheSidebar';
import Dashboard from '@/pages/Dashboard';
import NotFound from '@/pages/NotFound';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="flex">
      <TheSidebar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
