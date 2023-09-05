'use strict'

const CourseService = require("../services/course.service")


class CourseController {

    getListCourse = async ( req, res, next) => {
        try {
            return res.status(200).json(await CourseService.getListcourse())
        } catch (error) {
            next(error)
        }
    }

    createCourse = async ( req, res, next) => {
        try {
            if (req.user.role === 'STUDENT') {
                return res.status(401).json({
                    code: 'xxx',
                    message: 'khong duoc phep',
                })
            }
            return res.status(200).json(await CourseService.createCourse(req.body))
        } catch (error) {
            next(error)
        }
    }

    getCourse = async ( req, res, next) => {
        try {
            const { courseId } = req.params
            return res.status(200).json(await CourseService.getCourse(courseId))
        } catch (error) {
            
        }
    }
}

module.exports = new CourseController()