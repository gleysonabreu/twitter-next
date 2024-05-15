'use client';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function BackButton() {
  const router = useRouter();

  return (
    <button className="min-h-9" onClick={() => router.back()}>
      <ArrowLeft />
    </button>
  );
}
