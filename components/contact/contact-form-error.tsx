'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ContactFormErrorProps {
  error: string;
  details?: string;
  onRetry?: () => void;
  onDismiss?: () => void;
}

export function ContactFormError({ 
  error, 
  details, 
  onRetry, 
  onDismiss 
}: ContactFormErrorProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (error) {
      setVisible(true);
    }
  }, [error]);

  const handleDismiss = () => {
    setVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  if (!visible || !error) return null;

  return (
    <Alert variant="destructive" className="mb-6 animate-in fade-in duration-300">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle className="font-medium">{error}</AlertTitle>
      {details && (
        <AlertDescription className="mt-2">
          {details}
        </AlertDescription>
      )}
      <div className="mt-4 flex space-x-2">
        {onRetry && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRetry}
            className="border-red-300 hover:bg-red-50 hover:text-red-600"
          >
            Try Again
          </Button>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleDismiss}
          className="text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          <X className="h-4 w-4 mr-1" />
          Dismiss
        </Button>
      </div>
    </Alert>
  );
}