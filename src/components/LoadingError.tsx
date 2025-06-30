"use client";

import type React from "react";

import { AlertCircle, Loader2, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface LoadingErrorProps {
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  children?: React.ReactNode;
}

export function LoadingError({
  loading,
  error,
  onRetry,
  children,
}: LoadingErrorProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Carregando eventos...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>{error}</span>
          {onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="ml-2"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Tentar novamente
            </Button>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  return <>{children}</>;
}
