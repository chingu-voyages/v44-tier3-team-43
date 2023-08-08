import ImageKit from "imagekit";

const imagekit = new ImageKit({
	publicKey: process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_API_KEY || "",
	privateKey: process.env.IMAGE_KIT_PRIVATE_KEY || "",
	urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT || "",
});

export default imagekit;