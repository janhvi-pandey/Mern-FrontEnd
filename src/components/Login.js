import React, { useState } from "react";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handlechange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handlesubmit = async () => {
    const response = await fetch("https://practice-umber-xi.vercel.app/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    if (!data.alreadyexist) {
      alert("User not exist");
    } else {
      if (data.user === null) {
        alert("Password incorrect");
      } else {
        localStorage.setItem('token', data.token);
        navigate("/userprofile");
      }
    }
  };
  return (
    <div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handlechange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handlechange}
        />
        <button onClick={handlesubmit}>Login</button>
      </div>
    </div>
  );
}

export default Login;
