import LiveCard from '@/components/liveViewAll/LiveCard';

export default function Page() {
  const lives = Array.from({ length: 20 }, (_, i) => ({
    id: `live-${i + 1}`,
    nickname: `공연자 ${i + 1}`,
    imageUrl: '/sample.jpg',
    likes: 17,
  }));

  return (
    <div>
      page
      <ul className="grid grid-cols-3 gap-2 ">
        {lives.map((live) => (
          <li key={live.id} className="w-30  ">
            <LiveCard {...live} />
          </li>
        ))}
      </ul>
    </div>
  );
}
