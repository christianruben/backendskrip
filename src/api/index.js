const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const admin = require('./src/api/admin');
const exam = require('./src/api/exam');
const news = require('./src/api/news');
const schedule = require('./src/api/schedule');
const student = require('./src/api/student');
const study = require('./src/api/study');
const teacher = require('./src/api/teacher');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.use('/admin', admin);
router.use('/exam', exam);
router.use('/news', news);
router.use('/schedule', schedule);
router.use('/student', student);
router.use('/study', study);
router.use('/teacher', teacher);

module.exports = router;