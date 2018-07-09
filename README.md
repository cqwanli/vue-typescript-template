[TOC]

##使用typescript开发vue项目搭建

### 项目初始化

- 使用`npm init`初始化项目。
- 添加`.gitignore`文件，排除不需要传到git上的文件。

### koa2模块部署搭建

- 安装模块koa,`npm install koa`。

### typescript配置

- 安装`typescript`，执行命令`npm i -D typescript`

### webpack配置

- 安装模块`npm install -D webpack webpack-cli webpack-command webpack-merge html-webpack-plugin webpack-dev-server vue-loader css-loader less-loader ts-loader file-loader vue-template-compiler vue-loader vue-style-loader  `  

  - `webpack`:webpack工具包，通常情况下需要全局安装webpack。
  - `webpack-cli`：用于webpack命令行命令
  - `webpack-command`：功能和`webpack-cli`相同，用于取代`webpack-cli`。
  - `webpack-merge`：用于合并webpack配置。
  - `html-webpack-plugin`:用于打包html模板文件。
  - `webpack-dev-server`:用于启动一个临时的web服务，方便开发调试。
  - `vue-loader`: vue加载器。
  - `css-loader`：css加载器。
  - `less-loader`: less加载器，把less格式的样式转化为css。
  - `ts-loader`: typescript加载器。
  - `file-loader`:文件加载器。
  - `vue-template-compiler`: vuejs模板预渲染。
  - `vue-loader`：vuejs加载器
  - `vue-style-loader`: vuejs样式加载器。

- webpack输入输出基本配置。创建文件`config/webpack.base.config.js`,添加以下配置。

  ```javascript
  const path = require('path');
  module.exports = {
      entry: './src/main.js',
      output: {
          path: path.resolve(__dirname, '../dist'),
          filename: 'bundle.js'
      }
  };
  ```

  - 添加`plugins`组件，打包html模板。在文件`config/webpack.base.config.js`中添加以下配置。

    ```javascript
    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    module.exports = {
    	...
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
        ...
    };
    ```

    创建`/src/assets/index.html`文件，文件中绑定字段需要使用`ejs`语法绑定字段，例如标题绑定为`<%= htmlWebpackPlugin.options.title %>`。

  - 添加各个loader配置。

    ```javascript
    module.exports = merge(baseConfig, {
      	...
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
        }
        ...
    })
    ```

    

- webpack开发环境配置

  - 添加`webpack-dev-server`配置，创建文件`config/webpack.dev.config.js`。添加开发模式配置。

    ```javascript
    const merge = require('webpack-merge');
    const path = require('path');
    const baseConfig = require('./webpack.base.config');
    module.exports = merge(baseConfig, {
        devServer: {
            contentBase: path.join(__dirname, '../dist'),
            port: 8000
        }
    })
    ```

  - 在开发模式给项目添加`source-map`方便调试。

    ```javascript
    module.exports = merge(baseConfig, {
        ...
        devtool: "cheap-source-map"
        ...
    })
    ```

  - 添加别名

    ```javascript
    module.exports = merge(baseConfig, {
        resolve: {
            alias: {
              vue: 'vue/dist/vue.js'
            }
          }
    })
    ```

    

### vue配置

- 安装包`npm  i -D vue`

### babel配置

- 安装 babel 相关组件`npm i -D babel-cli babel-preset-env babel-preset-stage-2 babel-core babel-loader vue-property-decorator babel-plugin-transform-vue-jsx babel-plugin-syntax-jsx babel-plugin-transform-runtime `

  - `babel-cli`:用于命令行转码。
  - `babel-preset-env`：转化es6语法为es5语法。
  - `babel-preset-stage-2`: 转化es7的语法。
  - `babel-core`:如果某些代码需要调用Babel的API进行转码，就要使用`babel-core`模块。
  - `babel-loader`：webpack调用babel进行转码。
  - `vue-property-decorator`:在vue中使用装饰器（Decorator）。
  - `babel-plugin-transform-vue-jsx`：vue对jsx语法的支持。
  - `babel-plugin-syntax-jsx`：对vue中jsx的处理
  - `babel-plugin-transform-runtime`：对es6，es7部分语法的转化

- 在项目跟目录创建`.babelrc`文件。具体内容查看项目中文档的内容。

  - `presets.env`:把es6的语法转化为es5的语法，ES6 模块转译的模块格式为false，兼容使用率大于1%的浏览器，兼容浏览器最近的两个版本，兼容不小于ie8的ie浏览器版本。
  - `presets.stage-2`:以stage-2的语法标准转化es7语法。
  - `plugins.transform-vue-jsx`:转化vue中的jsx语法。
  - ``plugins.transform-runtime`:转化es6语法中某些特殊特性。

  

### less 安装

> 注意一定要在项目中安装less，不然会导致在`less-loader`中无法显示。

安装`npm i -D less`