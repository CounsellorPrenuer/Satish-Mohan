import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                    <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8 border border-red-100">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
                        <p className="text-gray-600 mb-4">
                            We're sorry, but the application encountered an error. Please try refreshing the page.
                        </p>
                        <div className="bg-gray-100 rounded p-4 overflow-auto max-h-96 text-sm font-mono text-red-800">
                            <p className="font-bold mb-2">{this.state.error?.toString()}</p>
                            <pre className="whitespace-pre-wrap">{this.state.errorInfo?.componentStack}</pre>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
