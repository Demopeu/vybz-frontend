import LoginArticle from '@/components/login/LoginArticle';
import LoginBackground from '@/components/login/LoginBackground';
import LoginFooter from '@/components/login/LoginFooter';
import { loginArticleData } from '@/data/loginData';
import LiveBadge from '@/components/common/badge/LiveBadge';

export default function page() {
  return (
    <main className=" text-white font-poppins">
      <LoginBackground />
      <LoginArticle data={loginArticleData} />
      <LiveBadge />
      <LoginFooter />
    </main>
  );
}
