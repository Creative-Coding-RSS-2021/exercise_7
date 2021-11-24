const path = require('path');


const pathDist = path.resolve(__dirname, 'dist')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devServer: {
        static: pathDist
    },
    output: {
        filename: 'bundle.js',
        path: pathDist
    }
}
