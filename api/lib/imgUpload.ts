import B2 from "backblaze-b2";
import sharp from "sharp";

const blaze = new B2({
	applicationKeyId: process.env.BLAZE_KEY_ID, // or accountId: 'accountId'
	applicationKey: process.env.BLAZE_APP_KEY,
});

const clientUpload = async (filename: string, content: any) => {
	await blaze.authorize();

	const { data } = await blaze.getUploadUrl({
		bucketId: "46e95f04b7108a6b7a9f061e",
	});

	await blaze.uploadFile({
		uploadUrl: data.uploadUrl,
		uploadAuthToken: data.authorizationToken,
		fileName: filename,
		data: content,
	});
};

const imgUploader = async (
	images: string[],
	alias: string
): Promise<string[]> => {
	const items = [];

	for (const x of images) {
		const id = (Math.floor(Math.random() * (9999 - 1000)) + 1000).toString();

		const img = Buffer.from(
			x.replace(/^data:image\/\w+;base64,/, ""),
			"base64"
		);

		const filename = `${alias}/${id}.webp`;
		const content = await sharp(img).webp().toBuffer();

		items.push({ filename, content });
		await clientUpload(filename, content);
	}

	return items.map((x) => x.filename);
};

export default imgUploader;
