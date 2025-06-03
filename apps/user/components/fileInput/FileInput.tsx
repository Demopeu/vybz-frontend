import { ChangeEvent } from 'react';

interface FileInputProps {
  userId: string;
  type: string; 
  onFileReady: (fileData: {
    file: File;
    type: string;
    userId: string;
    originalName: string;
    fileType: string;
  }) => void;
}

export function FileInput({ userId, type, onFileReady }: FileInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileReady({
        file,
        type,
        userId,
        originalName: file.name,
        fileType: file.type,
      });
    }
  };
  return <input type="file" onChange={handleChange} />;
}
