
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { ModuleFederationPlugin } = require('webpack').container
const CopyPlugin = require("copy-webpack-plugin");
const deps = require("./package.json").dependencies;


const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


const { use } = require('react');
const port = 3003;
module.exports = {
    mode: "development",

    entry: {
        main: "./src/main.jsx",
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].[fullhash].js",
        publicPath: "http://localhost:3003/",
        library: { type: "var", name: "product" },
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
            name: "product",
            filename: "remoteEntry.js",
            exposes: {
                './DynamicShippingAddressForm': './src/formEngine/DynamicShippingAddressForm.jsx',
                './FieldRegistry': './src/formEngine/FieldRegistry.js',
            },
            shared: {
                react: { singleton: true, requiredVersion: deps.react },
                "react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
                "react-router-dom": {
                    singleton: true,
                    requiredVersion: deps["react-router-dom"]
                },
                "react-redux": {
                    singleton: true,
                    requiredVersion: deps["react-redux"]
                },
                "@reduxjs/toolkit": {
                    singleton: true,
                    requiredVersion: deps["@reduxjs/toolkit"]
                },
            }
        })
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