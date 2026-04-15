import { useState, useEffect } from "react";

export default function Car() {
  const [plate, setPlate] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [mechanicalName, setMechanicalName] = useState("");
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    try {
      const res = await fetch("http://localhost:5000/car");
      if (!res.ok) throw new Error('Backend offline');
      const data = await res.json();
      setCars(data);
    } catch (error) {
      console.error("Backend not running - page works without it:", error);
      setCars([]); // No demo cars
    }
  };

  const addCar = async () => {
    if (plate.trim() === "" || model.trim() === "" || year.trim() === "" || driverPhone.trim() === "" || mechanicalName.trim() === "") {
      alert("Please fill all fields!");
      return;
    }

    const newCar = {
      id: Date.now(),
      plate_number: plate,
      model: model,
      manufacturing_year: year,
      driver_phone: driverPhone,
      mechanical_name: mechanicalName
    };
    setCars(prev => [newCar, ...prev]);

    setPlate("");
    setModel("");
    setYear("");
    setDriverPhone("");
    setMechanicalName("");

    try {
      await fetch("http://localhost:5000/car", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plate_number: plate,
          model: model,
          manufacturing_year: year,
          driver_phone: driverPhone,
          mechanical_name: mechanicalName,
        }),
      });
      console.log("Car synced to backend");
      fetchCars();
    } catch (error) {
      console.log("Backend offline - car saved locally");
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: "url('/images/car.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "black",
          padding: "40px",
          borderRadius: "20px",
          width: "95%",
          maxWidth: "1000px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
        }}
      >
        <h2 style={{ color: "white", textAlign: "center", marginBottom: "30px", fontSize: "3em" }}>Car Management 🚗</h2>

        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px", marginBottom: "20px" }}>
            <input
              placeholder="Plate Number"
              value={plate}
              onChange={(e) => setPlate(e.target.value.toUpperCase())}
              style={{
                padding: "15px 20px",
                borderRadius: "12px",
                border: "2px solid white",
                backgroundColor: "white",
                color: "black",
                fontSize: "16px",
                fontWeight: "500"
              }}
            />
            <input
              placeholder="Model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              style={{
                padding: "15px 20px",
                borderRadius: "12px",
                border: "2px solid white",
                backgroundColor: "white",
                color: "black",
                fontSize: "16px",
                fontWeight: "500"
              }}
            />
            <input
              placeholder="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              style={{
                padding: "15px 20px",
                borderRadius: "12px",
                border: "2px solid white",
                backgroundColor: "white",
                color: "black",
                fontSize: "16px",
                fontWeight: "500"
              }}
            />
            <input
              placeholder="Driver Phone"
              value={driverPhone}
              onChange={(e) => setDriverPhone(e.target.value)}
              style={{
                padding: "15px 20px",
                borderRadius: "12px",
                border: "2px solid white",
                backgroundColor: "white",
                color: "black",
                fontSize: "16px",
                fontWeight: "500"
              }}
            />
            <input
              placeholder="Mechanical Name"
              value={mechanicalName}
              onChange={(e) => setMechanicalName(e.target.value)}
              style={{
                padding: "15px 20px",
                borderRadius: "12px",
                border: "2px solid white",
                backgroundColor: "white",
                color: "black",
                fontSize: "16px",
                fontWeight: "500"
              }}
            />
          </div>
          <button 
            onClick={addCar}
            style={{
              width: "100%",
              padding: "20px",
              backgroundColor: "#22c55e", // Green button
              color: "white",
              border: "none",
              borderRadius: "15px",
              fontSize: "20px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(34,197,94,0.4)"
            }}
          >
            Add New Car 🚗
          </button>
        </div>

        <div>
          <h3 style={{ color: "white", marginBottom: "25px", fontSize: "2em", textAlign: "center" }}>Fleet List ({cars.length})</h3>
          {cars.length === 0 ? (
            <p style={{ color: "white", textAlign: "center", fontSize: "1.5em" }}>No cars registered yet</p>
          ) : (
            cars.map((c) => (
              <div 
                key={c.id}
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  padding: "20px",
                  marginBottom: "15px",
                  borderRadius: "12px",
                  borderLeft: "5px solid #22c55e"
                }}
              >
                <div style={{ fontSize: "1.4em", fontWeight: "bold", color: "white", marginBottom: "8px" }}>
                  {c.plate_number}
                </div>
                <div style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.1em" }}>
                  Model: {c.model} | Year: {c.manufacturing_year} | Driver: {c.driver_phone} | Mechanic: {c.mechanical_name}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

