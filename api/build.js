const graphqlLoaderPlugin = require("@luckycatfactory/esbuild-graphql-loader");

require("esbuild")
	.build({
		entryPoints: ["src/server.ts"],
		bundle: true,
		minify: true,
		platform: "node",
		target: ["node16.2"],
		define: {
			"process.env.NODE_ENV": `"production"`,
		},
		outfile: "dist/server.js",
		plugins: [graphqlLoaderPlugin.default()],
	})
	.catch(() => process.exit(1));
