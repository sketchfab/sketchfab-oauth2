var when = require( 'when' );

function SketchfabOAuth2( config ) {

    if ( !config ) {
        throw new Error( 'SketchfabOAuth2 config is missing.' );
    }

    if ( !config.hasOwnProperty( 'hostname' ) ) {
        config.hostname = 'sketchfab.com';
    }

    if ( !config.hasOwnProperty( 'client_id' ) ) {
        throw new Error( 'client_id is missing. Please check the config of SketchfabOAuth2.' );
    }

    if ( !config.hasOwnProperty( 'redirect_uri' ) ) {
        throw new Error( 'redirect_uri is missing. Please check the config of SketchfabOAuth2.' );
    }

    this.config = config;

}

SketchfabOAuth2.prototype.connect = function () {

    return when.promise( function ( resolve, reject ) {
        if ( !this.config.client_id ) {
            reject( new Error( 'client_id is missing.' ) );
            return;
        }

        // @TODO: allow users to pass their own state
        var state = +( new Date() );
        var authorizeUrl = [
            'https://' + this.config.hostname + '/oauth2/authorize/?',
            'state=' + state,
            '&response_type=token',
            '&client_id=' + this.config.client_id,
            '&redirect_uri=' + encodeURIComponent(this.config.redirect_uri)
        ].join( '' );

        var loginPopup = window.open( authorizeUrl, 'loginWindow', 'width=640,height=400' );

        // Polling new window
        var timer = setInterval( function () {
            try {
                var url = loginPopup.location.href;

                // User closed popup
                if ( url === undefined ) {
                    clearInterval( timer );
                    reject( new Error( 'Access denied (User closed popup)' ) );
                    return;
                }

                // User canceled or was denied access
                if ( url.indexOf( '?error=access_denied' ) !== -1 ) {
                    clearInterval( timer );
                    reject( new Error( 'Access denied (User canceled)' ) );
                    return;
                }

                // Worked?
                if ( url.indexOf( this.config.redirect_uri ) !== -1 ) {
                    clearInterval( timer );

                    var hash = loginPopup.location.hash;
                    var grant;
                    var accessTokenRe = RegExp( 'access_token=([^&]+)' );
                    if ( hash.match( accessTokenRe ) ) {
                        grant = parseQueryString( hash.substring( 1 ) );
                        resolve( grant );
                        return;
                    } else {
                        reject( new Error( 'Access denied (missing token)' ) );
                        return;
                    }
                }
            } catch ( e ) {}
        }.bind( this ), 1000 );

    }.bind( this ) );
}

/**
 * parseQueryString
 * @param {string} queryString
 * @return {object} parsed key-values
 */
function parseQueryString( queryString ) {
    var result = {};
    queryString.split( "&" ).forEach( function ( part ) {
        var item = part.split( "=" );
        result[ item[ 0 ] ] = decodeURIComponent( item[ 1 ] );
    } );
    return result;
}

module.exports = SketchfabOAuth2;
