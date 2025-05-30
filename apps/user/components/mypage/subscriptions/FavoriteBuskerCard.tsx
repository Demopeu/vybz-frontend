import Image from 'next/image';

type FavoriteBuskerCardProps = {
  name: string;
  months: number;
  buskerUrl: string;
  nextRenewalDate: string;
};

export default function FavoriteBuskerCard({
  name,
  months,
  buskerUrl,
  nextRenewalDate,
}: FavoriteBuskerCardProps) {
  return (
    <section className="mt-88 mx-4 p-4 bg-blue-400 rounded-xl flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-3">
        <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200">
          <Image
            src={buskerUrl}
            alt={`${name}'s profile`}
            width={56}
            height={56}
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-white font-semibold text-base">{name}</p>
          <p className="text-white text-sm">
            다음 구독 갱신일: {nextRenewalDate}
          </p>
        </div>
      </div>

      <div className="bg-yellow-400 text-black font-bold px-3 py-2 rounded-md text-sm shadow-inner whitespace-nowrap">
        {months}개월 동안 찐팬으로 응원중
      </div>
    </section>
  );
}

{
  /* <section className="px-4 py-6">
<h2 className="text-2xl font-bold mb-4">구독중인 Busker</h2>
{subscriptions.map((sub, idx) => (
  <div
    key={idx}
    className="flex items-center justify-between bg-div-background rounded-xl px-4 py-3 shadow-md my-4"
  >
    <div className="w-12 h-12 rounded-full overflow-hidden">
      <Image
        src={sub.avatarUrl}
        alt={sub.name}
        width={48}
        height={48}
        className="object-cover"
      />
    </div>
    <div>
      <p className="font-semibold leading-tight">{sub.name}</p>
      <p className="text-gray-300 text-sm">{sub.months}개월 구독중</p>
      <p className="text-gray-400 text-xs mt-1">
        가입일: {sub.subscribedSince}
      </p>
    </div>

    <Button className="text-blue-400 text-sm font-medium border border-blue-400 px-3 py-1 rounded-md hover:bg-blue-400 hover:text-white transition">
      구독 관리하기
    </Button>
  </div>
))}
</section> */
}
