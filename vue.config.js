"use strict";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

// const webpack = require("webpack");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const globalSettings = require("./src/settings.ts");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "/",
  devServer: {
    port: 9965,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    progress: false,
    compress: true
    // proxy: {
    //   "/api": {
    //     target: `${baseUrl}/api/v1`,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       "/api": ""
    //     }
    //   },
    //   "/dev-mock": {
    //     target: `http://127.0.0.1:${port}/mock`,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       "/dev-mock": ""
    //     }
    //   }
    // }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    // name: name,
    // name: globalSettings.title,
    resolve: {
      alias: {
        "@": resolve("src")
      }
    }
    // plugins: [
    //   new webpack.ProvidePlugin({
    //     moment: "moment"
    //   })
    // ]
  },
  chainWebpack(config) {
    config.set("name", globalSettings.title);

    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons/index.ts"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons/index.ts"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();

    // set preserveWhitespace
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === "development", config =>
        config.devtool("cheap-source-map")
      );

    config.when(process.env.NODE_ENV !== "development", config => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [{
          // `runtime` must same as runtimeChunk name. default is `runtime`
          inline: /runtime\..*\.js$/
        }])
        .end();
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial" // only package third parties that are initially dependent
          },
          antDesignVue: {
            name: "chunk-antDesignVue", // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });
      config.optimization.runtimeChunk("single");
    });
  }
};
