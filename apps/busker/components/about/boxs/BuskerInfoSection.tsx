import { Badge } from '@repo/ui/components/ui/badge';

export function BuskerInfoSection() {
  return (
    <>
      {/* 소개 섹션 */}
      <div>
        <h3 className="text-blue-300 font-semibold mb-3 text-lg">소개</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          안녕하세요! 홍대에서 활동하는 버스커입니다. 어쿠스틱 기타와 함께
          따뜻한 음악을 들려드립니다.
        </p>
      </div>

      {/* 장르 태그 */}
      <div>
        <h3 className="text-blue-300 font-semibold mb-3 text-lg">장르</h3>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-blue-600 text-white">Acoustic</Badge>
          <Badge className="bg-purple-600 text-white">Folk</Badge>
          <Badge className="bg-pink-600 text-white">Indie</Badge>
        </div>
      </div>

      {/* 다음 공연 */}
      <div>
        <h3 className="text-blue-300 font-semibold mb-3 text-lg">다음 공연</h3>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-300 rounded-lg flex items-center justify-center">
              <span className="text-gray-900 text-xl font-bold">BK</span>
            </div>
            <div>
              <div className="text-white font-medium">홍대 거리공연</div>
              <div className="text-gray-400 text-sm">1월 15일 19:00</div>
              <div className="text-gray-400 text-sm">홍대입구역 9번출구</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
