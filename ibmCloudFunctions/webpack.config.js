var path = require('path');
var webpack = require("webpack");
module.exports = {
  entry: './curriculumAnalysis.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  target: 'node',
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1, // disable creating additional chunks
    })
],
};