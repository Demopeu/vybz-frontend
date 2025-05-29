import Image from 'next/image';

export default function Logobackground() {
  return (
    <div className="fixed inset-0">
      <Image
        src="/background/logopage2.jpg"
        alt="Background"
        fill
        className="h-full object-cover z-10 scale-y-[-1] object-[15%_center] opacity-75 mix-blend-screen brightness-30"
      />

      <Image
        src="/background/logopage1.jpg"
        alt="Background"
        fill
        className="h-full object-cover z-0 opacity-50 mix-blend-lighten brightness-80"
      />
    </div>
  );
}
