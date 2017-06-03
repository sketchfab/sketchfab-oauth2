# SketchfabOAuth2

SketchfabOAuth2 is a JS browser library for connecting to a Sketchfab account with OAuth2.
This library only support the [Implicit flow](https://sketchfab.com/developers/oauth#implement-implicit).

## Usage

To use OAuth2, you need to register your app on Sketchfab.

Insert the script in your HTML page

```html
<script src="../dist/sketchfab-oauth2-1.1.0.js" type="text/javascript"></script>
```

Here's how to use the library:

```js
var config = {
    hostname: 'sketchfab.com',
    client_id: 'INSERT_YOUR_CLIENT_ID_HERE',
    redirect_uri: 'http://example.com/authSuccess.html'
};

var client = new SketchfabOAuth2( config );

client.connect().then( function onSuccess( grant ) {
    console.log( grant );
} ).catch( function onError( error ) {
    console.error( error );
} );
```

## Development

* `npm install`
* Source is in `src`
* Run `npm run build` to build the browser library
