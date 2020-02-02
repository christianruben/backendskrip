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
const classes = require('./classes');
const time = require('./time');
const room = require('./room');
const department = require('./department');
const semester = require('./semester');
const day = require('./day');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.use('/admin', admin);
router.use('/exam', exam);
router.use('/news', news);
router.use('/schedule', schedule);
router.use('/student', student);
router.use('/study', study);
router.use('/teacher', teacher);
router.use('/class', classes);
router.use('/root', room);
router.use('/time', time);
router.use('/department', department);
router.use('/semester', semester);
router.use('/day', day);

module.exports = router;