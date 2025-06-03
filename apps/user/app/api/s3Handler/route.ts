import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { fileName, fileType, fileContent } = await req.json();
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: fileName,
      Body: Buffer.from(fileContent, 'base64'),
      ContentType: fileType,
    };
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    return NextResponse.json({ imageUrl });
  } catch (error) {
    return NextResponse.json(
      { error: 'S3 업로드 실패', detail: (error as Error).message },
      { status: 500 }
    );
  }
}
