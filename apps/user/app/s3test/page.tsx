'use client';

import { useState } from 'react';
import { useS3Uploader, S3UploadMeta } from '@/hooks/useS3Uploader';
import { FileInput } from '@/components/fileInput/FileInput';

export default function S3TestPage() {
  const { uploadFile, uploading, error } = useS3Uploader();
  const [fileData, setFileData] = useState<{
    file: File;
    type: string;
    userId: string;
    originalName: string;
    fileType: string;
  } | null>(null);

  const userId = '12345'; // 아이디 없어서 그냥 박음
  const type = 'reels'; 

  const handleFileReady = (data: any) => {
    setFileData(data);
  };

  const handleUpload = async () => {
    if (!fileData) {
      alert('파일을 먼저 선택하세요.');
      return;
    }
    const meta: S3UploadMeta = {
      type: fileData.type,
      userId: fileData.userId,
      originalName: fileData.originalName,
      fileType: fileData.fileType,
    };
    const result = await uploadFile(fileData.file, meta);
    if (result?.url) {
      alert('업로드 완료!');
    }
  };

  return (
    <div style={{ background: 'white', color: 'black', padding: 32 }}>
      <FileInput userId={userId} type={type} onFileReady={handleFileReady} />
      <button
        type="button"
        onClick={handleUpload}
        disabled={!fileData || uploading}
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
