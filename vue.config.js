var path = require('path')

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve('src'),
        'common': resolve('src/common'),
        'components': resolve('src/components'),
        'base': resolve('src/base'),
        'api': resolve('src/api'),
        'model': resolve('src/model')
      }
    }
    // module: {
    //   rules: [
    //     {
    //       test: /\.scss$/,
    //       use: [
    //         'vue-style-loader',
    //         'css-loader',
    //         'sass-loader'
    //       ]
    //     }
    //   ]
    // }
  }
}
