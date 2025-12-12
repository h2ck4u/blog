'use client';

import PhotoCard from '@/features/photo/photo-card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/ui/dialog';
import { useRouter, useSearchParams } from 'next/navigation';

export function PhotoModalPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams?.get('id') ?? '';
  const handleOpenChange = (open: boolean) => {
    if (!open) router.back();
  };

  return (
    <Dialog defaultOpen onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Photo Card Dialog</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center p-8">
          <PhotoCard id={id} modal={true} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
