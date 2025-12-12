// import PhotoCard from '@/features/photo/photo-card';
interface PhotoDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function PhotoDetailPage({ params }: PhotoDetailPageProps) {
  const { id } = await params;
  return (
    <div className="container flex justify-center py-8">
      {/* <PhotoCard id={id} /> */}
      <p>Photo Card Component Missing (ID: {id})</p>
    </div>
  );
}
