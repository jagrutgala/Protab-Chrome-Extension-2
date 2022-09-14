const port = process.env.PORT || 3000
const prod = process.env.NODE_ENV === 'production';

const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: prod ? 'production' : 'development',
    entry: './src/index.tsx',
    output: {
        path: __dirname + '/dist/',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                resolve: {
                    extensions: ['.ts', '.tsx', '.js', '.json'],
                },
                use: 'ts-loader',
            },
            {
                test: /\.css$/,
                use: prod ? [MiniCssExtractPlugin.loader, 'css-loader'] : ["style-loader", "css-loader"],
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.((jpe?g)|png|gif|svg)$/,
                use: ["file-loader"]
            },
        ]
    },
    devtool: prod ? undefined : 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        }),
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [
                { from: "public/manifest.json" },
                // { from: "public/icons/" },
            ],
        }),
    ],
    devServer: {
        static: [
            {
              directory: path.join(__dirname, 'dist'),
            }
          ],
        port: port,
        open: true
    }
};
