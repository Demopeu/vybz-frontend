'use client';

import Image from 'next/image';
import { useState, useRef, useCallback } from 'react';
import { Camera } from '@repo/ui/components/icons';

export default function AvatarUploader({ src }: { src: string }) {
  const [previewSrc, setPreviewSrc] = useState<string>(src);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewSrc(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  return (
    <section className="relative text-center pt-30">
      <label
        htmlFor="avatar-upload"
        className="cursor-pointer inline-block relative"
      >
        <Image
          src={previewSrc}
          alt="Profile Image"
          className="w-32 h-32 rounded-full object-cover border border-gray-600"
          width={128}
          height={128}
        />
        <div className="absolute bottom-0 right-0 bg-white/20 p-2 rounded-full">
          <Camera width={20} height={20} />
        </div>
      </label>
      <input
        ref={fileInputRef}
        id="avatar-upload"
        name="avatar"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </section>
  );
}
