import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldAlert, Home } from 'lucide-react';

export function AccessDeniedScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-bg via-white to-brand-bg/50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <ShieldAlert className="h-8 w-8 text-red-600" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl text-brand-primary">Access Denied</CardTitle>
            <CardTitle className="text-xl text-brand-primary">पहुंच अस्वीकृत</CardTitle>
          </div>
          <CardDescription className="text-base">
            This area is restricted to authorized administrators only.
          </CardDescription>
          <CardDescription className="text-base">
            यह क्षेत्र केवल अधिकृत प्रशासकों के लिए प्रतिबंधित है।
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button onClick={() => navigate({ to: '/' })} className="gap-2">
            <Home className="h-4 w-4" />
            Return to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
