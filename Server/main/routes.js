var express = require('express');
var router = express.Router();
var pool =require('./db');

router.get('/api/hello', (req, res) => {
    res.json('hello world2')
});

router.get('/api/get/profList', (req, res, next ) => {
    pool.query(`SELECT * FROM prof_names`,
        (q_err, q_res) => {
            res.json(q_res.rows)
        })
});
module.exports = router;
