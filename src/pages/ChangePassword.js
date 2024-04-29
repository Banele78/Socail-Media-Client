import React, {useState} from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    let history=useHistory();

    const changePassword=()=>{
        axios.put("http://localhost:3001/auth/changepassword", {
            oldPassword: oldPassword,
             newPassword:newPassword,
            },{
                headers: {
                 accessToken: localStorage.getItem("accessToken")
                },
              }
        ).then((response)=>{
            if(response.data.error){
                alert(response.data.error);
            }else{
                history.push("/");

            }
          
        });
    }
    

  return (
    <div>
    <h1> Change your password</h1> 
    <input type="text" placeholder='Old Password...' 
    onChange={(event)=>setOldPassword(event.target.value)}/>
    <input type="text" placeholder='New Password...' 
     onChange={(event)=>setNewPassword(event.target.value)}/>
    <button onClick={changePassword}>Save changes</button>
    </div>
  )
}

export default ChangePassword
