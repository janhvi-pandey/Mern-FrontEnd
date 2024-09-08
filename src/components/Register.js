import React, { useState } from 'react'
import { useNavigate } from 'react-router'

function Register() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handlechange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handlesubmit = async () => {
        const response = await fetch('https://practice-umber-xi.vercel.app/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        const data = await response.json()
        if(data.alreadyexist){
            alert( "Email already exist")
        }
        else{
            console.log(data);
            
            localStorage.setItem('token', data.token);
            navigate('/userprofile');
        }
    }

  return (
    <div>
      <div>
        <input type="text" name='name' placeholder="Name" onChange={handlechange} />
        <input type="email" name='email' placeholder="Email" onChange={handlechange} />
        <input type="password" name='password' placeholder="Password" onChange={handlechange} />
        <button onClick={handlesubmit}>Register</button>
      </div>
    </div>
  )
}

export default Register
