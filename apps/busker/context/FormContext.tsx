'use client';

import { createContext, useState } from 'react';
import { BuskerDataType } from '@/types/ResponseDataTypes';
import { FormContextType, Category } from '@/types/ConstextTypes';

export const FormContext = createContext<FormContextType>(
  {} as FormContextType
);

export function UseForm({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData: BuskerDataType;
}) {
  const [buskerProfileUrl, setBuskerProfileUrl] = useState(
    initialData.profileImage || ''
  );
  const [artistName, setArtistName] = useState(initialData.name || '');
  const [artistGenre, setArtistGenre] = useState<Category | ''>(
    initialData.genre || ''
  );
  const [artistDescription, setArtistDescription] = useState(
    initialData.description || ''
  );

  const value = {
    buskerProfileUrl,
    setBuskerProfileUrl,
    artistName,
    setArtistName,
    artistGenre,
    setArtistGenre,
    artistDescription,
    setArtistDescription,
  };

  return <FormContext value={value}>{children}</FormContext>;
}
