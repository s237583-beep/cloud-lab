const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose"); 
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(">>> Kết nối MongoDB Atlas THÀNH CÔNG! <<<");
  })
  .catch((err) => {
    console.error(">>> Lỗi kết nối MongoDB Atlas:", err);
  });
  const Student = require("./models/Student");
const PORT = process.env.PORT || 5000;
app.get("/api/hello", (req, res) => {
  res.json({
    message: "Backend is running successfully"
  });
});
//36
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//37
app.post("/api/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
//38
app.put("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//39
app.delete("/api/students/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xóa sinh viên" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});