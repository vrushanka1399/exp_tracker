function Welcome() {

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
    <div style={{textAlign:"center"}}>

      <h2>Welcome to Expense Tracker</h2>

      <button onClick={verifyEmailHandler}>
        Verify Email
      </button>

    </div>
  );
}

export default Welcome;