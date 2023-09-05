'use strict'

const lectureModel = require("../models/lecture.model")

class LectureService {

    static getListLecture = async (courseCode) => {
        try {
            const lectures = await lectureModel.find({ courseCode: courseCode }).lean()
            return {
                code: 0,
                message: 'data success',
                response: lectures,
            }
        } catch (error) {
            return {
                error: error.message
            }
        }
    }

    static createLecture = async (lecture) => {
        try {
            const createdLecture = await lectureModel.create(lecture)
            return {
                code: 0,
                message: 'data success',
                reponse: createdLecture,
            }
        } catch (error) {
            return {
                code: 0,
                message: 'error',
                response: error.message,
            }
        }
    }

    static getLecture = async (lectureCode) => {
        const lecture = await lectureModel.findOne({ code: lectureCode }).exec()
        return {
            code: 0,
            message: 'data success',
            reponse: lecture,
        }
    }
}

module.exports = LectureService