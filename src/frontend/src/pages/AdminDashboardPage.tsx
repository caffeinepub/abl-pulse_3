import { useNavigate } from '@tanstack/react-router';
import { Home, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboardPage() {
  const navigate = useNavigate();

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
      <main className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <Shield className="h-10 w-10 text-brand-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-brand-primary">
              Welcome Admin
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ABL Pulse Administration Dashboard
            </p>
          </div>

          {/* Coming Soon Section */}
          <Card className="shadow-lg border-brand-accent/20 bg-gradient-to-br from-white to-brand-bg/30">
            <CardHeader>
              <CardTitle className="text-brand-primary">Dashboard Features Coming Soon</CardTitle>
              <CardDescription>
                Additional admin functionality will be available here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                  User assessment data viewer with search and filters
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                  Export wellness reports and analytics
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                  Admin user management
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                  System configuration and settings
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
