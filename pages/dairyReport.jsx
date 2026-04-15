import { useState } from "react";

export default function DailyReport() {
  const [service, setService] = useState("");
  const [records, setRecords] = useState([]);

  const addRecord = () => {
    if (service.trim() === "") return;

    setRecords([...records, service]);
    setService("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Daily Services Report 📄</h2>

      <input
        placeholder="Enter service"
        value={service}
        onChange={(e) => setService(e.target.value)}
      />

      <button onClick={addRecord}>Add</button>

      <div>
        {records.map((r, i) => (
          <p key={i}>🧾 {r}</p>
        ))}
      </div>
    </div>
  );
}