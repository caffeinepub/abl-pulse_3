import { StatCard } from './StatCard';
import { Users, TrendingUp, AlertTriangle, Calendar } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAdminStats } from '@/hooks/useQueries';

export function QuickStatsCards() {
  const { data: stats, isLoading } = useAdminStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  const totalAssessments = stats?.totalAssessments || 0;
  const averageScore = stats?.averageScore || 0;
  const alertUsers = stats?.alertUsersCount || 0;
  const recentSubmissions = stats?.recentSubmissionsCount || 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Assessments"
        value={totalAssessments}
        icon={<Users className="h-5 w-5" />}
        variant="default"
        subtitle="All completed reports"
      />
      <StatCard
        title="Average Score"
        value={`${Math.round(averageScore)}/160`}
        icon={<TrendingUp className="h-5 w-5" />}
        variant="success"
        subtitle="Overall mean score"
      />
      <StatCard
        title="Alert Users"
        value={alertUsers}
        icon={<AlertTriangle className="h-5 w-5" />}
        variant="danger"
        subtitle="Need immediate attention"
      />
      <StatCard
        title="Recent Submissions"
        value={recentSubmissions}
        icon={<Calendar className="h-5 w-5" />}
        variant="warning"
        subtitle="Last 30 days"
      />
    </div>
  );
}
