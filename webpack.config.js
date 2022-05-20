const path = require('path');

module.exports = {
    mode: "production",
    entry: './js/app.js',
    output: {
        path: path.resolve(__dirname, 'js'),
        filename: 'bundle.js',
        libraryTarget: 'var',
        library: 'library'
    },
    // devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js']
    }
}