import VticketInstructions from '@/components/donations/VticketInstructions';
import TabButtonBox from '@/components/common/button/TabButtonBox';
import DonationsClient from '@/components/donations/DoationsClient';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

export default async function page() {
  const session = await getServerSession(options);
  const userUuid = session?.user?.userUuid || '';

  return (
    <main className="text-white mt-16 mx-6 space-y-4 mb-4">
      <VticketInstructions />
      <TabButtonBox labels={['사용 내역', '구매 내역']} />
      <DonationsClient userUuid={userUuid} />
    </main>
  );
}
