##使用typescript开发vue项目搭建

### 项目初始化

- 使用`npm init`初始化项目。
- 添加`.gitignore`文件，排除不需要传到git上的文件。

### koa2模块部署搭建

- 安装模块koa,`npm install koa`。

### typescript配置

- 

### webpack配置

- 安装模块`npm install -D webpack webpack-cli webpack-command webpack-merge html-webpack-plugin webpack-dev-server`

  - `webpack`:webpack工具包，通常情况下需要全局安装webpack。
  - `webpack-cli`
  - `webpack-command`
  - `webpack-merge`：用于合并webpack配置。
  - `html-webpack-plugin`:用于打包html模板文件。
  - `webpack-dev-server`:用于启动一个临时的web服务，方便开发调试。

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

- 添加`html-webpack-plugin`组件，打包html模板。在文件`config/webpack.base.config.js`中添加以下配置。

  ```javascript
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  module.exports = {
  	...
      plugins: [new HtmlWebpackPlugin({
          title: 'Custom template',
          filename: 'index.html',
          template: path.resolve(__dirname, '../src/assets/index.html')
      })]
      ...
  };
  ```

  创建`/src/assets/index.html`文件，文件中绑定字段需要使用`ejs`语法绑定字段，例如标题绑定为`<%= htmlWebpackPlugin.options.title %>`。

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

    

  



### vue配置

- 安装包`npm  i -D vue`