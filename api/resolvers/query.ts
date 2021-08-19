import { prisma } from "./../lib/prisma";

const Query = {
	keyboards: async (): Promise<any> => {
		try {
			const keyboards = await prisma.keyboard.findMany();
			console.log(keyboards);
			return keyboards;
		} catch (err) {
			console.log("  Could not query keyboards ---", err);
		}
	},
};

export default Query;
