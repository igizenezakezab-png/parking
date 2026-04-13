import { useState, useEffect } from "react";

export default function Services() {
  const [servicecode, setServicecode] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/services");
      if (!response.ok) throw new Error("Backend not running");
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Backend error:", error);
      // demo data so page still shows
      setServices([
        { servicecode: "S1", serviceName: "Oil Change", servicePrice: "5000" },
        { servicecode: "S2", serviceName: "Brake Check", servicePrice: "3000" },
      ]);
    }
  };

  const addService = async () => {
    if (!servicecode || !serviceName || !servicePrice) return;

    // Add locally when backend offline (demo mode)
    const newService = { servicecode, serviceName, servicePrice };
    setServices(prev => [newService, ...prev]);

    setServicecode("");
    setServiceName("");
    setServicePrice("");

    try {
      await fetch("http://localhost:5000/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ servicecode, serviceName, servicePrice }),
      });
      fetchServices();
    } catch (error) {
      console.log("Backend offline - service added locally");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: "url('/images/service.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.7)",
          padding: "30px",
          borderRadius: "10px",
          width: "90%",
          maxWidth: "800px",
        }}
      >
        <h2 style={{ color: "white" }}>Services 🔧</h2>

        <div style={{ marginBottom: "20px" }}>
          <input
            placeholder="Service Code"
            value={servicecode}
            onChange={(e) => setServicecode(e.target.value)}
            style={{ padding: "10px", width: "70%", marginBottom: "10px", borderRadius: "5px" }}
          />

          <input
            placeholder="Service Name"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            style={{ padding: "10px", width: "70%", marginBottom: "10px", borderRadius: "5px" }}
          />

          <input
            type="number"
            placeholder="Service Price (RWF)"
            value={servicePrice}
            onChange={(e) => setServicePrice(e.target.value)}
            style={{ padding: "10px", width: "70%", marginBottom: "10px", borderRadius: "5px" }}
          />

          <button
            onClick={addService}
            style={{
              padding: "10px 20px",
              width: "70%",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add Service
          </button>
        </div>

        <div>
          {services.length === 0 ? (
            <p style={{ color: "white", textAlign: "center" }}>No services available</p>
          ) : (
            services.map((s) => (
              <p
                key={s.servicecode}
                style={{ 
                  color: "white", 
                  padding: "12px",
                  borderBottom: "1px solid #444",
                  marginBottom: "5px",
                  borderRadius: "4px",
                  backgroundColor: "rgba(255,255,255,0.1)"
                }}
              >
                🔧 {s.servicecode} - {s.serviceName} - {s.servicePrice} RWF
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
