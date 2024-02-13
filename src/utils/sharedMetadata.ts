export const baseUrl = process.env.NEXT_PUBLIC_APP_URL
	? new URL(process.env.NEXT_PUBLIC_APP_URL)
	: undefined;

export const image = "/app-image.png";

export const openGraph = {
	url: baseUrl,
	siteName: "Quizipy",
	images: {
		url: image,
		width: 1280,
		height: 630
	},
	type: "website",
	locale: "en-US"
};

export const twitter = {
	card: "summary_large_image",
	images: [image]
};
