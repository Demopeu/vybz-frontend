import Image from 'next/image';

// 기본 이미지 경로 설정
const DEFAULT_IMAGE = '/feed.jpg'; // 프로젝트에 있는 기본 이미지 경로로 변경해주세요

export default function FeedImageGrid({ images }: { images: string[] }) {
  // 빈 문자열 체크 및 기본 이미지로 대체하는 함수
  const getValidImageSrc = (src: string | undefined): string => {
    if (!src || src.trim() === '') {
      return DEFAULT_IMAGE;
    }
    return src;
  };

  return (
    <div className="w-full">
      {images.length === 1 && (
        <div className="relative w-full aspect-square">
          <Image
            src={getValidImageSrc(images[0])}
            alt="feed"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      {images.length === 2 && (
        <div className="grid grid-cols-2 gap-1">
          {images.map((src, i) => (
            <div key={`${i}+${src}`} className="relative aspect-square">
              <Image
                src={getValidImageSrc(src)}
                alt={`feed-${i}`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      )}

      {images.length === 3 && (
        <div className="grid grid-cols-3 gap-1">
          <div className="relative col-span-2 row-span-2">
            <Image
              src={getValidImageSrc(images[0])}
              alt="feed-0"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-rows-2 gap-1">
            {images.slice(1).map((src, i) => (
              <div key={`${i}+${src}`} className="relative aspect-square">
                <Image
                  src={getValidImageSrc(src)}
                  alt={`feed-${i + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {images.length >= 4 && (
        <div className="grid grid-cols-2 grid-rows-2 gap-1">
          {images.slice(0, 4).map((src, i) => (
            <div key={`${i}+${src}`} className="relative aspect-square">
              <Image
                src={getValidImageSrc(src)}
                alt={`feed-${i}`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
