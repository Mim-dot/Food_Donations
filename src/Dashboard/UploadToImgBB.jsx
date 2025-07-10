import axios from "axios";
import Swal from "sweetalert2";

const UploadToImgBB = async (imageFile) => {
  const imgbbKey = import.meta.env.VITE_image_key;
  if (!imgbbKey) {
    Swal.fire({
      icon: "error",
      title: "Missing API Key",
      text: "ImgBB key is not set in your .env file.",
    });
    return null;
  }

  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
      formData
    );

    const imageUrl = res.data?.data?.url;
    if (!imageUrl) {
      throw new Error("Image URL not returned");
    }

    return imageUrl;
  } catch (error) {
    console.error("ImgBB Upload Error:", error);
    Swal.fire({
      icon: "error",
      title: "Upload Failed",
      text: "Could not upload the image. Try again later.",
    });
    return null;
  }
};

export default UploadToImgBB;
