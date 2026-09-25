const express = require("express");

const studentRoutes = require("./routes/studentRoutes");
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const matchingRoutes = require("./routes/matchingRoutes");

const app = express();

app.use(express.json());

app.use("/student", studentRoutes);
app.use("/project", projectRoutes);
app.use("/skill", skillRoutes);
app.use("/match", matchingRoutes);

app.get("/", (req, res) => {
    res.send("Student Skill & Project Matching Backend is running!");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});