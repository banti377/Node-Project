import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: "dgbre2ccb",
    api_key: "789455771666372",
    api_secret: "EHKuaHHYMrC4m7TwhTWKtp3ZMnI",
});

export const imageUpload = async (url) => {
    try {
        const data = await cloudinary.uploader.upload("/public/profile.jpg")
        console.log("🚀 ~ imageUpload ~ data:", data)
        return data.secure_url;

    } catch (error) {
        console.log("🚀 ~ imageUpload ~ error:", error)

    }
};