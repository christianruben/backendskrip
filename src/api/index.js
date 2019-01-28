const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const admin = require('./admin');
const exam = require('./exam');
const news = require('./news');
const schedule = require('./schedule');
const student = require('./student');
const study = require('./study');
const teacher = require('./teacher');

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