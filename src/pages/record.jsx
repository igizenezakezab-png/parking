import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Record() {
  const [recordNumber, setRecordNumber] = useState("");
  const [serviceDate, setServiceDate] = useState("");
  const [serviceCode, setServiceCode] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [services, setServices] = useState([]);
  const [cars, setCars] = useState([]);
  const [records, setRecords] = useState([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [servicesRes, carsRes, recordsRes] = await Promise.all([
        fetch("http://localhost:5000/services").then(r => r.json()),
        fetch("http://localhost:5000/car").then(r => r.json()),
        fetch("http://localhost:5000/service_records").then(r => r.json())
      ]);
      setServices(servicesRes);
      setCars(carsRes);
      setRecords(recordsRes);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const addRecord = async () => {
    if (!recordNumber || !serviceDate || !serviceCode || !plateNumber) {
      alert("⚠️ Fill all fields!");
      return;
    }

    const newRecord = {
      recordNumber,
      serviceDate,
      serviceCode,
      plateNumber
    };

    try {
      await fetch("http://localhost:5000/service_records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecord),
      });
    } catch (error) {
      console.error("Add record error:", error);
    }

    // ✅ SAVE RECORD FOR PAYMENT PAGE
    localStorage.setItem("selectedRecord", JSON.stringify(newRecord));

    // Clear form
    setRecordNumber("");
    setServiceDate("");
    setServiceCode("");
    setPlateNumber("");

    fetchData();

    // 🚀 GO TO PAYMENT PAGE
    navigate("/payment");
  };

  useEffect(() => {
    fetchData();

    // 🚫 BLOCK if service not selected
    const service = localStorage.getItem("selectedService");
    if (!service) {
      alert("⚠️ Please select a service first!");
      navigate("/services");
    }
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#494d4a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >
      <div
        style={{
          backgroundColor: "#333333",
          padding: "30px",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "800px"
        }}
      >
        <h2 style={{ color: "#ecf0f1", textAlign: "center", marginBottom: "20px" }}>
          Service Record 🧾
        </h2>

        {/* FORM */}
        <input
          placeholder="Record Number"
          value={recordNumber}
          onChange={(e) => setRecordNumber(e.target.value)}
          style={{ padding: "10px", marginBottom: "10px", width: "100%" }}
        />

        <input
          type="date"
          value={serviceDate}
          onChange={(e) => setServiceDate(e.target.value)}
          style={{ padding: "10px", marginBottom: "10px", width: "100%" }}
        />

        <select
          value={serviceCode}
          onChange={(e) => setServiceCode(e.target.value)}
          style={{ padding: "10px", marginBottom: "10px", width: "100%" }}
        >
          <option value="">Select Service</option>
          {services.map((s) => (
            <option key={s.servicecode} value={s.servicecode}>
              {s.serviceName} ({s.servicePrice} RWF)
            </option>
          ))}
        </select>

        <select
          value={plateNumber}
          onChange={(e) => setPlateNumber(e.target.value)}
          style={{ padding: "10px", marginBottom: "10px", width: "100%" }}
        >
          <option value="">Select Plate</option>
          {cars.map((c) => (
            <option key={c.plate_number} value={c.plate_number}>
              {c.plate_number}
            </option>
          ))}
        </select>

        <button
          onClick={addRecord}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "12px",
            width: "100%",
            border: "none",
            borderRadius: "5px"
          }}
        >
          Save Record & Continue →
        </button>

        {/* LIST */}
        <div style={{ marginTop: "20px" }}>
          {records.length === 0 ? (
            <p style={{ color: "white" }}>No records yet</p>
          ) : (
            records.map((r) => (
              <div key={r.recordNumber} style={{
                backgroundColor: "#ecf0f1",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px"
              }}>
                <p><strong>{r.recordNumber}</strong></p>
                <p>{r.serviceDate}</p>
                <p>{r.serviceCode}</p>
                <p>{r.plateNumber}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}