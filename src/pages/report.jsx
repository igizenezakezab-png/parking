import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Report() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchRecords = async () => {
    try {
      const response = await fetch("http://localhost:5000/service_records");

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();
      setRecords(data);
      setLoading(false);

    } catch (error) {
      console.error("Error fetching reports:", error);
      setRecords([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div style={{
      height: "100vh",
      backgroundColor: "#333333",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px"
    }}>
      <div style={{
        backgroundColor: "red",
        padding: "30px",
        borderRadius: "10px",
        width: "100%",
        maxWidth: "800px"
      }}>
        
        <h2>Service Records Report 📊 ({records.length})</h2>

        {loading ? (
          <p>Loading...</p>
        ) : records.length === 0 ? (
          <p>No records found</p>
        ) : (
          records.map((r, index) => (
            <div key={index} style={{
              padding: "10px",
              marginBottom: "10px",
              backgroundColor: "white",
              borderRadius: "5px"
            }}>
              <p>📄 Record: {r.recordNumber}</p>
              <p>📅 Date: {r.serviceDate}</p>
              <p>🔧 Service: {r.serviceCode}</p>
              <p>🚗 Plate: {r.plateNumber}</p>
            </div>
          ))
        )}

        <div style={{ marginTop: "20px" }}>
          <h3 onClick={() => navigate("/report")} style={{ cursor: "pointer", color: "white" }}>
            📊 Refresh Report
          </h3>
        </div>

      </div>
    </div>
  );
}