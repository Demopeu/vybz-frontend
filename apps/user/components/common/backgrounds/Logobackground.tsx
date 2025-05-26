import Image from 'next/image';

export default function Logobackground() {
  return (
    <>
      <Image
        src="/background/logopage2.jpg"
        alt="Background"
        fill
        className="object-cover z-11 scale-y-[-1] object-[15%_center] opacity-75 mix-blend-screen brightness-30"
      />
      <Image
        src="/background/logopage1.jpg"
        alt="Background"
        fill
        className="object-cover z-0 opacity-50 mix-blend-lighten brightness-80"
      />
    </>
  );
}
