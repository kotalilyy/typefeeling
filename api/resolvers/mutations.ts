const Mutation = {
	createKeyboard: async (_: any, { input }: any) => {
		console.log(input);

		return true;
	},
};

export default Mutation;
