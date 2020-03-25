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

router.put('/api/put/courseRevEdit', (req, res, next) => {
    console.log("and th");
    const values = [ req.body.rid,
        req.body.review,
        req.body.rating
    ];
    pool.query(`UPDATE course_reviews SET review= $2, rating=$3
              WHERE rid = $1`, values,
        (q_err, q_res) => {
            console.log(q_res)
            console.log(q_err)
        })
});

router.post('/api/post/coursePost', (req, res, next) => {
    console.log("Trying to post");
    console.log(req);
    values=[ req.body.cid,
        req.body.uid,
        req.body.review,
        req.body.rating,
        req.body.likes,
        req.body.level,
        req.body.name,
        req.body.username
    ];
    pool.query(`INSERT INTO course_reviews (cid,uid,review,rating,likes,level,name,user_name,date)
     VALUES
     ($1,$2,$3,$4,$5,$6,$7,$8, NOW())`,
        values, (q_err, q_res) => {
            if(q_err) return next(q_err);
            res.json(q_res.rows)
        })
});


module.exports = router;
