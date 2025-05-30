import Image from 'next/image';

type ImageBackgroundProps = {
  src: string;
  alt?: string;
};

export default function ImageBackground({
  src,
  alt = 'Background',
}: ImageBackgroundProps) {
  return (
    <div className="fixed inset-0 -z-10">
      <Image
        src={src}
        alt={alt}
        fill
        className="h-full object-cover brightness-100"
        priority
      />
      <div className="absolute top-0 left-0 right-0 h-26 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/90" />
    </div>
  );
}
