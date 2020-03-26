var express = require('express');
var router = express.Router();
var pool =require('./db');


router.get('/api/get/profList', (req, res, next ) => {
    pool.query(`SELECT * FROM prof_names`,
        (q_err, q_res) => {
            res.json(q_res.rows)
        })
});

router.get('/api/get/courseList', (req, res, next ) => {
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

router.get('/api/get/profReview', (req, res, next ) => {
    pool.query(`SELECT * FROM professor_reviews WHERE name = $1`,[req.query.name],
        (q_err, q_res) => {
            res.json(q_res.rows)
        })
});


router.put('/api/put/courseRevLike', (req, res, next) => {
    console.log("and th");
    const values = [ req.body.rid];
    pool.query(`UPDATE course_reviews SET likes = likes + 1
              WHERE rid = $1`, values,
        (q_err, q_res) => {
            console.log(q_res);
            console.log(q_err)
        })
});

router.put('/api/put/profRevLike', (req, res, next) => {
    console.log("and th");
    const values = [ req.body.rid];
    pool.query(`UPDATE professor_reviews SET likes = likes + 1
              WHERE rid = $1`, values,
        (q_err, q_res) => {
            console.log(q_res);
            console.log(q_err)
        })
});


router.put('/api/put/courseRevLikeToList', (req, res, next) => {
    console.log("and th");
    const values = [ req.body.rid,req.body.uid];
    pool.query(`UPDATE course_reviews SET like_user_ids = array_append( like_user_ids , $2)
              WHERE rid = $1 `, values,
        (q_err, q_res) => {
            console.log(q_res);
            console.log(q_err)
        })
});

router.put('/api/put/profRevLikeToList', (req, res, next) => {
    console.log("and th");
    const values = [ req.body.rid,req.body.uid];
    pool.query(`UPDATE professor_reviews SET like_user_ids = array_append( like_user_ids , $2)
              WHERE rid = $1 `, values,
        (q_err, q_res) => {
            console.log(q_res);
            console.log(q_err)
        })
});

router.put('/api/put/courseRevEdit', (req, res, next) => {
    const values = [ req.body.rid,
        req.body.review,
        req.body.rating,
        req.body.level,
        req.body.prof
    ];
    console.log(values);
    pool.query(`UPDATE course_reviews SET review= $2, rating=$3, level=$4, prof_names=$5
              WHERE rid = $1`, values,
        (q_err, q_res) => {
            console.log("So here I log the errors");
            console.log(q_res);
            console.log(q_err)
        })
});

router.put('/api/put/profRevEdit', (req, res, next) => {
    const values = [ req.body.rid,
        req.body.review,
        req.body.rating,
        req.body.level,
        req.body.course
    ];
    console.log(values);
    pool.query(`UPDATE professor_reviews SET review= $2, rating=$3, level=$4, course_names=$5
              WHERE rid = $1`, values,
        (q_err, q_res) => {
            console.log("So here I log the errors");
            console.log(q_res);
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
        req.body.username,
        req.body.prof
    ];
    pool.query(`INSERT INTO course_reviews (cid,uid,review,rating,likes,level,name,user_name,prof_names,date)
     VALUES
     ($1,$2,$3,$4,$5,$6,$7,$8,$9,NOW())`,
        values, (q_err, q_res) => {
            if(q_err) return next(q_err);
            res.json(q_res.rows)
        })
});


router.post('/api/post/profPost', (req, res, next) => {
    console.log("Trying to post");
    console.log(req);
    values=[ req.body.pid,
        req.body.uid,
        req.body.review,
        req.body.rating,
        req.body.likes,
        req.body.level,
        req.body.name,
        req.body.username,
        req.body.course
    ];
    pool.query(`INSERT INTO professor_reviews (pid,uid,review,rating,likes,level,name,user_name,course_names,date)
     VALUES
     ($1,$2,$3,$4,$5,$6,$7,$8,$9,NOW())`,
        values, (q_err, q_res) => {
            if(q_err) return next(q_err);
            res.json(q_res.rows)
        })
});


module.exports = router;
