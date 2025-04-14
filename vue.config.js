// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   devServer: {
//     historyApiFallback: true,
//   }
// })

const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
  devServer: {
    proxy: {
      '/wp-json': {
        target: 'https://test-mentoriai.inovacijuagentura.lt',
        changeOrigin: true,
      },
    },
  },
};