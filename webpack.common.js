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
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
				  'file-loader',
				  {
					 loader: 'image-webpack-loader',
					 options: {
						bypassOnDebug: true, // webpack@1.x
						disable: true, // webpack@2.x and newer
					 },
				  },
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
