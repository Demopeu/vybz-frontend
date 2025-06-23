'use client';

import InputBox from '@/components/common/InputBox';
import { FormContext } from '@/context/FormContext';
import { use } from 'react';

export default function NameBox() {
  const { artistName, setArtistName } = use(FormContext);
  return (
    <InputBox
      id="artistName"
      label="아티스트명"
      placeholder="아티스트명"
      defaultValue={artistName}
      className="h-12"
      onChange={(e) => setArtistName?.(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
    />
  );
}
