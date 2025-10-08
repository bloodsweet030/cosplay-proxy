import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// อนุญาต CORS ให้เว็บฟอร์มเข้าถึงได้
app.use(cors());
app.use(express.json());

// URL ของ Apps Script
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwuEom7-lqDCTsY7astx7mp39xcyakg1d9_OZj1Ur3LuazDGMFGNg8oWMhAL-NhI0dB/exec";

// Route สำหรับรับข้อมูลจากฟอร์ม
app.post("/submit", async (req, res) => {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const result = await response.json();
    res.json(result); // ส่งผลลัพธ์กลับไปยัง client
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Route สำหรับเช็คว่าทำงานได้
app.get("/", (req, res) => {
  res.send("Proxy ทำงานอยู่ ✅");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
