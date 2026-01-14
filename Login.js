import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

function Login({ onLogin }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      onLogin(); // redirect

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
    </div>
  );
}

export default Login;