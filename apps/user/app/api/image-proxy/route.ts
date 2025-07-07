import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // URL에서 이미지 URL 파라미터 가져오기
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');

    // URL 파라미터가 없거나 유효하지 않은 경우 에러 응답
    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    // URL이 k.kakaocdn.net에서만 오는지 확인 (보안상 중요)
    const urlObj = new URL(imageUrl);
    if (urlObj.hostname !== 'k.kakaocdn.net') {
      return NextResponse.json(
        { error: 'Only k.kakaocdn.net URLs are allowed' },
        { status: 403 }
      );
    }

    // 이미지 가져오기
    const imageResponse = await fetch(imageUrl);
    
    if (!imageResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch image' },
        { status: imageResponse.status }
      );
    }

    // 이미지 데이터와 헤더 가져오기
    const imageData = await imageResponse.arrayBuffer();
    const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';

    // 이미지 데이터 반환
    return new NextResponse(imageData, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400', // 24시간 캐싱
      },
    });
  } catch (error) {
    console.error('Image proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    );
  }
}
