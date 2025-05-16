import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params : async (req,file) =>{
    return {
      public_id: `avatars/${Date.now()}-${file.originalname}`,
      folder : 'avatars',
      resource_type: "image", 
      format: "png",          
      transformation: [{ width: 300, height: 300, crop: "limit" }],
    };
  }
});


const upload = multer({ storage });

export default upload;
