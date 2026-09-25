const express = require("express");

const router = express.Router();

// Temporary student data
// This will later be replaced with your friend's database.
let students = [];

// ==========================================
// GET ALL STUDENTS
// GET /student
// ==========================================

router.get("/", (req, res) => {
    res.json(students);
});


// ==========================================
// GET STUDENT BY ID
// GET /student/:id
// ==========================================

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);
});


// ==========================================
// ADD A NEW STUDENT
// POST /student
// ==========================================

router.post("/", (req, res) => {

    const student = {
        id: students.length + 1,
        name: req.body.name,
        email: req.body.email,
        skills: req.body.skills || []
    };

    students.push(student);

    res.status(201).json({
        message: "Student added successfully",
        student: student
    });
});


// ==========================================
// UPDATE A STUDENT
// PUT /student/:id
// ==========================================

router.put("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    // Update only the fields provided
    student.name = req.body.name || student.name;
    student.email = req.body.email || student.email;
    student.skills = req.body.skills || student.skills;

    res.json({
        message: "Student updated successfully",
        student: student
    });
});


// ==========================================
// DELETE A STUDENT
// DELETE /student/:id
// ==========================================

router.delete("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const studentIndex = students.findIndex(s => s.id === id);

    if (studentIndex === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(studentIndex, 1);

    res.json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });
});


// ==========================================
// EXPORT ROUTER
// ==========================================

module.exports = router;