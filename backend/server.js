const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// ======================
// SERVICE RECORDS
// ======================
app.get("/service_records", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM servicerecord");
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

    await db.query(
      "INSERT INTO servicerecord (serviceDate, serviceCode, plateNumber) VALUES (?, ?, ?)",
      [serviceDate, serviceCode, plateNumber]
    );

    res.json({ message: "Record added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ======================
// PAYMENTS (FIX 404 ERROR)
// ======================
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

    await db.query(
      "INSERT INTO payments (PaymentNumber, AmountPaid, PaymentDate, RecordNumber) VALUES (?, ?, ?, ?)",
      [paymentNumber, amountPaid, paymentDate, recordNumber]
    );

    res.json({ message: "Payment saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ======================
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});