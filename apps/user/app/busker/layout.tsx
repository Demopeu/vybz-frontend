import BackHeader from '@/components/common/layouts/header/BackHeader';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  const image = session?.user?.image;
  return (
    <>
      <BackHeader title="" className="!bg-background" image={image || ''} />
      {children}
    </>
  );
}
