import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@repo/ui/components/ui/avatar';

export function BuskerProfileBox() {
  return (
    <div className="flex items-center mb-4">
      <Avatar className="w-16 h-16 ring-4 ring-white mr-4">
        <AvatarImage src="/buskerUrl.jpg" />
        <AvatarFallback className="bg-blue-300 text-gray-900 text-xl font-bold">
          BK
        </AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-white text-xl font-bold">Street Musician</h2>
        <p className="text-blue-200 text-sm">나의 최애 Busker</p>
      </div>
    </div>
  );
}
