const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
require('@babel/polyfill');

var config = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: ['@babel/polyfill', './index.js'],
    },
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'assets/js/[name].js',
        library: 'simple-music-website',
        libraryTarget: 'umd',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: './index.html',
        }),
    ],
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.devtool = 'eval';

        config.devServer = {
            contentBase: path.resolve(__dirname, './public'),
            host: 'localhost',
            port: 2345,
            publicPath: 'http://localhost:2345/',
            historyApiFallback: true,
            inline: true,
            open: true,
            hot: true,
            overlay: true,
        };
    }

    return config;
};
