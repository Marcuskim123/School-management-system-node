const mysql = require("mysql2")

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "school_manager",
    port:"8888"
})

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err)
    } else {
        console.log("Connected to MySQL")
    }
})

module.exports = db