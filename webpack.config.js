const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
	mode: "development",
	entry: {
		main: "./src/debug.tsx",
	},
	devtool: "inline-source-map",
	devServer: {
		contentBase: './dev-server',
		watchContentBase: true,
		disableHostCheck: true,
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dev-server')
	},
	resolve: {
		extensions: [".tsx", ".ts", ".jsx", ".js"],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Development',
			template: "./src/debug.html",
		})
	],
	module: {
		rules: [
			// all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
			{
				test: /(\.tsx?)|(\.json)$/,
				loader: "ts-loader",
				options: {
					configFile: "src/tsconfig.json",
				}
			},
		],
	},
};
