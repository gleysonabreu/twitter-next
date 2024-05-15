'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 w-full flex-col items-center justify-center gap-3 text-center">
      <h1 className="text-4xl font-bold">Whoops, something happened...</h1>
      <p className="text-muted-foreground">
        An error occurred in the application, below you will find more details:
      </p>
      <pre>{error?.message || JSON.stringify(error)}</pre>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
