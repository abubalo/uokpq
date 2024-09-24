import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "@config/env"

export const getPaperPDF = async (fileName: string): Promise<string> => {
  const s3Client = new S3Client({
    region: env.REGION,
    endpoint: env.R2_ENDPOINT,
    credentials: {
      accessKeyId: env.ACCESS_KEY_ID,
      secretAccessKey: env.SECRET_ACCESS_KEY,
    },
  });

  const command = new GetObjectCommand({
    Bucket: env.R2_BUCKET_NAME,
    Key: fileName,
  });

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL valid for 1 hour
  return signedUrl;
};
