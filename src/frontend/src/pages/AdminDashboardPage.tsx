import { useNavigate } from '@tanstack/react-router';
import { Home, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdminAssessments } from '@/hooks/useQueries';
import { QuickStatsCards } from '@/components/admin/QuickStatsCards';
import { UserAssessmentDataTable } from '@/components/admin/UserAssessmentDataTable';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { data: assessments = [], isLoading, error } = useAdminAssessments();

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-bg via-white to-brand-bg/50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-brand-primary/10 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: '/' })}
              className="text-brand-primary hover:text-brand-accent hover:bg-brand-bg/50"
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </div>
          <div className="flex items-center gap-2 text-brand-primary">
            <Shield className="h-5 w-5" />
            <span className="text-sm font-semibold hidden sm:inline">Admin Dashboard</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="space-y-8">
          {/* Page Title */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-heading text-brand-primary">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage and monitor wellness assessments</p>
          </div>

          {/* Error State */}
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Failed to load assessment data. Please try refreshing the page.
              </AlertDescription>
            </Alert>
          )}

          {/* Quick Stats Cards */}
          <QuickStatsCards />

          {/* Assessment Data Table */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-brand-primary">User Assessments</h2>
            <UserAssessmentDataTable data={assessments} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  );
}
