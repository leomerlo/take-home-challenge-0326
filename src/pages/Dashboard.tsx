import AppButton from '@/components/global/AppButton';
import DashboardStats from '@/components/dashboard/DashboardStats';
import DashboardIndicators from '@/components/dashboard/DashboardIndicators';
import { ArrowBigDown, Plus } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="flex flex-col lg:h-screen">
      <div className="bg-(--bg-surface) px-(--sp-8) py-(--sp-6) flex flex-col lg:flex-row gap-(--sp-4) lg:items-center justify-between border-b border-(--border-subtle)">
        <div>
          <h1 className="text-(--text-primary) text-xl font-bold -tracking-[0.3px]">Threat Intelligence Dashboard</h1>
          <p className="text-(--text-secondary) text-[12px] mt-(2px)">Real-time threat indicators and campaign intelligence</p>
        </div>
        <div className="flex items-center gap-(--sp-3)">
          <AppButton
            variant="secondary"
            size="small"
            iconPosition="left"
            icon={<ArrowBigDown size={16} />}
          >
            Export
          </AppButton>
          <AppButton
            variant="primary"
            size="small"
            icon={<Plus size={16} />}
          >
            Add Indicator
          </AppButton>
        </div>
      </div>
      <div className="flex flex-col flex-1 w-full overflow-y-auto">
        <div className="py-(--sp-5) px-(--sp-8)" data-testid="dashboard-stats">
          <DashboardStats />
        </div>
        <div className="flex-1 flex flex-col max-w-screen lg:max-w-none overflow-x-auto">
          <DashboardIndicators />
        </div>
      </div>
    </div>
  )
}

export default Dashboard