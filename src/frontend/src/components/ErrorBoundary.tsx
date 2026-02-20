import React, { Component, type ReactNode } from 'react';
import { Button } from './ui/button';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-bg via-brand-bg to-brand-primary/5 p-4">
          <div className="w-full max-w-md rounded-2xl border border-brand-primary/20 bg-white p-8 shadow-2xl">
            <div className="mb-6 flex items-center justify-center">
              <div className="rounded-full bg-destructive/10 p-4">
                <AlertCircle className="h-12 w-12 text-destructive" />
              </div>
            </div>
            
            <h1 className="mb-3 text-center font-serif text-2xl font-bold text-brand-text">
              Something went wrong
            </h1>
            <p className="mb-2 text-center text-brand-text/80">
              कुछ गलत हो गया
            </p>
            
            {this.state.error && (
              <div className="mb-6 rounded-lg bg-destructive/5 p-4">
                <p className="text-sm text-destructive/80">
                  {this.state.error.message}
                </p>
              </div>
            )}
            
            <div className="space-y-3">
              <Button
                onClick={this.handleReset}
                className="w-full bg-brand-primary hover:bg-brand-primary/90"
              >
                Try Again / फिर से कोशिश करें
              </Button>
              
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="w-full"
              >
                Reload Page / पेज रीलोड करें
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
