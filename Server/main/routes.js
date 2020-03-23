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

router.get('/api/get/courseList', (req, res, next ) => {
    console.log('Got inside courseList');
    pool.query(`SELECT * FROM course_names`,
        (q_err, q_res) => {
            res.json(q_res.rows)
        })
});

router.get('/api/get/courseReview', (req, res, next ) => {
    pool.query(`SELECT * FROM course_reviews WHERE name = $1`,[req.query.name],
        (q_err, q_res) => {
            res.json(q_res.rows)
        })
});
module.exports = router;
