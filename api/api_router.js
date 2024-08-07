
'use strict';

const express = require( 'express' );

const router = express.Router();

// add api endpoints
router.get( '/test', ( req, res ) => 
    res.status( 200 ).send( 'wassup' ) );

module.exports = router;
