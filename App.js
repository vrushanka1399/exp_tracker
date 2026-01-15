import { useState } from "react";
import Login from "./Login";
import Welcome from "./Welcome";

function App() {

  const [isLogged, setIsLogged] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <>
      {isLogged 
        ? <Welcome onLogout={()=>setIsLogged(false)} /> 
        : <Login onLogin={()=>setIsLogged(true)} />
      }
    </>
  );
}

export default App;
