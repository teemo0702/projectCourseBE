'use strict'

const LectureService = require("../services/lecture.service")


class LectureController {

    getListLecture = async ( req, res, next) => {
        try {
            const { courseId } = req.params
            return res.status(200).json(await LectureService.getListLecture(courseId))
        } catch (error) {
            next(error)
        }
    }

    createLecture = async ( req, res, next) => {
        try {
            if (req.user.role === 'STUDENT') {
                return res.status(401).json({
                    code: 'xxx',
                    message: 'khong duoc phep',
                })
            }
            const uploadFile = req.files.file
            const fileExt = uploadFile.name.split('.')[1]
            await uploadFile.mv(`public/${req.body.code}.${fileExt}`)
            return res.status(200).json(await LectureService.createLecture({
                ...req.body,
                courseCode: req.body.courseId,
                link: `/public/${req.body.code}.${fileExt}`,
            }))
        } catch (error) {
            next(error)
        }
    }

    getLecture = async ( req, res, next) => {
        try {
            const { lectureId } = req.params
            return res.status(200).json(await LectureService.getLecture(lectureId))
        } catch (error) {
            
        }
    }
}

module.exports = new LectureController()