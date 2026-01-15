import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "./firebase";

function CompleteProfile() {

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");

  const updateHandler = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo
      });

      alert("Profile updated successfully!");

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Complete Profile</h2>

      <form onSubmit={updateHandler}>
        <input
          type="text"
          placeholder="Full Name"
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Profile Photo URL"
          onChange={(e)=>setPhoto(e.target.value)}
        />

        <button>Update</button>
      </form>
    </div>
  );
}

export default CompleteProfile;