import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Car from "./pages/car";
import Services from "./pages/services";
import Record from "./pages/record";
import Payment from "./pages/payment";
import Reports from "./pages/reports";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car" element={<Car />} />
        <Route path="/services" element={<Services />} />
        <Route path="/record" element={<Record />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/reports" element={<Reports />} />   {/* ✅ FIXED */}
      </Routes>
    </Router>
  );
}