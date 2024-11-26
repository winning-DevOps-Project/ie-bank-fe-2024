const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: "source-map"
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Your Flask backend
        changeOrigin: true, // Allows modifying the Origin header
        secure: false, // If using HTTPS locally, disable SSL verification
        pathRewrite: { "^/api": "/api" }, // Keeps the API path unchanged
      },
    },
  },
});
