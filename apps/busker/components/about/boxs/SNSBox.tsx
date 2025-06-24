import InputBox from '@/components/common/InputBox';

export default function SNSBox({
  initialInstagram,
  initialYoutube,
  initialTiktok,
  initialSoundcloud,
}: {
  initialInstagram?: string;
  initialYoutube?: string;
  initialTiktok?: string;
  initialSoundcloud?: string;
}) {
  return (
    <section className="space-y-4">
      <h3 className="block text-blue-300 text-lg font-semibold mb-2">
        SNS 링크
      </h3>
      <div className="grid grid-cols-1 gap-4">
        <InputBox
          id="instagram"
          label="Instagram"
          placeholder="https://instagram.com/username"
          defaultValue={initialInstagram ? initialInstagram : ''}
        />
        <InputBox
          id="youtube"
          label="YouTube"
          placeholder="https://youtube.com/channel/username"
          defaultValue={initialYoutube ? initialYoutube : ''}
        />
        <InputBox
          id="tiktok"
          label="TikTok"
          placeholder="https://tiktok.com/@username"
          defaultValue={initialTiktok ? initialTiktok : ''}
        />
        <InputBox
          id="soundcloud"
          label="SoundCloud"
          placeholder="https://soundcloud.com/username"
          defaultValue={initialSoundcloud ? initialSoundcloud : ''}
        />
      </div>
    </section>
  );
}
