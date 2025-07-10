import { LiveStreamResponse } from '@/types/ResponseDataTypes';
import { instance } from '@/utils/requestHandler';

export type LiveStreamItem = LiveStreamResponse['content'][0];

export async function getLiveStreams(
  size: number = 10,
  lastId?: string
): Promise<LiveStreamItem[]> {
  'use server';

  try {
    let url = `/live-service/api/v1/live/all?size=${size}`;
    if (lastId) {
      url += `&lastId=${lastId}`;
    }

    const response = await instance.get<LiveStreamResponse>(url);

    if (!response.isSuccess) {
      console.error('Failed to fetch live streams:', response.message);
      return [];
    }

    const result = response.result;

    if (!result || !result.content || result.content.length === 0) {
      return [];
    }

    // Return the content array directly
    return result.content;
  } catch (error) {
    console.error('Error fetching live streams:', error);
    return [];
  }
}
