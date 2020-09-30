const path = require("path");

const webpackRules = require("./webpack.rules");
const webpackPlugins = require("./webpack.plugins");
const aliases = require("./webpack.aliases");

const configs = {
	entry: "./src/index.tsx",
	devtool: "source-map",
	output: {
		path: path.join(__dirname, "./dist"),
		filename: "index.js",
		publicPath: "/",
	},
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
		alias: aliases,
	},
	module: { ...webpackRules },
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		port: 8008,
		hot: true,
		historyApiFallback: true,
	},
	plugins: [...webpackPlugins],
};

module.exports = (env, options) => {
	if (options.mode === "development") {
		configs.devtool = "source-map";
	}

	if (options.mode === "production") {
	}

	return configs;
};
