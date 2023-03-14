import cuid from "cuid";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { s3Client } from "./s3.server";

import type { UploadHandler } from "@remix-run/node";
import type { PutObjectCommandInput } from "@aws-sdk/client-s3";

const BUCKET_NAME = process.env.KUISOKO_BUCKET_NAME || "";

const uploadStreamToS3 = async (
  data: AsyncIterable<Uint8Array>,
  filename: string,
  contentType: string
) => {
  const key = `${cuid()}.${filename.split(".").slice(-1)}`;

  const params: PutObjectCommandInput = {
    Bucket: BUCKET_NAME,
    Key: key,
    Body: await convertToBuffer(data),
    ContentType: contentType,
  };

  s3Client.send(new PutObjectCommand(params), (err) => {
    if (err) {
      console.error("🥹 Error uploading file", err);
    }
  });

  return key;
};

export const getImageUrl = async (key: string) => {
  let url = await getSignedUrl(
    s3Client,
    new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    }),
    { expiresIn: 15 * 60 }
  );

  return url;
};

// The UploadHandler gives us an AsyncIterable<Uint8Array>, so we need to convert that to something the aws-sdk can use.
// Here, we are going to convert that to a buffer to be consumed by the aws-sdk.
async function convertToBuffer(a: AsyncIterable<Uint8Array>) {
  const result = [];
  for await (const chunk of a) {
    result.push(chunk);
  }
  return Buffer.concat(result);
}

export const s3UploaderHandler: UploadHandler = async ({
  filename,
  data,
  contentType,
}) => {
  if (filename && typeof filename === "string") {
    return await uploadStreamToS3(data, filename, contentType);
  }
};
