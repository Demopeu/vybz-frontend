import Image from 'next/image';

export default function page() {
  return (
    <main>
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/background/intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <section>
        <p>이제는 유명가수, 버스킹까지 완벽한 이무진</p>
        <p>조회수 886,215회 2021.7.1.</p>
        <p>이제는 유명 가수, 버스킹까지 완벽한 이무진(Lee Mujin)</p>
        <p>#오픈마이크</p>
        <p>#비긴어게인</p>
        <p>#싱어게인</p>
        <p>#이무진</p>
        <p>이무진 공식 VYBZ 구독하기</p>
      </section>
      <div>LIVE</div>
      <p>Are you a busker?</p>
      <p>버스커 로그인으로 이동</p>
      <Image
        src="/logo.png"
        alt="Logo"
        width={272}
        height={153}
        priority
        className="pt-40 mx-auto"
      />
    </main>
  );
}
