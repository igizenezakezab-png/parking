import { useState, useEffect } from "react";

export default function ServiceRecord() {
  const [recordNumber, setRecordNumber] = useState("");
  const [serviceDate, setServiceDate] = useState("");
  const [serviceCode, setServiceCode] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [services, setServices] = useState([]);
  const [cars, setCars] = useState([]);
  const [records, setRecords] = useState([]);

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
    if (!recordNumber || !serviceDate || !serviceCode || !plateNumber) return;

    try {
      await fetch("http://localhost:5000/service_records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recordNumber, serviceDate, serviceCode, plateNumber }),
      });
      setRecordNumber("");
      setServiceDate("");
      setServiceCode("");
      setPlateNumber("");
      fetchData();
    } catch (error) {
      console.error("Add record error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#fef3c7",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "800px"
        }}
      >
        <h2>Service Record 🧾</h2>

        <div style={{ marginBottom: "20px" }}>
          <div style={{ marginBottom: "10px" }}>
            <input
              placeholder="Record Number"
              value={recordNumber}
              onChange={(e) => setRecordNumber(e.target.value)}
              style={{ padding: "10px", borderRadius: "5px", border: "none", width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="date"
              value={serviceDate}
              onChange={(e) => setServiceDate(e.target.value)}
              style={{ padding: "10px", borderRadius: "5px", border: "none", width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <select value={serviceCode} onChange={(e) => setServiceCode(e.target.value)} style={{ padding: "10px", borderRadius: "5px", border: "none", width: "100%" }}>
              <option value="">Select Service</option>
              <option>Oil Change</option>
              <option>Car Wash</option>
              <option>Engine Repair</option>
              <option>Brake Repair</option>
              <option>Tire Replacement</option>
              <option>Battery Check</option>
              <option>General Service</option>
              {services.map((s) => (
                <option key={s.servicecode} value={s.servicecode}>{s.serviceName} ({s.servicePrice} RWF)</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <select value={plateNumber} onChange={(e) => setPlateNumber(e.target.value)} style={{ padding: "10px", borderRadius: "5px", border: "none", width: "100%" }}>
              <option value="">Select Plate</option>
              <option>RAB123A</option>
              <option>RAC456B</option>
              <option>RAE789C</option>
              <option>RAA111B</option>
              <option>RAD222C</option>
              {cars.map((c) => (
                <option key={c.plate_number} value={c.plate_number}>{c.plate_number} - {c.model}</option>
              ))}
            </select>
          </div>
          <div>
            <button onClick={addRecord} style={{ padding: "10px 20px", borderRadius: "5px", border: "none", backgroundColor: "#27ae60", color: "white", width: "100%" }}>
              Add Record
            </button>
          </div>
        </div>

        <div>
          {records.length === 0 ? (
            <p>No records</p>
          ) : (
            records.map((r) => (
              <div key={r.recordNumber} style={{ padding: "15px", marginBottom: "10px", border: "1px solid #ddd", borderRadius: "5px" }}>
                <p><strong>Record:</strong> {r.recordNumber}</p>
                <p><strong>Date:</strong> {r.serviceDate}</p>
                <p><strong>Service:</strong> {r.serviceName || r.serviceCode} ({r.servicePrice || ''} RWF)</p>
                <p><strong>Plate:</strong> {r.plate_number || r.plateNumber} ({r.model || ''})</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );}
