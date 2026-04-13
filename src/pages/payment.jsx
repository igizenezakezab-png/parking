import { useState, useEffect } from "react";

export default function Payment() {
  const [paymentNumber, setPaymentNumber] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [recordNumber, setRecordNumber] = useState("");
  const [payments, setPayments] = useState([]);
  const [records, setRecords] = useState([]);

  const fetchData = async () => {
    try {
      const paymentsRes = await fetch("http://localhost:5000/payments")
        .then(r => r.ok ? r.json() : [])
        .catch(() => []);
      const recordsRes = await fetch("http://localhost:5000/service_records")
        .then(r => r.ok ? r.json() : [])
        .catch(() => []);
      
      setPayments(Array.isArray(paymentsRes) ? paymentsRes : []);
      setRecords(Array.isArray(recordsRes) ? recordsRes : []);
    } catch (error) {
      console.error("Fetch error:", error);
      // Demo data for offline mode
      setPayments([]);
      setRecords([
        { RecordNumber: "REC001", PlateNumber: "RAB123A", ServiceCode: "Oil Change" },
        { RecordNumber: "REC002", PlateNumber: "RAC456B", ServiceCode: "Car Wash" },
        { RecordNumber: "REC003", PlateNumber: "RAE789C", ServiceCode: "Brake Repair" },
      ]);
    }
  };

  const handlePay = async () => {
    if (!paymentNumber || !amountPaid || !paymentDate || !recordNumber) {
      alert("Fill all fields!");
      return;
    }

    // Add to local state immediately (offline support)
    const newPayment = { PaymentNumber: paymentNumber, AmountPaid: amountPaid, PaymentDate: paymentDate, RecordNumber: recordNumber };
    setPayments(prev => [newPayment, ...prev]);
    
    // Clear form
    setPaymentNumber("");
    setAmountPaid("");
    setPaymentDate("");
    setRecordNumber("");

    try {
      const response = await fetch("http://localhost:5000/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentNumber, amountPaid, paymentDate, recordNumber }),
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
        <h2 style={{ color: "white", textAlign: "center", marginBottom: "30px", fontSize: "2.5em" }}>Payment System 💰</h2>

        <div style={{ marginBottom: "30px" }}>
          <input 
            placeholder="Payment Number (e.g. PAY001)" 
            value={paymentNumber} 
            onChange={(e) => setPaymentNumber(e.target.value)}
            style={{ width: "100%", padding: "15px", marginBottom: "15px", borderRadius: "8px", border: "none", fontSize: "16px", boxShadow: "inset 0 2px 5px rgba(0,0,0,0.2)" }} 
          />
          <input 
            type="number" 
            placeholder="Amount Paid (RWF)" 
            value={amountPaid} 
            onChange={(e) => setAmountPaid(e.target.value)}
            style={{ width: "100%", padding: "15px", marginBottom: "15px", borderRadius: "8px", border: "none", fontSize: "16px", boxShadow: "inset 0 2px 5px rgba(0,0,0,0.2)" }} 
          />
          <input 
            type="date" 
            value={paymentDate} 
            onChange={(e) => setPaymentDate(e.target.value)}
            style={{ width: "100%", padding: "15px", marginBottom: "15px", borderRadius: "8px", border: "none", fontSize: "16px", boxShadow: "inset 0 2px 5px rgba(0,0,0,0.2)" }} 
          />
          <select 
            value={recordNumber} 
            onChange={(e) => setRecordNumber(e.target.value)}
            style={{ width: "100%", padding: "15px", marginBottom: "20px", borderRadius: "8px", border: "none", fontSize: "16px", backgroundColor: "#f0f0f0", boxShadow: "inset 0 2px 5px rgba(0,0,0,0.2)" }}
          >
            <option value="">Select Service Record</option>
            {records.map((r, index) => (
              <option key={r.RecordNumber || index} value={r.RecordNumber || r.recordNumber}>
                {r.RecordNumber || r.recordNumber} - {r.PlateNumber || 'N/A'} - {r.ServiceCode || r.serviceCode || 'Service'}
              </option>
            ))}
          </select>
          <button 
            onClick={handlePay} 
            style={{ 
              width: "100%", 
              padding: "18px", 
              background: "linear-gradient(45deg, #4CAF50, #45a049)", 
              color: "white", 
              border: "none", 
              borderRadius: "10px", 
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 5px 15px rgba(76, 175, 80, 0.4)",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 25px rgba(76, 175, 80, 0.6)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 5px 15px rgba(76, 175, 80, 0.4)";
            }}
          >
            💳 Process Payment
          </button>
        </div>

        <div>
          <h3 style={{ color: "#4CAF50", marginBottom: "20px", fontSize: "1.8em" }}>Recent Payments:</h3>
          {payments.length === 0 ? (
            <p style={{ color: "rgba(255,255,255,0.7)", textAlign: "center", fontSize: "1.2em" }}>No payments yet. Add one above! 💳</p>
          ) : (
            payments.map((p, index) => (
              <div key={p.PaymentNumber || p.paymentNumber || index} style={{ 
                padding: "20px", 
                marginBottom: "15px", 
                background: "rgba(255,255,255,0.1)", 
                borderRadius: "12px",
                borderLeft: "5px solid #4CAF50",
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
              }}>
                <div style={{ fontSize: "1.4em", fontWeight: "bold", color: "#4CAF50", marginBottom: "8px" }}>
                  {p.PaymentNumber || p.paymentNumber}
                </div>
                <div style={{ color: "white", fontSize: "1.2em" }}>
                  💰 {p.AmountPaid || p.amountPaid} RWF | 📅 {p.PaymentDate || p.paymentDate} | 📋 {p.RecordNumber || p.recordNumber}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

