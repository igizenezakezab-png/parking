import { Link } from "react-router-dom";

export default function Home() {
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
          backgroundColor: "#f5f5f5",
          padding: "100px",
          borderRadius: "70px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "grey", marginBottom: "20px" }}>Parking Management System 🚗</h1>

        <img 
          src="/images/keza.png" 
          alt="Keza"
          style={{
            width: "300px",
            height: "200px",
            objectFit: "cover",
            borderRadius: "10px",
            marginBottom: "20px"
          }}
        />

        <div style={{ marginTop: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
<Link to="/car"><button style={{
            backgroundColor: "#333333",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer"
          }}>Car</button></Link>
          <Link to="/services"><button style={{
            backgroundColor: "#333333",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer"
          }}>Services</button></Link>
          <Link to="/payment"><button style={{
            backgroundColor: "#808080",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer"
          }}>Payment</button></Link>
          <Link to="/record"><button>Service Record</button></Link>
          <Link to="/reports"><button>Reports</button></Link>
        </div>
      </div>
    </div>
  );
}
