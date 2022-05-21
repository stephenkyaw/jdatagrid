const path = require('path');

module.exports = {
    mode: "production",
    entry: './src/jdatagrid.js',
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'bundle.js',
        libraryTarget: 'var',
        library: 'jdatagrid'
    },
    // devtool: 'inline-source-map',
    resolve:{
        extensions: ['.ts','.js']
    }
}