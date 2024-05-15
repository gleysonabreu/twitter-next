'use client';
import { Check, CopyIcon } from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';

type CopyContentProps = {
  content: string;
};

export function CopyContent({ content }: CopyContentProps) {
  const [isCopied, setIsCopied] = useState(false);

  function handleCopyContent() {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
  }

  useEffect(() => {
    const timeCopied = setTimeout(() => setIsCopied(false), 5000);

    return () => clearTimeout(timeCopied);
  }, [isCopied]);

  return (
    <Button
      onClick={handleCopyContent}
      type="button"
      size="sm"
      className="px-3"
      disabled={isCopied}
    >
      <span className="sr-only">Copy</span>
      {isCopied ? (
        <Check className="h-4 w-4" />
      ) : (
        <CopyIcon className="h-4 w-4" />
      )}
    </Button>
  );
}
