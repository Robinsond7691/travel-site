//This is part of the node library, allowing to generate an absolute path
const path = require('path');
const postCSSPlugins = [
  require('postcss-import'),
  require('postcss-mixins'),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('autoprefixer'),
];

module.exports =
  //The file we want webpack to watch and bundle
  {
    entry: './app/assets/scripts/App.js',
    output: {
      //this is where we control the output file name.
      filename: 'bundled.js',
      //this is where we want the file to be placed
      path: path.resolve(__dirname, 'app'),
    },
    devServer: {
      before: function (app, server) {
        server._watch('./app/**/*.html');
      },
      contentBase: path.join(__dirname, 'app'),
      hot: true,
      port: 3000,
      host: '0.0.0.0',
    },
    mode: 'development',
    //This section is telling Webpack to use css-loader when it comes across css files
    //css-loader allows webpack to bundle the css, style-loader allows the css to be applied
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            'css-loader?url=false',
            { loader: 'postcss-loader', options: { plugins: postCSSPlugins } },
          ],
        },
      ],
    },
  };
