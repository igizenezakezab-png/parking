import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Services() {
  const [servicecode, setServicecode] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [services, setServices] = useState([]);

  const navigate = useNavigate();

  const fetchServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/services");
      if (!response.ok) throw new Error("Backend not running");
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Backend error:", error);
      setServices([
        { servicecode: "S1", serviceName: "Oil Change", servicePrice: "5000" },
        { servicecode: "S2", serviceName: "Brake Check", servicePrice: "3000" },
      ]);
    }
  };

  const addService = async () => {
    if (!servicecode || !serviceName || !servicePrice) {
      alert("⚠️ Fill all fields!");
      return;
    }

    const newService = { servicecode, serviceName, servicePrice };

    setServices(prev => [newService, ...prev]);

    // ✅ SAVE SERVICE FOR NEXT STEP
    localStorage.setItem("selectedService", JSON.stringify(newService));

    setServicecode("");
    setServiceName("");
    setServicePrice("");

    try {
      await fetch("http://localhost:5000/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newService),
      });
    } catch (error) {
      console.log("Backend offline - service added locally");
    }

    // 🚀 GO TO RECORD PAGE
    navigate("/record");
  };

  useEffect(() => {
    fetchServices();

    // 🚫 BLOCK if no car selected
    const car = localStorage.getItem("selectedCar");
    if (!car) {
      alert("⚠️ Please add a car first!");
      navigate("/car");
    }
  }, []);

  return (
    <div style={{
      height: "100vh",
      backgroundImage: "url('/images/service.png')",
      backgroundSize: "cover",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <div style={{
        backgroundColor: "rgba(0,0,0,0.7)",
        padding: "30px",
        borderRadius: "10px",
        width: "90%",
        maxWidth: "800px",
      }}>
        <h2 style={{ color: "white" }}>Services 🔧</h2>

        <input placeholder="Service Code" value={servicecode}
          onChange={(e) => setServicecode(e.target.value)}
          style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
        />

        <input placeholder="Service Name" value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
        />

        <input type="number" placeholder="Service Price"
          value={servicePrice}
          onChange={(e) => setServicePrice(e.target.value)}
          style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
        />

        <button onClick={addService} style={{
          padding: "12px",
          width: "100%",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none"
        }}>
          Add Service & Continue →
        </button>

        <div style={{ marginTop: "20px" }}>
          {services.map((s) => (
            <p key={s.servicecode} style={{ color: "white" }}>
              🔧 {s.serviceName} - {s.servicePrice} RWF
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}