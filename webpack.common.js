const path = require('path');

module.exports = {
    entry: './src/app.js',
    // entry: './src/playground/firebaseAuthGoogle.js',

    output: {
        path: path.resolve(__dirname, 'public', 'dist'),
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
                {
                    loader: 'css-loader',
                    options: { sourceMap: true }
                },{
                    loader: 'sass-loader',
                    options: { sourceMap: true }
                }
            ]
        }]
    },
};