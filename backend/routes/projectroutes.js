const express = require("express");

const router = express.Router();

// Temporary project data
// This will later be connected to the database.
let projects = [];


// ==========================================
// GET ALL PROJECTS
// GET /project
// ==========================================

router.get("/", (req, res) => {
    res.json(projects);
});


// ==========================================
// GET PROJECT BY ID
// GET /project/:id
// ==========================================

router.get("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const project = projects.find(p => p.id === id);

    if (!project) {
        return res.status(404).json({
            message: "Project not found"
        });
    }

    res.json(project);
});


// ==========================================
// ADD A NEW PROJECT
// POST /project
// ==========================================

router.post("/", (req, res) => {

    const project = {
        id: projects.length + 1,
        name: req.body.name,
        description: req.body.description,
        requiredSkills: req.body.requiredSkills || [],
        teamSize: req.body.teamSize || 1
    };

    projects.push(project);

    res.status(201).json({
        message: "Project added successfully",
        project: project
    });
});


// ==========================================
// UPDATE A PROJECT
// PUT /project/:id
// ==========================================

router.put("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const project = projects.find(p => p.id === id);

    if (!project) {
        return res.status(404).json({
            message: "Project not found"
        });
    }

    project.name = req.body.name || project.name;
    project.description = req.body.description || project.description;
    project.requiredSkills =
        req.body.requiredSkills || project.requiredSkills;
    project.teamSize =
        req.body.teamSize || project.teamSize;

    res.json({
        message: "Project updated successfully",
        project: project
    });
});


// ==========================================
// DELETE A PROJECT
// DELETE /project/:id
// ==========================================

router.delete("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const projectIndex = projects.findIndex(p => p.id === id);

    if (projectIndex === -1) {
        return res.status(404).json({
            message: "Project not found"
        });
    }

    const deletedProject = projects.splice(projectIndex, 1);

    res.json({
        message: "Project deleted successfully",
        project: deletedProject[0]
    });
});


// ==========================================
// EXPORT ROUTER
// ==========================================

module.exports = router;