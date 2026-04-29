
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { ModuleFederationPlugin } = require('webpack').container
const CopyPlugin = require("copy-webpack-plugin");
const deps = require("./package.json").dependencies;


const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


const { use } = require('react');
const port = 3001;
module.exports = {
    mode: "development",

    entry: {
        main: "./src/main.jsx",
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].[contenthash].js",
        publicPath: "auto"
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {

        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[contenthash].[ext]',
                    }
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            }
        ]
    },
    plugins: [

        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[fullhash].css"
        }),
        new HtmlWebPackPlugin(
            {
                template: './index.html',
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true
                }
            }
        ),
        new ModuleFederationPlugin({
            name: "clientA",
            filename: "remoteEntry.js",
            remotes: {
                product: "product@http://localhost:3003/remoteEntry.js"
            },
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: false ,// Forces them to share whatever version is loaded first
                    eager: true,
                },
                "react-dom": { singleton: true, requiredVersion: false },
                "react-router-dom": {
                    singleton: true,
                    requiredVersion: false
                },
                "react-redux": {
                    singleton: true,
                    requiredVersion: false
                },
                "@reduxjs/toolkit": {
                    singleton: true,
                    requiredVersion: false
                },
            }
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        minimizer: [
            `...`,
            new CssMinimizerPlugin(),
        ]
    },
    devServer: {
        host: 'localhost',
        port: port,
        historyApiFallback: true,
        open: true
    }
}