import Image from 'next/image';
import { SubscriptionType } from '@/types/ResponseDataTypes';

type SubscriptionSectionProps = {
  subscriptions: SubscriptionType[];
};

export default function ExpiredSubscriptionSection({
  subscriptions,
}: SubscriptionSectionProps) {
  return (
    <section className="px-4 py-6 pb-20">
      <h2 className="text-2xl font-bold mb-4">만료된 정기 구독</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {subscriptions.map((sub) => (
          <div
            key={sub.id}
            className="bg-[#2D2D4D] rounded-xl p-4 shadow-lg opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition duration-300"
          >
            <div className="flex items-center space-x-4">
              <Image
                src={sub.avatarUrl}
                alt={`${sub.name}'s profile`}
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-600"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-300">
                  {sub.name}
                </h3>
                <p className="text-sm text-gray-400">{sub.months}개월간 찐팬</p>
                <p className="text-sm text-gray-500">Subscription Ended</p>
              </div>
            </div>
            <button className="mt-4 w-full py-2 px-4 rounded-lg border-2 border-cyan-400 text-cyan-400 text-sm font-medium shadow-md hover:bg-cyan-400 hover:text-[#1A1A2E] hover:shadow-cyan-500 transition">
              <span className="material-icons text-base mr-1 align-middle"></span>
              구독 갱신하기
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
