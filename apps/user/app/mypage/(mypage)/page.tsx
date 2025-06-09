import UserProfile from '@/components/mypage/UserProfile';
import { Button } from '@repo/ui/components/ui/button';

export default function page() {
  return (
    <main>
      <UserProfile />
      <section className="mx-10 mt-10 bg-gradient-to-r from-purple-400 to-indigo-400 h-40 rounded-2xl overflow-visible flex items-center justify-between p-6 shadow-lg">
        <h2 className="text-white text-lg font-semibold mb-3">보유한 티켓</h2>
        <div className="flex items-center space-x-3">
          <div className="bg-orange-400 w-8 h-8 rounded-lg flex items-center justify-center"></div>
          <span className="text-white text-2xl font-bold">4,000장</span>
        </div>

        <Button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-all duration-200 flex items-center gap-2">
          충전하기
        </Button>
      </section>
    </main>
  );
}
