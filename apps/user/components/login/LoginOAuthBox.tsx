'use client';

import Image from 'next/image';
import { useCallback } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@repo/ui/components/ui/button';

export default function LoginOAuthBox() {
  const handleGoogleLogin = useCallback(() => {
    signIn('google');
  }, []);

  const handleKakaoLogin = useCallback(() => {
    signIn('kakao');
  }, []);

  return (
    <section className="w-full space-y-2 px-6">
      <Button
        variant="outline"
        className="w-full bg-white text-gray-800 border border-gray-300 h-14 flex items-center justify-center gap-2"
        onClick={handleGoogleLogin}
      >
        <Image src="/logo/google.png" alt="Google" width={20} height={20} />
        <p className="text-xl font-semibold">구글 로그인</p>
      </Button>
      <Button
        variant="outline"
        className="w-full bg-[#FEE500] text-black border-none flex items-center h-14 justify-center gap-2"
        onClick={handleKakaoLogin}
      >
        <Image src="/logo/kakao.png" alt="Kakao" width={20} height={20} />
        <p className="text-xl font-semibold">카카오 로그인</p>
      </Button>
    </section>
  );
}
