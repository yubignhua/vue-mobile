'use strict'
const path = require('path')
module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8086, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    useEslint: true,
    showEslintErrorsInOverlay: false,
    devtool: 'eval-source-map',
    cacheBusting: true,
    cssSourceMap: false,
  },
  test:{
    assetsRoot: path.resolve(__dirname, '../dist'),//根目录
    assetsPublicPath: '/cdm/',
    assetsSubDirectory: 'static/vue_cdm',
    expressRoot:'/Users/cy/myTest/express/dist', //存放本机 express 服务下
    productionSourceMap: true,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report,
    index: path.resolve(__dirname, '../dist/index.html'), // Template for index.html
  },
  build: {
    assetsRoot: path.resolve(__dirname, '../dist'),//根目录
    assetsSubDirectory: 'static/vue_cdm_mobile',//子目录
    assetsPublicPath: '//dn-chunyu.qbox.me/@/',
    productionSourceMap: true,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report,
    index: path.resolve(__dirname, '../dist/index.html'),

  }
}
