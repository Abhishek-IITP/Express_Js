import { useState } from "react";
import "./App.css";

function App() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleSubmit() {
    try {
      let response = await fetch("http://localhost:3000/users", {
        
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      let res = await response.json();
      console.log(res);

    } catch (error) {
      console.error("Error during the request:", error);
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <div>
        <input
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
          type="text"
          placeholder="Name"
        />
        <br />
        <br />
        <input
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, email: e.target.value }))
          }
          type="email"
          placeholder="E-mail"
        />
        <br />
        <br />
        <input
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, password: e.target.value }))
          }
          type="password"
          placeholder="Password"
        />
      </div>
      <br />
      <button onClick={handleSubmit}>SignUp</button>
    </div>
  );
}

export default App;
