import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

let streamUpload = (buffer) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
            {
                resource_type: "auto"
            },
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );

        streamifier.createReadStream(buffer).pipe(stream);
    });
};

export const uploadToCloudinary = async (buffer: any) => {
    let result = await streamUpload(buffer) || "";
    return result["url"];
}