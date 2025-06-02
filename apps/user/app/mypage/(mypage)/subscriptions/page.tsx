import ImageBackground from '@/components/common/backgrounds/ImageBackground';
import FavoriteBuskerCard from '@/components/mypage/subscriptions/FavoriteBuskerCard';
import SubscriptionSection from '@/components/mypage/subscriptions/SubscriptionSection';
import ExpiredSubscriptionSection from '@/components/mypage/subscriptions/ExpiredSubscriptionSection';

import { ProfileData } from '@/data/profileData';
import { subscriptionData } from '@/data/MypageData';

export default function page() {
  return (
    <main className="text-white font-poppins">
      <ImageBackground src={ProfileData.profileImage} />
      <FavoriteBuskerCard
        name={ProfileData.nickname}
        months={6}
        registrationDate="2025-06-01"
      />
      <SubscriptionSection subscriptions={subscriptionData} />
      <ExpiredSubscriptionSection subscriptions={subscriptionData} />
    </main>
  );
}
