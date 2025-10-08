import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ เปิดใช้งาน CORS และ JSON parsing
app.use(cors());
app.use(express.json());

// ✅ Proxy endpoint
app.post("/", async (req, res) => {
  try {
    // URL ของ Google Apps Script
    const gsheetURL = "https://script.google.com/macros/s/AKfycbwuEom7-lqDCTsY7astx7mp39xcyakg1d9_OZj1Ur3LuazDGMFGNg8oWMhAL-NhI0dB/exec";

    // ส่งข้อมูลไปยัง Google Apps Script
    const response = await fetch(gsheetURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    // ✅ รับผลลัพธ์จาก Google Apps Script
    const data = await response.json();

    // ✅ ส่งกลับไปให้ Frontend
    res.json({
      status: data.status || "success",
      message: data.message || "บันทึกข้อมูลสำเร็จแล้ว!"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "เกิดข้อผิดพลาดในการเชื่อมต่อ proxy"
    });
  }
});

// ✅ เริ่มรันเซิร์ฟเวอร์
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
