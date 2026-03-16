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

import AppBadge from './components/global/AppBadge';
import AppButton from './components/global/AppButton';
import AppConfidenceBar from './components/global/AppConfidenceBar';
import AppDashboardCard from './components/global/AppDashboardCard';
import AppTags from './components/global/AppTags';
import { Download, Plus, Shield } from 'lucide-react';

function App() {
  return (
    <div className="flex flex-wrap gap-4 p-6">
      <h1 className="w-full text-xl font-semibold mb-2">Threat Intelligence Dashboard</h1>
      <p className="w-full text-gray-400 mb-6">Start building here. Check the design reference and README for details.</p>
      <div className="flex flex-wrap gap-4 items-start">
        <AppButton variant="primary" onClick={() => {}}>
          Primary
        </AppButton>
        <AppButton variant="secondary" onClick={() => {}}>
          Secondary
        </AppButton>
        <AppButton variant="ghost" onClick={() => {}}>
          Ghost
        </AppButton>
        <AppButton variant="danger" onClick={() => {}}>
          Danger
        </AppButton>
        <AppButton size="small" onClick={() => {}}>
          Small
        </AppButton>
        <AppButton variant="secondary" icon={<Download size={14} />} iconPosition="left" onClick={() => {}}>
          Export
        </AppButton>
        <AppButton variant="primary" icon={<Plus size={14} />} iconPosition="right" onClick={() => {}}>
          Add
        </AppButton>
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        <AppTags variant="red">Red</AppTags>
        <AppTags variant="blue">Blue</AppTags>
        <AppTags variant="purple">Purple</AppTags>
        <AppTags variant="teal">Teal</AppTags>
        <AppTags variant="gray">Gray</AppTags>
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        <AppBadge severity="critical">Critical</AppBadge>
        <AppBadge severity="high">High</AppBadge>
        <AppBadge severity="medium">Medium</AppBadge>
        <AppBadge severity="low">Low</AppBadge>
      </div>
      <div className="flex flex-col gap-4 w-64">
        <AppConfidenceBar confidence={95} variant="critical" />
        <AppConfidenceBar confidence={75} variant="high" />
        <AppConfidenceBar confidence={50} variant="medium" />
        <AppConfidenceBar confidence={25} variant="low" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
        <AppDashboardCard
          variant="neutral"
          title="Total Indicators"
          icon={<Shield />}
          description="12% up from last week"
          value={2087}
        />
        <AppDashboardCard
          variant="critical"
          title="Critical"
          icon={null}
          description="Requires immediate action"
          value={342}
        />
        <AppDashboardCard
          variant="high"
          title="High"
          icon={null}
          description="Active monitoring"
          value={798}
        />
        <AppDashboardCard
          variant="medium"
          title="Medium"
          icon={null}
          description="Under review"
          value={1139}
        />
        <AppDashboardCard
          variant="low"
          title="Low"
          icon={null}
          description="Informational"
          value={568}
        />
      </div>
    </div>
  );
}

export default App;
