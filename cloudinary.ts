import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;

/**
 * Upload an image buffer or path to Cloudinary.
 * Use for speaker photos / sponsor logos only (no AI generation).
 */
export async function uploadImage(
  file: string | Buffer,
  folder: string = "youth-inspiration-summit",
  publicId?: string
) {
  const result = await cloudinary.uploader.upload(
    typeof file === "string" ? file : `data:image/jpeg;base64,${file.toString("base64")}`,
    {
      folder,
      public_id: publicId,
      overwrite: true,
      resource_type: "image",
    }
  );
  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}

export async function deleteImage(publicId: string) {
  return cloudinary.uploader.destroy(publicId);
}
