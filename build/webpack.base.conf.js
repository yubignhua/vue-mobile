'use strict'
const path = require('path');
const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');
const vuxLoader = require('vux-loader');
const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

console.log('==',resolve('src'))


const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

const originalConfig = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath //assetsPublicPath: '//dn-chunyu.qbox.me/@/',
      : config.dev.assetsPublicPath //assetsPublicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json','.less'],
    alias: {//设置路径简写
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },

  plugins:[
    //声明全局方法
    new webpack.ProvidePlugin({
      Axios: "axios",
      Vue: "vue",
      $:'webpack-zepto',
    })
  ],


  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {   //专门处理  vux 中的 less 文件
        test: /\.less$/,
        use: [
          {loader: "style-loader"}, // creates style nodes from JS strings
          {loader: "css-loader"}, // translates CSS into CommonJS
          {loader: "less-loader"} // compiles Less to CSS
        ]
      },
      {
        test: /\.scss$/,
        //exclude: /(node_modules|bower_components)/,
        //use: ['style-loader','css-loader',"sass-loader",'postcss-loader']
        use:ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader','sass-loader','postcss-loader'],
        })
      },
      // {
      //   test: /\.css$/,
      //   //use: [ 'style-loader','css-loader','postcss-loader' ]
      //   use: ExtractTextPlugin.extract({
      //     fallback: "style-loader",
      //     use: ["css-loader",'postcss-loader'],
      //   })
      // },
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

const webpackConfig = originalConfig;
module.exports = vuxLoader.merge(webpackConfig, {
  plugins: ['vux-ui']
});
