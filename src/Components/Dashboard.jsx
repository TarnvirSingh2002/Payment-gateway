import React, { useContext, useState } from 'react';
import { context } from "../main";
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('usd');
  const [submittedData, setSubmittedData] = useState(null);
  const { isAuthenticated, token } = useContext(context);
  const  navi=useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!amount ||  parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    console.log("amount is",amount,"   ","currency is",currency);
    try {
            const response = await fetch("http://localhost:5000/api/payment/create-payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token":token
                },body: JSON.stringify({
                    amount,
                    currency
                }),
            });

            const result = await response.json();
            console.log(result);
            navi("/checkout-form", { state: { paymentIntentId: result.paymentIntentId } });
        } catch (error) {
            console.error("Error during login:", error);
        }
    setSubmittedData({ amount, currency });
  };

  if(!isAuthenticated){
    navi('/');
  }
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Currency Dashboard</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={styles.input}
        />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          style={styles.select}
        >
          <option value="usd">USD ($)</option>
          <option value="inr">INR (₹)</option>
          <option value="eur">EUR (€)</option>
          <option value="gbp">GBP (£)</option>
        </select>
        <button type="submit" style={styles.button}>Submit</button>
      </form>

      {submittedData && (
        <div style={styles.result}>
          <h3>Submitted Data:</h3>
          <p>Amount: {submittedData.amount}</p>
          <p>Currency: {submittedData.currency}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: '#f2f2f2',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  },
  title: {
    marginBottom: '20px',
    color: '#333'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  input: {
    padding: '10px',
    fontSize: '16px'
  },
  select: {
    padding: '10px',
    fontSize: '16px'
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  },
  result: {
    marginTop: '20px',
    backgroundColor: '#e0f7fa',
    padding: '10px',
    borderRadius: '8px'
  }
};
