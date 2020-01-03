const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path')
const webpack = require('webpack')
const argv = require('../../server/argv')

const COMMON_PLUGINS = [
    new webpack.EnvironmentPlugin({
        NODE_ENV: 'development',
    })
]

if (argv.analyzer) {
    COMMON_PLUGINS.push(
        new BundleAnalyzerPlugin({
            analyzerPort: parseInt(argv.port || 9528, 10)
        })
    )
}

module.exports = (webpackOptions) => ({
    mode: webpackOptions.mode,
    entry: webpackOptions.entry,
    output: {
        path: path.resolve(__dirname, '../../dist'),
        filename: 'boundle.js',
        ...webpackOptions.output,
    },
    optimization: webpackOptions.optimization,
    module: {
        rules: [
            // {
            //     test: /.ts(x?)$/,
            //     exclude: /(node_modules|bower_components)/,
            //     use: 'ts-loader'
            // },
            // {
            //     enforce: "pre",
            //     test: /\.js$/,
            //     loader: "source-map-loader"
            // },
            {
                test: /.(j|t)s(x)?$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                exclude: /node_module/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /.css$/,
                include: /node_module/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(eot|otf|ttf|woff|woff2)$/,
                use: 'file-loader'
            },
            {
                test: /.svg$/,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            limit: 10 * 1024,
                            noquotes: true,
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                        // Inline files smaller than 10 kB
                        limit: 10 * 1024,
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                        mozjpeg: {
                            enabled: false,
                        },
                        gifsicle: {
                            interlaced: false,
                        },
                        optipng: {
                            optimizationLevel: 7,
                        },
                        pngquant: {
                            quality: '65-90',
                            speed: 4,
                        },
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                use: 'html-loader',
            },
            {
                test: /\.(mp4|webm)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                    },
                },
            },
        ]
    },
    plugins: webpackOptions.plugins.concat(COMMON_PLUGINS),
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.react.js'],
        mainFields: ['browser', 'jsnext:main', 'main'],
        alias: {
            'react-dom': '@hot-loader/react-dom',
            '@src': path.resolve(__dirname, '../../src'),
            '@components': path.resolve(__dirname, '../../src/components'),
            '@utils': path.resolve(__dirname, '../../src/utils')
        }
    },
    devtool: webpackOptions.devtool,
    target: 'web',
    performance: webpackOptions.performance || {},
})