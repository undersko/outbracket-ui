const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
          plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-proposal-class-properties'],
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.resolve(__dirname, './build'),
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.resolve(__dirname, './build'),
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
              sourceMap: true,
            },
          },
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                './src/styles/variables.scss',
                './src/styles/mixins/for-size.scss',
                './src/styles/mixins/placeholder.scss',
              ],
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, './src/icons'),
        use: [
          {
            loader: '@svgr/webpack',
          },
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash]',
              outputPath: '../build',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js', '.ts', '.tsx', '.scss', '.css', '.svg'],
    mainFiles: ['index.tsx', 'index.ts', 'index.js'],
    alias: {
      '@shared': path.resolve(__dirname, './src/components/shared'),
      '@uikit': path.resolve(__dirname, './src/components/uikit'),
      '@controllers': path.resolve(__dirname, './src/controllers'),
      '@constants': path.resolve(__dirname, './src/shared/constants'),
      '@helpers': path.resolve(__dirname, './src/shared/helpers'),
      '@hooks': path.resolve(__dirname, './src/shared/hooks'),
      '@store': path.resolve(__dirname, './src/store'),
      '@declarations': path.resolve(__dirname, './src/declarations'),
      '@redux-types': path.resolve(__dirname, './src/redux/types'),
      '@redux-actions': path.resolve(__dirname, './src/redux/actions'),
      '@redux-reducers': path.resolve(__dirname, './src/redux/reducers'),
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      templateParameters: (compilation, assets, assetTags, options) => {
        return {
          compilation,
          webpackConfig: compilation.options,
          htmlWebpackPlugin: {
            tags: assetTags,
            files: assets,
            options,
          },
          PUBLIC_URL: '.',
        };
      },
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        PUBLIC_URL: JSON.stringify('.'),
      },
    }),
  ],
  performance: {
    hints: 'warning',
    maxAssetSize: 200000,
    maxEntrypointSize: 400000,
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    },
  },
  devtool: 'source-map',
  context: __dirname,
};
