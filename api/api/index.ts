import { VercelRequest, VercelResponse } from "@vercel/node";
import { Benzene, makeHandler } from "@benzene/http";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";
import fetch from "undici-fetch";
import path from "path";

import Query from "../resolvers/query";
import Mutation from "../resolvers/mutations";

globalThis.fetch = fetch as any;

const typesArray = loadFilesSync(path.join(__dirname, "../schema"), {
	extensions: ["graphql"],
});

const schema = makeExecutableSchema({
	typeDefs: mergeTypeDefs(typesArray),
	resolvers: { Query, Mutation },
});

const GQL = new Benzene({ schema });

const graphqlHTTP = makeHandler(GQL);

export default function handler(req: VercelRequest, res: VercelResponse) {
	return graphqlHTTP({
		method: req.method,
		headers: req.headers,
		body: req.body,
	}).then((result) => {
		for (const [key, value] of Object.entries(result.headers)) {
			res.setHeader(key, value);
		}
		res.status(result.status).send(result.payload);
	});
}
