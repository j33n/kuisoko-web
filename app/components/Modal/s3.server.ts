import { unstable_parseMultipartFormData } from "@remix-run/node";
import S3 from "aws-sdk/clients/s3";
import cuid from "cuid";

import type { UploadHandler } from "@remix-run/node";

const s3 = new S3({
  region: process.env.KUISOKO_BUCKET_REGION,
  accessKeyId: process.env.KUISOKO_ACCESS_KEY_ID,
  secretAccessKey: process.env.KUISOKO_SECRET_ACCESS_KEY,
});

export interface IUploadHandler extends UploadHandler {
  filename: string;
  stream: NodeJS.ReadableStream;
}

export const uploadHandler = async ({
  name,
  filename,
  stream,
}: any) => {
  if (name !== "storeIcon") {
    stream.resume();
    return;
  }

  const { Location } = await s3
    .upload({
      Bucket: process.env.KUISOKO_BUCKET_NAME || "",
      Key: `${cuid()}.${filename.split(".").slice(-1)}`,
      Body: stream,
    })
    .promise();

  return Location;
};

export const uploadStoreIcon = async (request: Request) => {
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler,
  );

  const file = formData.get("storeIcon")?.toString() || "";

  return file
}
