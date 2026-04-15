const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();

// ✅ MUST for deployment
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// ========================
// CAR
// ========================
app.get("/car", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM car");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========================
// SERVICES
// ========================
app.get("/services", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM services");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========================
// SERVICE RECORDS
// ========================
app.get("/service_records", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM service_records");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/service_records", async (req, res) => {
  try {
    const { recordNumber, serviceDate, serviceCode, plateNumber } = req.body;

    if (!recordNumber || !serviceDate || !serviceCode || !plateNumber) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const sql = `
      INSERT INTO service_records (recordNumber, serviceDate, serviceCode, plateNumber)
      VALUES (?, ?, ?, ?)
    `;

    await db.query(sql, [recordNumber, serviceDate, serviceCode, plateNumber]);

    res.json({ message: "Record added" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========================
// PAYMENTS
// ========================
app.get("/payments", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM payments");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/payments", async (req, res) => {
  try {
    const { paymentNumber, amountPaid, paymentDate, recordNumber } = req.body;

    if (!paymentNumber || !amountPaid || !paymentDate || !recordNumber) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const sql = `
      INSERT INTO payments (paymentNumber, amountPaid, paymentDate, recordNumber)
      VALUES (?, ?, ?, ?)
    `;

    await db.query(sql, [paymentNumber, amountPaid, paymentDate, recordNumber]);

    res.json({ message: "Payment added" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========================
// PORT (IMPORTANT FOR DEPLOY)
// ========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});