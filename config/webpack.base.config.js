const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                /* vue-loader配置，处理*.vue文件里面的代码 */
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                /* 代码样式处理，把less文件及.vue文件中的样式文件处理为css */
                test: /\.less$/,
                use: [
                    'vue-style-loader', //把css样式注入到document
                    'css-loader',   //解释(interpret) @import 和 url()等
                    'less-loader'   //转化less为css
                ]
            },
            {
                /* 
                    babel-loader 把es6 es7新特性语法转化为浏览器可识别的es5语法。
                    具体的配置以项目根目录下的.babelrc配置文档的配置文件为准
                */
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: file => (
                    /* 设置转码白名单 */
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                )
            },
            {
                /* 转化vue中的typescript代码 */
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],   //会给.vue文件添加.ts,.tsx后缀，用于对vue文件中的typescript转码。
                }
            },
            {
                /* 加载静态图片文件 */
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]' //添加文件签名
                }
            }
        ]
    },
    plugins: [
        /* 打包html静态模板，注入js，css链接，定制显示参数等 */
        new HtmlWebpackPlugin({
            title: 'Custom template',
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/assets/index.html')
        }),
        // 请确保引入这个插件！，以实现vue-loader的各个功能，vue-loader v15版本之后特有功能
        new VueLoaderPlugin()
    ]
};