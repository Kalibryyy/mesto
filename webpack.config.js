const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключите плагин
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: { main: './src/pages/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [ // rules — это массив правил
          {
            test: /\.html$/i,
            loader: 'html-loader',
          },
          // добавим в него объект правил для бабеля
          {
            // регулярное выражение, которое ищет все js файлы
            test: /\.js$/,
            // при обработке этих файлов нужно использовать babel-loader
            loader: 'babel-loader',
            // исключает папку node_modules, файлы в ней обрабатывать не нужно
            exclude: /node_modules/
          },
          {
            test: /\.css$/i,
            use: [
                MiniCssExtractPlugin.loader, 
                { loader: 'css-loader', options: { importLoaders: 1 } }, 
                'postcss-loader'
            ],
          },
          {
            test: /\.(png|jpe?g|gif|woff2|woff|svg)$/i,
            use: [
              {
                loader: 'file-loader'
              },
            ],
          },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin()
    ]
}