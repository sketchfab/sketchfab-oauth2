module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'sketchfab-oauth2.js',
        path: './dist',
        library: 'SketchfabOAuth2',
        libraryTarget:'umd'
    }
}
