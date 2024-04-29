import React from 'react'
import {useState, useContext} from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { AuthContext } from '../helpers/AuthContext';




function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {setAuthState} =useContext(AuthContext);
  let history = useHistory();

  const Login = () =>{
    const data={username: username, password:password};
    axios.post("http://localhost:3001/auth/login", data ).then((response)=>{
      if(response.data.error) {
        alert(response.data.error)
      }else{
      localStorage.setItem("accessToken", response.data.token);
      setAuthState({username:response.data.username, id:response.data.id, status:true});
      history.push("/");

    };
    })
  };

  return (
    <div className='loginContainer'>
      <input 
      type="text"
      placeholder='username'
      onChange={(e)=>setUsername(e.target.value)}/>

      <input 
      type="password"
      placeholder='password'
      onChange={(e)=>setPassword(e.target.value)}/>

      <button onClick={Login}> Login </button>
    </div>
  )
}

export default Login
