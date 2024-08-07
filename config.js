
'use strict';

const fs = require( 'fs' );
const path = require( 'path' );

const read = ( p ) => {
    try {
        return fs.readFileSync( p, 'utf8' );
    } catch ( e ) {
        console.error( e.toString() );
        return null; 
    }
};

const pvt_cert_dir = process.env.CERT_DIR || 
                path.join( __dirname, 'cert/' );
const pvt_https_key = read( path.join( pvt_cert_dir, 
                process.env.HTTPS_KEY || 'private.key' ) );
const pvt_https_cert = read( path.join( pvt_cert_dir, 
                process.env.HTTPS_CERT || 'certificate.crt' ) );

module.exports = {
    // https stuff
    cert_dir: pvt_cert_dir,
    https_key: pvt_https_key,
    https_cert: pvt_https_cert,
    https_port: process.env.HTTPS_PORT || 8889,
    // ofc only do https if the https stuff exists
    do_https: pvt_https_key != null && pvt_https_key != null,
    // http / net stuff
    http_port: process.env.HTTP_PORT || 8888,
    backlog: process.env.BACKLOG || 511,
    host: process.env.SERVER_HOST || '127.0.0.1',
    // mongo stuff
    db_url: process.env.DB_URL || 'mongodb://'+this.host+':27101',
    db_name: process.env.DB_NAME || 'test_db',
    // react stuff
    react_app_path: process.env.REACT_APP_PATH || 
            path.join( __dirname, 'client/build' )
};

