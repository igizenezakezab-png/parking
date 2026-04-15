import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={{ padding: "10px", backgroundColor: "#222", color: "white" }}>
      <Link to="/" style={{ marginRight: "10px", color: "white" }}>Home</Link>
      <Link to="/car" style={{ marginRight: "10px", color: "white" }}>Car</Link>
      <Link to="/services" style={{ marginRight: "10px", color: "white" }}>Services</Link>
      <Link to="/payment" style={{ marginRight: "10px", color: "white" }}>Payment</Link>
      <Link to="/record" style={{ marginRight: "10px", color: "white" }}>Record</Link>
      <Link to="/reports" style={{ color: "white" }}>Reports</Link>
    </div>
  );
}