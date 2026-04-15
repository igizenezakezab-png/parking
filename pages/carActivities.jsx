import { useState } from "react";

export default function CarActivities() {
  const [car, setCar] = useState("");
  const [activities, setActivities] = useState([]);

  const addActivity = () => {
    if (car.trim() === "") return;
    setActivities([...activities, car]);
    setCar("");
  };

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
          backgroundColor: "#444444",
          padding: "30px",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "800px"
        }}
      >
        <h2 style={{ color: "white", textAlign: "center", marginBottom: "20px" }}>Car Activities 🚗</h2>

        <img 
          src="/images/keza.png" 
          alt="Car"
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "10px",
            marginBottom: "20px"
          }}
        />

        <input
          placeholder="Enter car activity"
          value={car}
          onChange={(e) => setCar(e.target.value)}
          style={{
            padding: "20px",
            color: "black",
            border: "none",
            borderRadius: "5px",
            marginBottom: "10px",
            width: "100%"
          }}
        />

        <button
          onClick={addActivity}
          style={{
            backgroundColor: "#333333",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%"
          }}
        >
          Add
        </button>

        <div style={{ marginTop: "20px", color: "white" }}>
          {activities.length === 0 ? (
            <p>No activities yet</p>
          ) : (
            activities.map((a, i) => <p key={i}>• {a}</p>)
          )}
        </div>
      </div>
    </div>
  );
}
