import BackHeader from '@/components/common/layouts/header/BackHeader';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getUserInfo } from '@/services/user-services';

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  const image = await getUserInfo(session?.user?.userUuid || '');
  return (
    <>
      <BackHeader
        title=""
        className="!bg-background"
        image={image?.profileImageUrl || ''}
      />
      {children}
    </>
  );
}
