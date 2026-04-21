const db = require("../config/db")

exports.getAllStudents = (callback) => {
    db.query("SELECT * FROM student", callback)
}

exports.getStudentById = (id, callback) => {
    db.query("SELECT * FROM student WHERE student_id = ?", [id], callback)
}

exports.createStudent = (data, callback) => {
    db.query("INSERT INTO student SET ?", data, callback)
}

exports.updateStudent = (id, data, callback) => {
    db.query("UPDATE student SET ? WHERE student_id = ?", [data, id], callback)
}

exports.patchStudent = (id, data, callback) => {
    const { first_name, last_name, email, phone } = data;
    const student_id = id
    const query = `
        UPDATE student
        SET
        first_name = COALESCE(?, first_name),
        last_name = COALESCE(?, last_name),
        email = COALESCE(?, email),
        phone = COALESCE(?, phone)
        WHERE student_id = ?
    `;
  db.query(query, [first_name, last_name, email, phone, student_id], callback)
}

exports.deleteStudent = (id, callback) => {
    db.query("DELETE FROM student WHERE student_id = ?", [id], callback)
}
