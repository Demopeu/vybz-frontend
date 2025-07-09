'use server';

// 개발 환경에서 테스트할 때는 localhost, 프로덕션에서는 실제 서버 주소 사용
const BASE_URL = process.env.NEXT_PUBLIC_LIVE_API_URL || 'https://back.vybz.kr';
console.log('API BASE_URL:', BASE_URL);

export interface Live {
  streamKey: string;
  title: string;
  buskerUuid: string;
  thumbnailUrl: string | null;
  viewerCount: number;
  liveStreamStatus: string;
  startedAt: string;
  categoryId: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface LiveDetailResponse {
  live: Live;
}

export interface CategoryListResponse {
  result: Category[];
}

export async function getLiveDetail(
  streamKey: string, 
  userUuid: string, 
  accessToken: string
): Promise<LiveDetailResponse> {
  const url = `${BASE_URL}/live/enter/${streamKey}`;
  console.log('🔍 getLiveDetail API 호출:', {
    url,
    userUuid,
    headers: { 
      'X-User-Id': userUuid,
      'Authorization': `Bearer ${accessToken}`
    }
  });

  const res = await fetch(url, {
    headers: {
      'X-User-Id': userUuid,
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  
  console.log('📡 getLiveDetail 응답:', {
    status: res.status,
    statusText: res.statusText,
    ok: res.ok
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('❌ getLiveDetail 오류:', errorText);
    throw new Error(`Failed to fetch live detail: ${res.status} ${res.statusText}`);
  }
  
  return res.json();
}

export async function getCategoryList(
  accessToken: string, 
  userUuid?: string
): Promise<CategoryListResponse> {
  const url = `${BASE_URL}/live/category`;
  console.log('🔍 getCategoryList API 호출:', {
    url,
    tokenPreview: accessToken ? accessToken.substring(0, 20) + '...' : 'No token',
    userUuid
  });

  const headers: Record<string, string> = {
    'Authorization': `Bearer ${accessToken}`,
  };

  // userUuid가 제공되면 X-User-Id 헤더 추가
  if (userUuid) {
    headers['X-User-Id'] = userUuid;
  }

  const res = await fetch(url, {
    headers,
  });
  
  console.log('📡 getCategoryList 응답:', {
    status: res.status,
    statusText: res.statusText,
    ok: res.ok
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('❌ getCategoryList 오류:', errorText);
    throw new Error(`Failed to fetch category list: ${res.status} ${res.statusText}`);
  }
  
  return res.json();
}
