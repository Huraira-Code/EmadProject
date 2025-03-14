import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "dfyvwloys",
  api_key: "923835526253933",
  api_secret: "JeNHRhqCYIfpkgu9hVcjwgf3P4A",
});

// const uploadOnCloudinary = async (localFilePath) => {
//   try {
//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto",
//     });
//     return response.url;
//   } catch (error) {
//     fs.unlink(localFilePath);
//   }
// };

// export { uploadOnCloudinary };
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      throw new Error("File path is missing!");
    }

    // console.log("Uploading Image to Cloudinary:", localFilePath);

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    return { url: response.secure_url };
  } catch (error) {
    fs.unlink(localFilePath);
    // console.error("Cloudinary Upload Error:", error.message);

    return { url: null };
  }
};

export { uploadOnCloudinary };
