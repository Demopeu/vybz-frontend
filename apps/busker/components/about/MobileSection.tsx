import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Badge,
  Button,
} from '@repo/ui/components/ui';
import { X, Phone } from '@repo/ui/components/icons';
import Image from 'next/image';
import { cn } from '@repo/ui/lib/utils';
export default function MobileSection({ className }: { className?: string }) {
  return (
    <Card className={cn('bg-div-background border-div-background', className)}>
      <CardHeader className="border-b border-gray-700">
        <CardTitle className="text-blue-400 text-xl flex items-center">
          <Phone className="w-5 h-5 mr-2" />
          모바일 미리보기
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 flex justify-center">
        <div className="w-80 bg-gray-900 rounded-3xl p-4 shadow-2xl border-4 border-gray-600">
          <div className="bg-gray-800 rounded-2xl h-full overflow-hidden relative">
            {/* 모바일 헤더 */}
            <div className="absolute top-0 left-0 right-0 z-20 bg-black/50 backdrop-blur-sm p-4 flex items-center">
              <button className="text-white mr-3">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <span className="text-white font-medium">프로필</span>
            </div>

            {/* 스크롤 가능한 컨테이너 */}
            <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-700">
              {/* 배경 이미지 섹션 */}
              <div className="relative h-96 bg-gradient-to-b from-blue-400 to-purple-500">
                <Image
                  src="/buskerUrl.jpg"
                  alt="Profile Background"
                  className="w-full h-full object-cover"
                  width={100}
                  height={100}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* 프로필 정보 오버레이 */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="w-16 h-16 ring-4 ring-white mr-4">
                      <AvatarImage src="/buskerUrl.jpg" />
                      <AvatarFallback className="bg-blue-300 text-gray-900 text-xl font-bold">
                        BK
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-white text-xl font-bold">
                        Street Musician
                      </h2>
                      <p className="text-blue-200 text-sm">나의 최애 Busker</p>
                    </div>
                  </div>

                  {/* 통계 */}
                  <div className="flex justify-between mb-4">
                    <div className="text-center">
                      <div className="text-white font-bold text-lg">1.2K</div>
                      <div className="text-blue-200 text-xs">팔로워</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-bold text-lg">856</div>
                      <div className="text-blue-200 text-xs">구독자</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-bold text-lg">89</div>
                      <div className="text-blue-200 text-xs">공연</div>
                    </div>
                  </div>

                  {/* 응원 배지 */}
                  <div className="flex items-center mb-4">
                    <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                      🔥 6개월째 전팬으로 응원 중
                    </div>
                  </div>

                  {/* 응원 메시지 버튼 */}
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-full">
                    응원 메시지 보내기
                  </Button>
                </div>
              </div>

              {/* 검은 배경 섹션 */}
              <div className="bg-black p-6 space-y-6">
                {/* 소개 섹션 */}
                <div>
                  <h3 className="text-blue-300 font-semibold mb-3 text-lg">
                    소개
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    안녕하세요! 홍대에서 활동하는 버스커입니다. 어쿠스틱 기타와
                    함께 따뜻한 음악을 들려드립니다.
                  </p>
                </div>

                {/* 장르 태그 */}
                <div>
                  <h3 className="text-blue-300 font-semibold mb-3 text-lg">
                    장르
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-600 text-white">Acoustic</Badge>
                    <Badge className="bg-purple-600 text-white">Folk</Badge>
                    <Badge className="bg-pink-600 text-white">Indie</Badge>
                  </div>
                </div>

                {/* 다음 공연 */}
                <div>
                  <h3 className="text-blue-300 font-semibold mb-3 text-lg">
                    다음 공연
                  </h3>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-300 rounded-lg flex items-center justify-center">
                        <X className="w-6 h-6 text-gray-900" />
                      </div>
                      <div>
                        <div className="text-white font-medium">
                          홍대 거리공연
                        </div>
                        <div className="text-gray-400 text-sm">
                          1월 15일 19:00
                        </div>
                        <div className="text-gray-400 text-sm">
                          홍대입구역 9번출구
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SNS 링크 */}
                <div>
                  <h3 className="text-blue-300 font-semibold mb-3 text-lg">
                    SNS
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    >
                      Instagram
                    </Button>
                    <Button
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      YouTube
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gray-700 hover:bg-gray-600 text-white"
                    >
                      TikTok
                    </Button>
                    <Button
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      SoundCloud
                    </Button>
                  </div>
                </div>

                {/* 최근 활동 */}
                <div>
                  <h3 className="text-blue-300 font-semibold mb-3 text-lg">
                    최근 활동
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-gray-800 rounded-lg p-3">
                      <div className="text-white text-sm font-medium">
                        새 영상 업로드
                      </div>
                      <div className="text-gray-400 text-xs">2시간 전</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3">
                      <div className="text-white text-sm font-medium">
                        홍대 공연 완료
                      </div>
                      <div className="text-gray-400 text-xs">1일 전</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
