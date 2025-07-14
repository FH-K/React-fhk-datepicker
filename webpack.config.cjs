const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    library: "ReactFhkDatepicker",
    libraryTarget: "umd",
    globalObject: "this",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  // Fix for Next.js compatibility - disable eval devtool
  devtool: false,
  // Ensure proper module resolution
  experiments: {
    outputModule: false,
  },
};
