import { useState } from "react";

function ForgotPassword(){

 const [email,setEmail] = useState("");
 const [loading,setLoading] = useState(false);

 const resetHandler = async(e)=>{
  e.preventDefault();
  setLoading(true);

  try{
   const res = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBo8Pwmbti299m4tq4c--iyz2pdn5uB2S8",
    {
     method:"POST",
     body:JSON.stringify({
      requestType:"PASSWORD_RESET",
      email:email
     }),
     headers:{
      "Content-Type":"application/json"
     }
    }
   );

   const data = await res.json();

   if(data.error){
    throw new Error(data.error.message);
   }

   alert("Reset link sent! Check your email");
   setLoading(false);

  }catch(err){
   alert(err.message);
   setLoading(false);
  }
 }

 return(
  <div style={{textAlign:"center",marginTop:"40px"}}>

   <h2>Reset Password</h2>

   <form onSubmit={resetHandler}>
    <input
     type="email"
     placeholder="Enter your email"
     onChange={(e)=>setEmail(e.target.value)}
    />

    <button>
     {loading ? "Sending..." : "Send Link"}
    </button>
   </form>

  </div>
 )
}

export default ForgotPassword;