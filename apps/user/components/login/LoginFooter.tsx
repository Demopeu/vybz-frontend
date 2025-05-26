import Image from 'next/image';
import { Button } from '@repo/ui/components/ui/button';

export default function LoginFooter() {
  return (
    <footer className="w-full fixed bottom-0 left-0">
      <section className="flex justify-center space-x-2 pb-6">
        <p>Are you a busker?</p>
        <p>
          <strong>Busker login</strong>
        </p>
      </section>
      <section className="w-full space-y-2 px-6">
        <Button
          variant="outline"
          className="w-full bg-white text-gray-800 border border-gray-300 h-14 flex items-center justify-center gap-2"
        >
          <Image src="/logo/google.png" alt="Google" width={20} height={20} />
          <p className="text-xl font-semibold">구글 로그인</p>
        </Button>
        <Button
          variant="outline"
          className="w-full bg-[#FEE500] text-black border-none flex items-center h-14 justify-center gap-2"
        >
          <Image src="/logo/kakao.png" alt="Kakao" width={20} height={20} />
          <p className="text-xl font-semibold">카카오 로그인</p>
        </Button>
      </section>
      <Image
        src="/logo/logo.png"
        alt="Logo"
        width={272}
        height={153}
        priority
        className="py-7 px-24 mx-auto"
      />
    </footer>
  );
}
