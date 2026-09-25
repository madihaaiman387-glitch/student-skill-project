const express = require("express");

const router = express.Router();

// Temporary data for testing
// Later this will come from MySQL.

let students = [
    {
        id: 1,
        name: "Madiha",
        email: "madiha@gmail.com",
        skills: [
            {
                name: "Python",
                level: 4
            },
            {
                name: "Java",
                level: 3
            },
            {
                name: "React",
                level: 2
            }
        ],
        interests: ["Web Development", "Software"]
    }
];

let projects = [
    {
        id: 1,
        name: "Student Management System",
        description: "A web application for managing student information.",
        requiredSkills: [
            {
                name: "Python",
                level: 4
            },
            {
                name: "React",
                level: 3
            },
            {
                name: "SQL",
                level: 3
            }
        ],
        domain: "Web Development",
        teamSize: 4
    },

    {
        id: 2,
        name: "AI Study Assistant",
        description: "An intelligent study assistance platform.",
        requiredSkills: [
            {
                name: "Python",
                level: 5
            },
            {
                name: "Machine Learning",
                level: 4
            }
        ],
        domain: "Artificial Intelligence",
        teamSize: 4
    }
];


// ==========================================
// CALCULATE MATCH SCORE
// ==========================================

function calculateMatchScore(student, project) {

    let totalScore = 0;
    let matchedSkills = 0;

    const requiredSkills = project.requiredSkills;

    for (const requiredSkill of requiredSkills) {

        const studentSkill = student.skills.find(
            skill =>
                skill.name.toLowerCase() ===
                requiredSkill.name.toLowerCase()
        );

        if (studentSkill) {

            matchedSkills++;

            // Maximum score for this skill
            const skillScore =
                Math.min(
                    studentSkill.level / requiredSkill.level,
                    1
                ) * 100;

            totalScore += skillScore;
        }
    }

    // Calculate percentage
    const skillCompatibility =
        requiredSkills.length > 0
            ? totalScore / requiredSkills.length
            : 0;

    // Interest compatibility
    let interestScore = 0;

    if (
        student.interests &&
        student.interests.some(
            interest =>
                interest.toLowerCase() ===
                project.domain.toLowerCase()
        )
    ) {
        interestScore = 100;
    }

    // Weighted score
    // 80% skill compatibility
    // 20% interest compatibility

    const finalScore =
        (skillCompatibility * 0.8) +
        (interestScore * 0.2);

    return {
        score: Math.round(finalScore),
        matchedSkills: matchedSkills,
        totalRequiredSkills: requiredSkills.length
    };
}


// ==========================================
// GET PROJECT RECOMMENDATIONS
// GET /match/student/:studentId
// ==========================================

router.get("/student/:studentId", (req, res) => {

    const studentId = parseInt(req.params.studentId);

    const student = students.find(
        student => student.id === studentId
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const recommendations = projects.map(project => {

        const result = calculateMatchScore(
            student,
            project
        );

        return {
            projectId: project.id,
            projectName: project.name,
            domain: project.domain,
            matchScore: result.score,
            matchedSkills: result.matchedSkills,
            totalRequiredSkills: result.totalRequiredSkills
        };
    });

    // Highest compatibility first
    recommendations.sort(
        (a, b) => b.matchScore - a.matchScore
    );

    res.json({
        student: student.name,
        recommendations: recommendations
    });
});


module.exports = router;