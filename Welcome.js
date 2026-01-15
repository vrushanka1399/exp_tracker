import { useState } from "react";
import CompleteProfile from "./CompleteProfile";

function Welcome() {

  const [showProfile, setShowProfile] = useState(false);

  if (showProfile) {
    return <CompleteProfile />;
  }

  return (
    <div style={{textAlign:"center", marginTop:"50px"}}>
      <h2>Welcome to Expense Tracker</h2>

      <p style={{color:"red"}}>
        Your profile is incomplete
      </p>

      <button onClick={() => setShowProfile(true)}>
        Complete Profile
      </button>
    </div>
  );
}

export default Welcome;