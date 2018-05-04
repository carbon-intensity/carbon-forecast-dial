const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const dotenv = require('dotenv');
dotenv.config({path: path.resolve(__dirname) + '/.environmentName'});

// Currently using .env built into Netlify admin area. Use this if building
// locally
dotenv.config({path: path.resolve(__dirname) + '/.env'});

module.exports = {
    mode: 'development',
    entry: ['./src/carbon-gizmo-dial.js'],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'javascript/carbon-gizmo-dial.js'
    },
    devServer: {
        contentBase: './public'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                include: /\.pug$/,
                use: [
                    {
                        loader: 'raw-loader'
                    },
                    {
                        loader: 'pug-html-loader',
                        options: {
                            // options to pass to the compiler same as: https://pugjs.org/api/reference.html
                            debug: false,
                            data: {
                                // set of data to pass to the pug render.
                                rollbar : process.env.ROLLBAR_ACCESS_TOKEN,
                                googleAnalytics : [
                                    process.env.GOOGLE_ANALYTICS_ID,
                                    process.env.GOOGLE_ANALYTICS_ID_2
                                ],
                                environmentName : process.env.ENVIRONMENT_NAME
                            }
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:8]'
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new HtmlWebPackPlugin({
            template: './src/index.pug',
            filename: './index.html'
        })
    ]
};