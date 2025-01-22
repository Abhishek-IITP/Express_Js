import { useState } from "react";
import "./App.css";

function App() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  async function handleSubmit() {
    let response = await fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify(userData),

      headers: {
        "Content-Type": "application/json"
      },
    });
    let res = await response.json();
    alert(res.message)
    console.log(res);
  }
  

  return (
    <div>
      <h1>signUp</h1>
      <div>
        <input onChange={(e)=>setUserData(prev =>({...prev,name:e.target.value}))} type="text" placeholder="Name" />
        <br />
        <br />
        <input onChange={(e)=>setUserData(prev =>({...prev,email:e.target.value}))} type="email" placeholder="E-mail" />
        <br />
        <br />
        <input onChange={(e)=>setUserData(prev =>({...prev,password:e.target.value}))} type="password" placeholder="Password" />
      </div>
      <br />
      <button onClick={handleSubmit}>SignUp</button>
    </div>
  );
}

export default App;
