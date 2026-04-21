const express = require("express")
const cors = require("cors")
require("dotenv").config()

const studentRoutes = require("./routes/studentRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/students", studentRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

// TODO make system diagram
// sequence Diagram
// 