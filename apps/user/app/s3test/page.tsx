'use client';
import { useState } from 'react';
import { useS3Uploader } from '@/hooks/useS3Uploader';

export default function S3TestPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { uploadFile, uploading, error } = useS3Uploader();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('파일을 먼저 선택하세요.');
      return;
    }
    const result = await uploadFile(selectedFile);
    if (result?.url) {
      alert('업로드 완료!');
    }
  };

  return (
    <div style={{ background: 'white', color: 'black', padding: 32 }}>
      <input type="file" onChange={handleFileChange} />
      <button
        type="button"
        onClick={handleUpload}
        disabled={!selectedFile || uploading}
        style={{
          marginLeft: 12,
          padding: '6px 18px',
          background: uploading ? 'gray' : 'blue',
          color: 'white',
          borderRadius: 6,
          border: 'none',
          cursor: uploading ? 'not-allowed' : 'pointer',
        }}
      >
        {uploading ? '업로드 중...' : '업로드'}
      </button>
      {error && <div style={{ color: 'red' }}>{error.message}</div>}
    </div>
  );
}
