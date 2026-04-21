const studentModel = require("../models/studentModel")

exports.getStudents = (req, res) => {
    console.log("GET student called")
    studentModel.getAllStudents((err, results) => {
        if (err) return res.status(500).json(err)
        res.json(results)
    })
}

exports.getStudent = (req, res) => {
    const id = req.params.id

    studentModel.getStudentById(id, (err, results) => {
        if (err) return res.status(500).json(err)
        res.json(results)
    })
}

exports.createStudent = (req, res) => {
    const data = req.body

    studentModel.createStudent(data, (err, result) => {
        if (err) return res.status(500).json(err)
        res.json({ message: "Student created", id: result.insertId })
    })
}

exports.updateStudent = (req, res) => {
    const id = req.params.id
    const data = req.body

    studentModel.updateStudent(id, data, (err) => {
        if (err) return res.status(500).json(err)
        res.json({ message: "Student updated" })
    })
}

exports.patchStudent = (req, res) => {
    const id = req.params.id
    const data = req.body

    studentModel.patchStudent(id, data, (err) => {
        if (err) return res.status(500).json(err)
        res.json({ message: "Student updated" })
    })
}

exports.deleteStudent = (req, res) => {
    const id = req.params.id

    studentModel.deleteStudent(id, (err) => {
        if (err) return res.status(500).json(err)
        res.json({ message: "Student deleted" })
    })
}