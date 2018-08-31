const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", 
                    "css-loader", 
                    "sass-loader" 
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 1208,
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            // 虚拟的html文件名 index.html
            filename: 'index.html',
            // 虚拟html的模板为 src下的index.html
            template: path.resolve(__dirname, './src/index.html')
        })
    ]
}


module.exports = config;