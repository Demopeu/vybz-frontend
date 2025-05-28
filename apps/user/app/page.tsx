import Image from 'next/image';
import Link from 'next/link';
import Logobackground from '@/components/common/backgrounds/Logobackground';

export default function page() {
  return (
    <main className="min-h-screen text-center text-xl text-white bg-black">
      <Link href="/login">
        <Logobackground />
      </Link>
      <section className="relative z-10">
        <Image
          src="/logo/logo.png"
          alt="Logo"
          width={272}
          height={153}
          priority
          className="pt-40 mx-auto brightness-200"
        />
        <p className="font-roboto pt-8 opacity-75">Feel the VYBZ.</p>
        <p className="font-roboto opacity-75">Share your moment.</p>
        <p className="font-monoton pt-72 text-4xl">VYBZ</p>
      </section>
      <footer className="z-10">
        <p className="pt-14 text-xs opacity-55">
          © 2025 VYBZ. All Rights RESERVED.
        </p>
      </footer>
    </main>
  );
}
