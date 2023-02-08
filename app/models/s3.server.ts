import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  region: process.env.KUISOKO_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.KUISOKO_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.KUISOKO_SECRET_ACCESS_KEY || "",
  },
});
