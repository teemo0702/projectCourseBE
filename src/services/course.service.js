'use strict'

const courseModel = require("../models/course.model")

class CourseService {

    static getListcourse = async () => {
        try {
            const courses = await courseModel.find({}).lean()
            return {
                code: 0,
                message: 'data success',
                response: courses,
            }
        } catch (error) {
            return {
                error: error.message
            }
        }
    }

    static createCourse = async (course) => {
        const createdCourse = await courseModel.create(course)
        return {
            code: 0,
            message: 'data success',
            reponse: createdCourse,
        }
    }

    static getCourse = async (courseId) => {
        const course = await courseModel.findOne({ code: courseId }).exec()
        return {
            code: 0,
            message: 'data success',
            reponse: course,
        }
    }
}

module.exports = CourseService