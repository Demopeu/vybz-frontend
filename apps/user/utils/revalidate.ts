'use server';

import { revalidateTag } from 'next/cache';

/**
 * Next.js의 서버 캐시 태그를 재검증합니다.
 */
export const revalidateCache = (tag: string): boolean => {
  try {
    revalidateTag(tag);
    return true;
  } catch (error) {
    console.error('Error revalidating tag:', error);
    return false;
  }
};
