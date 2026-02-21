import { useNavigate } from '@tanstack/react-router';
import { Home, Shield, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useAdminAssessments } from '@/hooks/useQueries';
import { AccessDeniedScreen } from '@/components/admin/AccessDeniedScreen';
import { QuickStatsCards } from '@/components/admin/QuickStatsCards';
import { UserAssessmentDataTable } from '@/components/admin/UserAssessmentDataTable';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { identity, isInitializing } = useInternetIdentity();
  const { data: assessments = [], isLoading, error } = useAdminAssessments();

  // Show loading while checking authentication
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-bg via-white to-brand-bg/50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-brand-primary mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if user is authenticated
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  // For now, allow all authenticated users to access admin dashboard
  // In production, you would check against admin whitelist
  if (!isAuthenticated) {
    return <AccessDeniedScreen />;
  }

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
          <QuickStatsCards data={assessments} isLoading={isLoading} />

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
