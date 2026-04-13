import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Report from "./pages/report";
import Home from "./pages/home";
import Car from "./pages/car";
import Services from "./pages/services";
import ServiceRecord from "./pages/serviceRecord";
import Payment from "./pages/payment";
import Record from "./pages/record";
import Reports from "./pages/reports";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car" element={<Car />} />
        <Route path="/services" element={<Services />} />
        <Route path="/service-record" element={<ServiceRecord />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/record" element={<Record />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </BrowserRouter>
  );
}
