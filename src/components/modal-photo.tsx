'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

type ModalPhotoProps = {
  children: ReactNode;
};

export function ModalPhoto({ children }: ModalPhotoProps) {
  const router = useRouter();
  const handleClose = () => router.back();

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="text-white sm:max-w-md shadow-none bg-transparent border-transparent">
        <div className="flex items-center space-x-2 justify-center">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
