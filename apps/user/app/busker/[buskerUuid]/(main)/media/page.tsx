import { Suspense } from 'react';
import { getBuskerReels } from '@/services/reel-services/reel-services';
import ReelViewAllSection from '@/components/reelViewAll/ReelViewAllSection';
import { Metadata } from 'next';
import { ReelItem } from '@/services/reel-services/reel-services';

interface PageProps {
  params: Promise<{ buskerUuid: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata: Metadata = {
  title: 'Media | VYBZ',
  description: 'View all media content from this busker',
};

export default async function MediaPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { buskerUuid } = resolvedParams;
  let initialReels: ReelItem[] = [];
  try {
    const response = await getBuskerReels({
      writerUuid: buskerUuid,
      size: 9,
    });
    initialReels = response.content;
  } catch (error) {
    console.error('Error fetching initial reels:', error);
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-white">Media</h1>

      <Suspense
        fallback={
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        }
      >
        <ReelViewAllSection
          writerUuid={buskerUuid}
          initialReels={initialReels}
        />
      </Suspense>
    </main>
  );
}
