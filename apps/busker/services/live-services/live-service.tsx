'use server';

import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

export async function startLive(payload: {
  title: string;
  categoryId: number;
  membership?: boolean;
}): Promise<{
  id: string;
  streamKey: string;
  liveStreamStatus: string;
  categoryId: number;
  membership: boolean;
}> {
  const session = await getServerSession(options);
  const buskerUuid = session?.user?.buskerUuid;
  const accessToken = session?.user?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/live-service/api/v1/live/start`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Busker-Id': buskerUuid || '',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    }
  );
  if (!res.ok) throw new Error('Failed to start live');
  const data = await res.json();
  return data.result;
}

export async function stopLive(payload: { streamKey: string }): Promise<{
  streamKey: string;
  status: 'live' | 'scheduled';
}> {
  const session = await getServerSession(options);
  const buskerUuid = session?.user?.buskerUuid;
  const accessToken = session?.user?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/live-service/api/v1/live/end?streamKey=${payload.streamKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Busker-Id': buskerUuid || '',
        'Authorization': `Bearer ${accessToken}`,
      },
    }
  );
  if (!res.ok) throw new Error('Failed to stop live');
  return res.json();
}
