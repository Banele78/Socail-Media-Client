import React, {useContext} from 'react'
import {useEffect, useState} from "react";
import axios from "axios";
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { AuthContext } from '../helpers/AuthContext';


function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    let history=useHistory();
    const [likedPosts, setLikedPosts] = useState([]);
    const {authState} =useContext(AuthContext);
  

  useEffect(()=>{

    if (!localStorage.getItem("accessToken")){
       history.push("/login");
    }else{
    axios.get("https://social-media-api-b-e76829d56236.herokuapp.com/posts", {headers:
    {accessToken: localStorage.getItem("accessToken")}
  }).then((response)=>{
     
      setListOfPosts(response.data.listOfPosts);
    
        setLikedPosts(response.data.likedPosts.map((like)=>{
          return like.PostId
        })
      );
      
    
      // setResponseJson(JSON.stringify(response.data, null, 2));

    });
  };
  },[]);
  

  const likeAPost =(postId)=>{
    axios.post("https://social-media-api-b-e76829d56236.herokuapp.com/likes", {PostId: postId}, 
    {headers:
      {accessToken: localStorage.getItem("accessToken")}
    }
    
    ).then((response)=>{
     
      setListOfPosts(listOfPosts.map((post)=>{
        if(post.id === postId){
          if(response.data.Liked){
           
            return {...post, Likes: [...post.Likes, 0]};
            
          }else{
            const likesArray=post.Likes;
            likesArray.pop()
          
            return {...post, Likes: likesArray};
          }
         

        }else{
          return post
        }
      })
    );

    if (likedPosts.includes(postId)){
      setLikedPosts(likedPosts.filter((id)=>{
        return id !=postId;
      })
    );

    }else{
      setLikedPosts([...likedPosts,postId]);
    }


    });

  }
  
  return (
    <div>
       {listOfPosts.map((value, key)=>{
        return (
         <div key={key} className="post" >
          <div className="title">{value.title}</div>
          <div className="body" onClick={()=>{history.push(`/post/${value.id}`)}}>{value.postText}</div>
          <div className="footer">
          <div className='username'> <Link to={`/profile/${value.UserId}`}> {value.username}</Link> </div>
          <div className='buttons'>
          <ThumbUpAltIcon 
          onClick={()=>{likeAPost(value.id)}}
           className={likedPosts.includes(value.id) ? "unlikePostBttn" : "likeBttn"}/>
          <label>{value.Likes.length}</label>
          </div>
          </div>
          </div>
);
      })}
    </div>
  )
}

export default Home
