import { RealsUrlDataType } from '@/types/ResponseDataTypes';

export async function getReelsVideos(page: number, size: number): Promise<RealsUrlDataType[]> {
  try {
    const response = await fetch(`${process.env.BASE_API_URL}/videos?page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // CSR이므로 캐싱 방지
    });

    if (!response.ok) {
      const safeStatusText = (response.statusText || "").replace(/[\r\n]/g, "");
      console.error('Failed to fetch reels videos:', safeStatusText);
      return [];
    }

    const data = await response.json();
    return Array.isArray(data.videos) ? data.videos : [];
  } catch (error) {
    console.error('Error fetching reels videos:', error);
    return [];
  }
}
