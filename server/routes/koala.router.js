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
    let queryString = 'SELECT * FROM "koalas" ORDER BY "name" DESC;';
    pool.query( queryString ).then( result => {
        res.send( result.rows );
    }).catch( err => {
        console.log( 'error in GET:', err );
        res.sendStatus( 500 );
    });
}); // end GET route



// POST
koalaRouter.post('/', (req, res) =>{
    let koala = req.body;
    console.log('POST req receieved:', req.body);
    let queryText = `INSERT INTO "koalas" ( "name", "gender", "age", "ready_to_transfer", "notes")
                     VALUES ($1, $2, $3, $4, $5);`;
    pool.query(queryText, [koala.name, koala.gender, koala.age, koala.readyForTransfer, koala.notes])
    .then(result =>{
        // send back results
        res.sendStatus( 204 );
    }).catch((error)=>{
        console.log('error in POST', error);
        res.sendStatus(500);
    })
})

// PUT
koalaRouter.put(`/:id`, (req,res) => {
    const id = req.params.id;
    const operation = req.body.operation;
    let solution;
    if( operation === 'true' ) {
        solution = `UPDATE "koalas" SET "ready_to_transfer" = false WHERE id = $1;`
    }
    else if( operation === 'false' ) {
        solution = `UPDATE "koalas" SET "ready_to_transfer" = true WHERE id = $1;`
    }
    pool.query( solution, [id])
    .then( (results) => {
        res.sendStatus(200);
    })
    console.log('PUT is hit', id);
})

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