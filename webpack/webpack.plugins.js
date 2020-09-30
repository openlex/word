const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [
	new HtmlWebpackPlugin({
		title: "Hot Module Replacement",
		template: "./public/index.html",
	}),
	new CleanWebpackPlugin(),
	new ExtractTextPlugin({
		filename: "css/[name].css",
		publicPath: "./",
		allChunks: true,
	}),
];
