'use client';

// import PhotoCard from '@/features/photo/photo-card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/ui/dialog';
import { useRouter } from 'next/navigation';

interface PhotoModalPageProps {
  id: string;
}

export function PhotoModalPage({ id }: PhotoModalPageProps) {
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const isModal = searchParams?.get('modal') === 'true';

  return (
    <Dialog open={true} onOpenChange={(open) => !open && router.back()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Photo Detail</DialogTitle>
          <DialogDescription>View photo details</DialogDescription>
        </DialogHeader>
        {/* <PhotoCard id={id} /> */}
        <p>Photo Card Component Missing (ID: {id})</p>
      </DialogContent>
    </Dialog>
  );
}
