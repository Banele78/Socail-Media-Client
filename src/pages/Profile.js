import React, {useEffect, useState, useContext} from 'react'
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';

function Profile() {

    let {id}=useParams();
    const [username, setUsername] =useState("");
    const [listOfPosts, setListOfPosts] = useState([]);
    let history=useHistory();
    const {authState} =useContext(AuthContext);
  
    useEffect(()=>{
        axios.get(`https://social-media-api-b-e76829d56236.herokuapp.com/auth/basicInfo/${id}`).then((response)=>{
              setUsername(response.data.username);
        });

        axios.get(`https://social-media-api-b-e76829d56236.herokuapp.com/posts/byuserId/${id}`).then((response)=>{
            setListOfPosts(response.data);
        })
    },[])
  return (
    <div className="profilePageContainer">
   <div className='basicInfo'>
    <h1>Username:{username} </h1>
    {authState.username === username && (
        <button onClick={()=>{history.push("/changepassword")}}>Change password</button>
    )}
  
   </div>
   <div className='listOfPosts'>
   {listOfPosts.map((value, key)=>{
        return (
         <div key={key} className="post" >
          <div className="title">{value.title}</div>
          <div className="body" onClick={()=>{history.push(`/post/${value.id}`)}}>{value.postText}</div>
          <div className="footer">
          <div className='username'>  {value.username} </div>
          <div className='buttons'>
          
          <label>{value.Likes.length}</label>
          </div>
          </div>
          </div>
);
      })}


   </div>
    </div>
  )
}

export default Profile
