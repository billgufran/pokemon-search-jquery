const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {sourceMap: true, importLoaders: 1},
					},
				],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
				  'file-loader',
				],
			 },
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html",
		}),
	],
};
