import { Component, type ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-svh items-center justify-center bg-slate-100 p-6">
          <section
            role="alert"
            className="w-full max-w-md rounded-xl border border-red-200 bg-white p-6 text-center shadow-sm"
          >
            <p className="text-sm font-semibold text-red-700">
              The builder could not render this view.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Your saved layout is unchanged. Try rendering the builder again.
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              className="mt-5 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Try again
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
