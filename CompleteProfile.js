import { useState, useEffect } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "./firebase";

function CompleteProfile() {

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");

  const token = localStorage.getItem("token");

  // 🔁 FETCH USER DATA ON LOAD
  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBo8Pwmbti299m4tq4c--iyz2pdn5uB2S8",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        const user = data.users[0];

        // Prefill inputs
        setName(user.displayName || "");
        setPhoto(user.photoUrl || "");
      });

  }, []);

  const updateHandler = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo
      });

      alert("Profile updated!");

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Complete Profile</h2>

      <form onSubmit={updateHandler}>

        <input
          value={name}
          placeholder="Full Name"
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          value={photo}
          placeholder="Profile Photo URL"
          onChange={(e)=>setPhoto(e.target.value)}
        />

        <button>Update</button>
      </form>
    </div>
  );
}

export default CompleteProfile;