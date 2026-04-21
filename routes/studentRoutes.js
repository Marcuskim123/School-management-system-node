const express = require("express")
const router = express.Router()

const studentController = require("../controllers/studentController")

router.get("/", studentController.getStudents)
router.get("/:id", studentController.getStudent)
router.post("/", studentController.createStudent)
router.put("/:id", studentController.updateStudent)
router.patch("/:id", studentController.patchStudent)
router.delete("/:id", studentController.deleteStudent)

module.exports = router