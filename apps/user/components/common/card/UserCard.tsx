import Image from 'next/image';

export default function UserCard({
  name,
  image,
}: {
  name: string;
  image: string;
}) {
  return (
    <div className="flex items-start space-x-2">
      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
        <Image
          src={image}
          alt={name}
          width={48}
          height={48}
          className="object-cover"
        />
      </div>
      <h3 className="ml-2 text-lg font-semibold">{name}</h3>
    </div>
  );
}
