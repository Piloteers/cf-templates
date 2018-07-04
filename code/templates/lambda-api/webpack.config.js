const fs = require('fs');
const path = require('path');
const ZipPlugin = require('zip-webpack-plugin');

module.exports = (env) => {
  const lambdaFunctionDir = path.join(__dirname, 'src', 'functions');
  // Get list of functions from env or use all folder within functions that dont start with an '.'
  const functionsToBuild = env && env.functions ? env.functions.split(',') : fs.readdirSync(lambdaFunctionDir).filter(item => fs.lstatSync(path.join(lambdaFunctionDir, item)).isDirectory() && !item.match(/^\./));
  console.log(`Building ${functionsToBuild.join(', ')}`); // eslint-disable-line no-console
  return functionsToBuild
    .map(fxn => ({
      entry: path.join(lambdaFunctionDir, fxn, 'index.js'),
      target: 'node',
      mode: 'production',
      context: path.resolve(__dirname),
      output: {
        path: path.join(__dirname, 'dist', fxn),
        filename: 'index.js',
        libraryTarget: 'commonjs2',
      },
      module: {
        rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            query: {
              extends: path.join(__dirname, '.babelrc'),
            },
          },
        }],
      },
      plugins: [
        new ZipPlugin({
          path: path.join(__dirname, 'dist', fxn),
          pathPrefix: '',
          filename: `${fxn}.zip`,
        }),
      ],
      externals: {
        // These modules are already installed on the Lambda instance.
        'aws-sdk': 'aws-sdk',
        awslambda: 'awslambda',
        'dynamodb-doc': 'dynamodb-doc',
        imagemagick: 'imagemagick',
      },
      node: {
        // Allow these globals.
        __filename: false,
        __dirname: false,
      },
      stats: 'minimal',
      bail: true,
    }));
};
