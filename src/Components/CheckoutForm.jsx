import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function CheckoutForm() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!state?.paymentIntentId) {
            navigate("/");
            return;
        }

        const interval = setTimeout(async () => {

            try {
                const res = await fetch("http://localhost:5000/api/payment/confirm-payment", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ paymentIntentId: state.paymentIntentId })
                });

                const data = await res.json();
                console.log("Polling result:", data);

                if (data.success) {
                    clearInterval(interval);
                    setLoading(false);
                    navigate("/payment-complete");
                }
            } catch (err) {
                console.error("Error polling payment:", err);
            }
        },1000)
        return () => clearInterval(interval);
    }, [state, navigate]);

    return (
        <div style={styles.container}>
            {loading ? (
                <>
                    <h2>Processing Your Payment...</h2>
                    <div className="spinner"></div>
                </>
            ) : (
                <h2>Redirecting...</h2>
            )}
        </div>
    );
}

const styles = {
    container: {
        textAlign: "center",
        marginTop: "50px"
    }
};