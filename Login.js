import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import ForgotPassword from "./ForgotPassword";

function Login({ onLogin }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showReset, setShowReset] = useState(false);

  // If forgot password clicked
  if (showReset) {
    return <ForgotPassword onBack={()=>setShowReset(false)} />;
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("All fields are mandatory");
      return;
    }

    try {
      const res = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const token = await res.user.getIdToken();
      localStorage.setItem("token", token);

      onLogin();

    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>

      <form onSubmit={submitHandler}>

        <input
          type="email"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button>Login</button>
      </form>

      {/* FORGOT PASSWORD */}
      <p
        style={{color:"blue",cursor:"pointer"}}
        onClick={()=>setShowReset(true)}
      >
        Forgot Password?
      </p>
    </div>
  );
}

export default Login;