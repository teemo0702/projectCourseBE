'use strict'
const express = require('express')
const courseController = require('../controllers/course.controller')
const lectureController = require('../controllers/lecture.controller')
const userController = require('../controllers/user.controller')
const middlewareController = require('../controllers/middleware.controller')
const accessController = require('../controllers/access.controller')
const router = express.Router()

// router.use('/v1/api', require('./access'))

router.post('/v1/api/auth', accessController.logIn)
router.use(middlewareController.verifyToken)

router.get('/v1/api/courses/:courseId', courseController.getCourse)
router.get('/v1/api/courses', courseController.getListCourse)
router.post('/v1/api/courses', courseController.createCourse)

router.get('/v1/api/lectures/:courseId', lectureController.getListLecture)
router.post('/v1/api/lectures', lectureController.createLecture)
router.get('/v1/api/lecture/:lectureId', lectureController.getLecture)

router.get('/v1/api/users/:userName', userController.getUser)
router.get('/v1/api/users', userController.getListUser)
router.post('/v1/api/users', userController.createUser)

router.get('/v2/api/courses/:courseId/lectures', lectureController.getListLecture)


// router.get('/', (req, res, next) => {
//     return res.status(200).json({
//         message: 'ok api'
//     })
// })

module.exports = router