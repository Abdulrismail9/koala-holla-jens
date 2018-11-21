const express = require('express');
const koalaRouter = express.Router();
const pg = require( 'pg' );
// DB CONNECTION
const config = {
    database: 'koala_holla', // name of db
    host: 'localhost', // local db
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
}

const pool = new pg.Pool( config );

pool.on( 'connect', () => {
    console.log( 'connected to DB' );
});

pool.on( 'error', (err) => {
    console.log( 'error connecting to DB' );
});

// GET
koalaRouter.get( '/', (req, res) => {
    let queryString = 'SELECT * FROM "koalas";';
    pool.query( queryString ).then( result => {
        res.send( result.rows );
    }).catch( err => {
        console.log( 'error in GET:', err );
        res.sendStatus( 500 );
    });
}); // end GET route



// POST


// PUT


// DELETE
koalaRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    console.log(`delete hit ${id}`);
    pool.query(`DELETE FROM "koalas" WHERE id=$1;`, [id])
    .then( (results) => {
        res.sendStatus(204);
    }).catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    })
    
})

module.exports = koalaRouter;