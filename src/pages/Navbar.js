import React from 'react'
import { AuthContext } from '../helpers/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { useContext } from 'react';

function Navbar() {
    const {authState, setAuthState} =useContext(AuthContext);
    const history = useHistory();
    const logout=()=>{
        localStorage.removeItem("accessToken");
        setAuthState({
          username: "",
          id: 0,
          status:false,
        });
       history.push("/login");
      }
  return (
   
      <div className='navbar'>
        
       
        {!authState.status ? (
          <>
           <Link to="/login">Login</Link>
        <Link to="/registration">Registration</Link>
          </>
        ) : (
          <>
           <Link to="/">Home</Link>
        <Link to="/createpost">Create a Post</Link>
          <div className='loggedInContainer'>
            <h1> {authState.username}</h1> 
          <button onClick={logout}>LogOut</button>
          
          </div>
          </>
        )}
       
        
        </div>
   
  )
}

export default Navbar
