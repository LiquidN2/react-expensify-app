const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// loading the content of .env files as node environment variables
if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: './.env.test'});
} else if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: './.env.development'});
} 

module.exports = merge(common, {
    mode: 'development',

    plugins: [
        // Manually passing node environment variables (process.env) to client-side javascript
        new webpack.DefinePlugin({
            'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
            'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
            'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
            'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
            'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
            'process.env.FIREBASE_MESSAGING_SENGER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENGER_ID)
        })
    ],

    devtool: 'inline-source-map',

    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        historyApiFallback: true,
        publicPath: '/dist/'
    },

    watch: true
});