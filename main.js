
'use strict';

const config = require( './config' );
const api_router = require( './api/api_router' );

const express = require( 'express' );
const https = require( 'https' );
const http = require( 'http' );

const app = express();

// add basic routes
app.use( '/api', api_router );
app.get( '/', express.static( config.react_app_path ) );

const callback = ( stype ) => ( ( err ) => {
    if ( ! err )
        console.log( stype + " server started successfully" );
    else
        console.error( stype + " " + err.toString() );
} );

http.createServer( app ).listen( { 
    port: config.http_port,
    host: config.ip, 
    backlog: config.backlog
}, callback( 'Http' ) );

if ( config.do_https ) {
    https.createServer( app ).listen( { 
        port: config.https_port,
        host: config.ip, 
        backlog: config.backlog,
        key: config.https_key,
        cert: config.https_cert 
    }, callback( 'Https' ) );
} else {
    console.warn( "Warning: HTTPS init failed." );
}
