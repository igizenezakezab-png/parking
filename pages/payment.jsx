import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const [paymentNumber, setPaymentNumber] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [recordNumber, setRecordNumber] = useState("");
  const [payments, setPayments] = useState([]);
  const [records, setRecords] = useState([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const paymentsRes = await fetch("http://localhost:5000/payments")
        .then(r => r.ok ? r.json() : [])
        .catch(() => []);

      const recordsRes = await fetch("http://localhost:5179/services")
        .then(r => r.ok ? r.json() : [])
        .catch(() => []);

      setPayments(Array.isArray(paymentsRes) ? paymentsRes : []);
      setRecords(Array.isArray(recordsRes) ? recordsRes : []);

    } catch (error) {
      console.error("Fetch error:", error);

      setPayments([]);
      setRecords([]);
    }
  };

  const handlePay = async () => {

    // ❌ CHECK SERVICE FROM LOCALSTORAGE (NEW FIX)
    const service = localStorage.getItem("selectedService");

    if (!service) {
      alert("⚠️ You must add a Service before making payment!");
      navigate("/services");
      return;
    }

    // ❌ also ensure user selected record
    if (!recordNumber) {
      alert("⚠️ Please select a Service Record first!");
      return;
    }

    if (!paymentNumber || !amountPaid || !paymentDate) {
      alert("Fill all fields!");
      return;
    }

    const newPayment = {
      PaymentNumber: paymentNumber,
      AmountPaid: amountPaid,
      PaymentDate: paymentDate,
      RecordNumber: recordNumber
    };

    setPayments(prev => [newPayment, ...prev]);

    setPaymentNumber("");
    setAmountPaid("");
    setPaymentDate("");
    setRecordNumber("");

    try {
      const response = await fetch("http://localhost:5000/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentNumber,
          amountPaid,
          paymentDate,
          recordNumber
        }),
      });

      if (response.ok) {
        console.log("Payment synced to backend");
        fetchData();
      }

    } catch (error) {
      console.log("Backend offline - payment saved locally");
    }
  };

  useEffect(() => {
    fetchData();

    // ❌ BLOCK PAGE OPEN IF NO SERVICE
    const service = localStorage.getItem("selectedService");

    if (!service) {
      alert("⚠️ Please add a Service first!");
      navigate("/services");
    }

  }, []);

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: "url('/images/payment.png')",
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
          backgroundColor: "rgba(0,0,0,0.8)",
          padding: "30px",
          borderRadius: "15px",
          width: "90%",
          maxWidth: "900px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        <h2 style={{ color: "white", textAlign: "center", marginBottom: "30px", fontSize: "2.5em" }}>
          Payment System 💰
        </h2>

        <div style={{ marginBottom: "30px" }}>

          <input
            placeholder="Payment Number (e.g. PAY001)"
            value={paymentNumber}
            onChange={(e) => setPaymentNumber(e.target.value)}
            style={{ width: "100%", padding: "15px", marginBottom: "15px", borderRadius: "8px" }}
          />

          <input
            type="number"
            placeholder="Amount Paid (RWF)"
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
            style={{ width: "100%", padding: "15px", marginBottom: "15px", borderRadius: "8px" }}
          />

          <input
            type="date"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            style={{ width: "100%", padding: "15px", marginBottom: "15px", borderRadius: "8px" }}
          />

          <select
            value={recordNumber}
            onChange={(e) => setRecordNumber(e.target.value)}
            style={{ width: "100%", padding: "15px", marginBottom: "20px", borderRadius: "8px" }}
          >
            <option value="">Select Service Record</option>
            {records.map((r, index) => (
              <option
                key={r.RecordNumber || index}
                value={r.RecordNumber || r.recordNumber}
              >
                {r.RecordNumber || r.recordNumber} - {r.PlateNumber || 'N/A'} - {r.ServiceCode || 'Service'}
              </option>
            ))}
          </select>

          <button onClick={handlePay} style={{
            width: "100%",
            padding: "18px",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "10px"
          }}>
            💳 Process Payment
          </button>

        </div>
      </div>
    </div>
  );
}