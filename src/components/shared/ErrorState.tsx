import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState = ({ message = "Something went wrong", onRetry }: ErrorStateProps) => (
  <div className="flex flex-col items-center justify-center rounded-xl border border-destructive/20 bg-destructive/5 px-6 py-16 text-center">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
      <AlertCircle size={26} className="text-destructive" aria-hidden="true" />
    </div>
    <p className="text-base font-semibold text-foreground">{message}</p>
    <p className="mt-1 text-sm text-muted-foreground">Please try again or contact support.</p>
    {onRetry && (
      <Button onClick={onRetry} variant="outline" className="mt-5 h-11">
        Retry
      </Button>
    )}
  </div>
);

export default ErrorState;
