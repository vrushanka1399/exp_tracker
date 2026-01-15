import React from "react";

function Welcome({ onLogout }) {

  // LOGOUT
  const logoutHandler = () => {
    localStorage.removeItem("token"); // clear token
    onLogout(); // redirect to login
  };

  // VERIFY EMAIL
  const verifyEmailHandler = async () => {

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBo8Pwmbti299m4tq4c--iyz2pdn5uB2S8",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: token
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      alert("Verification email sent! Check inbox.");

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>

      {/* TOP BAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          background: "#222",
          color: "white"
        }}
      >
        <h3>Expense Tracker</h3>

        <button onClick={logoutHandler}>
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h2>Welcome to Expense Tracker</h2>

        <p style={{ color: "red" }}>
          Your email is not verified
        </p>

        <button onClick={verifyEmailHandler}>
          Verify Email
        </button>
      </div>
    </div>
  );
}

export default Welcome;