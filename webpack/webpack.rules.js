const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	rules: [
		{
			test: /\.(js|ts)x?$/,
			loader: require.resolve("babel-loader"),
			exclude: /node_modules/,
		},
		{
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: ["css-loader", "postcss-loader"],
			}),
		},
		{
			test: /\.scss/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: [
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
							modules: {
								localIdentName:
									"[name]__[local]-[hash:base64:5]",
							},
							sourceMap: true,
						},
					},
					{
						loader: "postcss-loader",
						options: {
							sourceMap: true,
							config: { path: "." },
						},
					},
					"sass-loader",
				],
			}),
		},
	],
};
