import AvatarUploader from '@/components/common/form/AvatarUploader';
import NicknameUploder from '@/components/common/form/NicknameUploder';
import TextareaUploader from '@/components/common/form/TextareaUploader';
import { Button } from '@repo/ui/components/ui/button';
import { ProfileData } from '@/data/profileData';

export default function Page() {
  return (
    <main className="min-h-screen text-end px-7 pt-10 text-white font-poppins">
      <AvatarUploader src={ProfileData.profileImage} />
      <NicknameUploder defaultValue={ProfileData.nickname} className="mt-6" />
      <TextareaUploader
        defaultValue={ProfileData.introduction}
        className="mt-12"
      />

      <Button className="mt-2 p-0 bg-transparent border-0">
        <u className="text-white/50">logout</u>
      </Button>

      <Button className="absolute bottom-0 left-1/2 -translate-x-1/2 p-0 bg-transparent border-0">
        <u className="text-white/50">delete account</u>
      </Button>
    </main>
  );
}
