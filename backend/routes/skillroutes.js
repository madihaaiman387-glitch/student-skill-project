const express = require("express");

const router = express.Router();

// Temporary skill data
// This will later be connected to the database.
let skills = [];


// ==========================================
// GET ALL SKILLS
// GET /skill
// ==========================================

router.get("/", (req, res) => {
    res.json(skills);
});


// ==========================================
// GET SKILL BY ID
// GET /skill/:id
// ==========================================

router.get("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const skill = skills.find(s => s.id === id);

    if (!skill) {
        return res.status(404).json({
            message: "Skill not found"
        });
    }

    res.json(skill);
});


// ==========================================
// ADD A NEW SKILL
// POST /skill
// ==========================================

router.post("/", (req, res) => {

    const skill = {
        id: skills.length + 1,
        name: req.body.name,
        category: req.body.category || "General"
    };

    skills.push(skill);

    res.status(201).json({
        message: "Skill added successfully",
        skill: skill
    });
});


// ==========================================
// UPDATE A SKILL
// PUT /skill/:id
// ==========================================

router.put("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const skill = skills.find(s => s.id === id);

    if (!skill) {
        return res.status(404).json({
            message: "Skill not found"
        });
    }

    skill.name = req.body.name || skill.name;
    skill.category = req.body.category || skill.category;

    res.json({
        message: "Skill updated successfully",
        skill: skill
    });
});


// ==========================================
// DELETE A SKILL
// DELETE /skill/:id
// ==========================================

router.delete("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const skillIndex = skills.findIndex(s => s.id === id);

    if (skillIndex === -1) {
        return res.status(404).json({
            message: "Skill not found"
        });
    }

    const deletedSkill = skills.splice(skillIndex, 1);

    res.json({
        message: "Skill deleted successfully",
        skill: deletedSkill[0]
    });
});


// ==========================================
// EXPORT ROUTER
// ==========================================

module.exports = router;