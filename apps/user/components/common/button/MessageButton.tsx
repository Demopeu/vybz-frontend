'use client';
import { Button } from '@repo/ui/components/ui/button';

interface MessageButtonProps {
  buskerUuid: string;
  userUuid: string;
  createChatRoom: (buskerUuid: string, userUuid: string) => Promise<boolean>;
  className?: string;
  children?: React.ReactNode;
}

export const MessageButton = ({
  buskerUuid,
  userUuid,
  createChatRoom,
  className = '',
  children = '메세지 보내기',
}: MessageButtonProps) => {
  return (
    <Button
      className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-full ${className}`}
      onClick={async () => await createChatRoom(buskerUuid, userUuid)}
    >
      {children}
    </Button>
  );
};
