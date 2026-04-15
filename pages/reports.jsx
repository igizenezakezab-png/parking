import { useState, useEffect } from "react";

export default function Reports() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

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
          backgroundColor: "white",
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
              <div key={r.id} style={{ padding: "10px", marginBottom: "10px", border: "1px solid #ddd", borderRadius: "5px" }}>
                <p>📄 {r.text}</p>
                <small>📅 {r.date}</small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
