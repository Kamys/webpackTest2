const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body',
})

const styleLoader = process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve('dist'),
        filename: 'index_bundle.js',
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: styleLoader,
                }, {
                    loader: "css-loader", options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader", options: {
                        sourceMap: true
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader",
            }, {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    plugins: [
        HtmlWebpackPluginConfig,
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
}