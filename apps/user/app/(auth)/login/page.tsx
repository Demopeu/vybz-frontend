import Image from 'next/image';
import {Button} from '@repo/ui/components/ui/button';

export default function page() {
  return (
    <main className=' text-white font-poppins'>
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 brightness-50"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/background/intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <article className='text-left px-6'>
        <h1 className='pt-22 text-3xl font-semibold tracking-[0.01em]'>이제는 유명가수,<br /> 버스킹까지 완벽한 이무진</h1>
        <section className='pt-6 text-sm'>
          <p>조회수 886,215회 2021.7.1.</p>
          <p>이제는 유명 가수, 버스킹까지 완벽한 이무진(Lee Mujin)</p>
        </section>
        <section className='pt-2 text-sm flex gap-2'>
          <p>#오픈마이크</p>
          <p>#비긴어게인</p>
          <p>#싱어게인</p>
          <p>#이무진</p>
        </section>
        <h3 className='pt-4 pb-12'>이무진 공식 VYBZ 구독하기 🎵</h3>
      </article>
      <span className='mx-6 px-2 py-1 bg-red-600'>LIVE</span>
      <footer className='w-full fixed bottom-0 left-0'>
      <section className='flex justify-center space-x-2 pb-6'>
        <p>Are you a busker?</p>
        <p> <strong>Busker login</strong></p>
      </section>
      <section className='w-full space-y-2 px-6'>
      <Button
          variant="outline"
          className="w-full bg-white text-gray-800 border border-gray-300 h-14 flex items-center justify-center gap-2"
        >
          <Image
            src="/logo/google.png"
            alt="Google"
            width={20}
            height={20}
          />
          <p className='text-xl font-semibold'>구글 로그인</p>
        </Button>
        <Button
          variant="outline"
          className="w-full bg-[#FEE500] text-black border-none flex items-center h-14 justify-center gap-2"
        >
          <Image
            src="/logo/kakao.png"
            alt="Kakao"
            width={20}
            height={20}
          />
          <p className='text-xl font-semibold'>카카오 로그인</p>
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
    </main>
  );
}
