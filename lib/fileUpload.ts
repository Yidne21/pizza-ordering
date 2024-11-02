"use server";

import cloudinary from "./cloudinary.ts";
import streamifier from "streamifier";

export async function imageUploader(file: File, folderName: string) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folderName,
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        }
      );

      const bufferStream = streamifier.createReadStream(buffer);
      bufferStream.pipe(uploadStream);
    });

    const uploadResult = (await result) as { secure_url: string };
    return uploadResult.secure_url;
  } catch {
    throw new Error("Image upload failed");
  }
}
