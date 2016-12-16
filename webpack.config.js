var version = require( './package.json' ).version;

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'sketchfab-oauth2.' + version + '.js',
        path: './dist',
        library: 'SketchfabOAuth2',
        libraryTarget: 'umd'
    }
}
