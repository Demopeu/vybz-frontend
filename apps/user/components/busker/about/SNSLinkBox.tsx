import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";

interface SNSLinks {
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  soundcloud?: string;
}

interface SNSLinkBoxProps {
  links?: SNSLinks;
}

export function SNSLinkBox({ links = {} }: SNSLinkBoxProps) {
  const {
    instagram,
    youtube,
    tiktok,
    soundcloud
  } = links;

  return (
    <div>
      <h3 className="text-blue-300 font-semibold mb-3 text-lg">
        SNS
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {instagram && (
          <Link href={instagram} target="_blank" rel="noopener noreferrer" passHref>
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            >
              Instagram
            </Button>
          </Link>
        )}
        {youtube && (
          <Link href={youtube} target="_blank" rel="noopener noreferrer" passHref>
            <Button
              size="sm"
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              YouTube
            </Button>
          </Link>
        )}
        {tiktok && (
          <Link href={tiktok} target="_blank" rel="noopener noreferrer" passHref>
            <Button
              size="sm"
              className="w-full bg-gray-700 hover:bg-gray-600 text-white"
            >
              TikTok
            </Button>
          </Link>
        )}
        {soundcloud && (
          <Link href={soundcloud} target="_blank" rel="noopener noreferrer" passHref>
            <Button
              size="sm"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            >
              SoundCloud
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
