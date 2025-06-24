import InputBox from '@/components/common/InputBox';
import { BuskerSNSResponseType } from '@/types/ResponseDataTypes';

interface SNSBoxProps {
  SNSData: BuskerSNSResponseType[];
}

export default function SNSBox({ SNSData }: SNSBoxProps) {
  const getSNSUrl = (snsType: string) => {
    const snsItem = SNSData.find(
      (item) =>
        item.snsUrl && item.snsUrl.toLowerCase().includes(snsType.toLowerCase())
    );
    return snsItem?.snsUrl || '';
  };

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
          defaultValue={getSNSUrl('instagram')}
        />
        <InputBox
          id="youtube"
          label="YouTube"
          placeholder="https://youtube.com/channel/username"
          defaultValue={getSNSUrl('youtube')}
        />
        <InputBox
          id="tiktok"
          label="TikTok"
          placeholder="https://tiktok.com/@username"
          defaultValue={getSNSUrl('tiktok')}
        />
        <InputBox
          id="soundcloud"
          label="SoundCloud"
          placeholder="https://soundcloud.com/username"
          defaultValue={getSNSUrl('soundcloud')}
        />
      </div>
    </section>
  );
}
