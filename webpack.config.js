const
    path = require('path'),
    htmlWebpackPlugin = require('html-webpack-plugin'),
    copyWebpackPlugin = require('copy-webpack-plugin'),
    webpack = require('webpack')

const isProd = process.env.NODE_ENV === 'production' ? true : false

module.exports = {
    entry: [
        './src/app.js'
    ],

    output: {
        path: path.resolve('dist'),
        filename: 'game.js'
    },

    devServer: {
        hot: true,
        contentBase: '.'
    },

    devtool: isProd ? false : 'source-map',

    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(vert|frag)$/,
                use: ['raw-loader']
            }
        ]
    },

    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html',
            hash: true,
            filename: 'index.html',
            inject: 'body',
            minify: {
                collapseWhitespace: true
            }
        }),

        isProd ? new copyWebpackPlugin([
            {from: 'static/textures', to: 'static/textures'}
        ]) : null,

        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            ver: JSON.stringify(process.env.NODE_ENV || 'dev'),
            stamp: JSON.stringify(Date.now()),
                'CANVAS_RENDERER': JSON.stringify(true),
                'WEBGL_RENDERER': JSON.stringify(true)
        })
    ],

    mode: isProd ? 'production' : 'development'
}