import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Report() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRecords = async () => {
    try {
      const response = await fetch("http://localhost:5000/records");
      const data = await response.json();
      setRecords(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reports:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#333333",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >
      <div
        style={{
          backgroundColor: "red",
          padding: "30px",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "800px"
        }}
      >
        <h2>Service Records Report 📊 ({records.length} total)</h2>

        {loading ? (
          <p>Loading records...</p>
        ) : records.length === 0 ? (
          <p>No records yet</p>
        ) : (
          <div>
            {records.map((r) => (
              <div key={r.id} style={{ padding: "10px", marginBottom: "10px", border: "1px solid #ddd", borderRadius: "5px", backgroundColor: "white" }}>
                <p>📄 {r.text}</p>
                <small>📅 {r.date}</small>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: "20px" }}>
          <h3 onClick={() => navigate("/daily-report")} style={{ cursor: "pointer", color: "white" }}>
            📄 Daily Services Report
          </h3>
          <h3 onClick={() => navigate("/payments")} style={{ cursor: "pointer", color: "white" }}>
            💰 Payments Summary
          </h3>
          <h3 onClick={() => navigate("/car-activities")} style={{ cursor: "pointer", color: "white" }}>
            🚗 Car Activities
          </h3>
        </div>
      </div>
    </div>
  );
}
