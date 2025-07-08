import { Button } from '@repo/ui/components/ui/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import { MoreHorizontal } from '@repo/ui/components/icons';

interface DetailHeaderProps {
  username?: string;
  location?: string;
  avatarUrl?: string;
  onMenuClick?: () => void;
}

export default function DetailHeader({
  username,
  location,
  avatarUrl,
  onMenuClick,
}: DetailHeaderProps) {
  const getInitials = (name: string) => {
    return name
      .split('_')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={avatarUrl} alt={username} />
          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            {getInitials(username || '')}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold text-sm">{username || ''}</div>
          {location && <div className="text-gray-400 text-xs">{location}</div>}
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:bg-gray-800"
        onClick={onMenuClick}
      >
        <MoreHorizontal className="h-5 w-5" />
      </Button>
    </div>
  );
}
