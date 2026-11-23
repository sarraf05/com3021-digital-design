import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallbackTitle?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    const message =
      error instanceof Error && error.message
        ? error.message
        : typeof error === 'string'
          ? error
          : 'Unexpected runtime error';
    return { hasError: true, errorMessage: message };
  }

  private handleReload = () => {
    this.setState({ hasError: false, errorMessage: '' });
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="m-auto max-w-lg w-full rounded-3xl border-2 border-rose-200 border-b-4 bg-white p-6 space-y-4 shadow-sm text-center">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-rose-100 border border-rose-200 text-rose-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="font-display text-lg font-black text-slate-900">
              {this.props.fallbackTitle || 'Görünüm Yüklenemedi / View Failed to Load'}
            </h2>
            <p className="text-xs font-mono text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2 break-all">
              {this.state.errorMessage}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => this.setState({ hasError: false, errorMessage: '' })}
              className="min-h-[40px] px-4 py-2 rounded-2xl border-2 border-slate-200 border-b-4 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 cursor-pointer"
            >
              Tekrar Dene / Retry
            </button>
            <button
              type="button"
              onClick={this.handleReload}
              className="min-h-[40px] px-4 py-2 rounded-2xl border-2 border-sky-600 border-b-4 bg-sky-500 hover:bg-sky-600 text-xs font-extrabold text-white inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sayfayı Yenile / Reload</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
