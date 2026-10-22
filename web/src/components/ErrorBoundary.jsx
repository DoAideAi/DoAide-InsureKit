import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) console.error("Route error:", error, info);
  }

  handleRetry = () => {
    this.setState({ error: null });
  };

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="panel p-8 text-center my-10" role="alert">
        <div className="text-3xl mb-3">⚠️</div>
        <h2 className="text-lg font-semibold text-white mb-2">Something went wrong</h2>
        <p className="text-sm text-white/40 max-w-md mx-auto mb-5">
          This page hit an unexpected error. Your saved data is safe — try again, or reload the app.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={this.handleRetry}
            className="inline-flex items-center min-h-[48px] px-6 py-2.5 rounded-lg bg-signal text-white font-semibold text-sm hover:brightness-110 transition-all"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center min-h-[48px] px-6 py-2.5 rounded-lg border border-white/20 text-white/70 font-semibold text-sm hover:border-signal/40 hover:text-white transition-all"
          >
            Reload App
          </button>
        </div>
      </div>
    );
  }
}
