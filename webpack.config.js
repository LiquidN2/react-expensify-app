const path = require('path');

module.exports = {
    entry: './src/app.js',

    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }, {
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },

    devtool: 'cheap-module-eval-source-map',

    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        historyApiFallback: true // this will inform the browser to use client-side routing instead of server-side routing
    },
    
    watch: true
};