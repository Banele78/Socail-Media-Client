import React,{useEffect, useState, useContext} from 'react'
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';

function Post() {
    let {id}=useParams();
    const [postObject, setPostObject]=useState({});
    const [comments, setComments] =useState([]);
    const [newComment,setNewComment]=useState("");
    const {authState} =useContext(AuthContext);
    let history=useHistory();

    useEffect(()=>{
        axios.get(`https://social-media-api-b-e76829d56236.herokuapp.com/posts/byId/${id}`).then((response)=>{
            setPostObject(response.data);
          });

          axios.get(`https://social-media-api-b-e76829d56236.herokuapp.com/comments/${id}`).then((response)=>{
         setComments(response.data);
        });
    },[]);

    const addComment=()=>{
      axios.post(`https://social-media-api-b-e76829d56236.herokuapp.com/comments`, {
        CommentBody:newComment,
         PostId:id},{
           headers: {
            accessToken: localStorage.getItem("accessToken")
           }
         })
         .then((response)=>{
          if (response.data.error){
            console.log(response.data.error);
          }else{
            const commentToAdd={CommentBody: newComment, username: response.data.username};
            setComments([...comments, commentToAdd]);
            setNewComment("");

          }
        
       });

    };

const deleteComment= (id)=>{

  axios.delete(`https://social-media-api-b-e76829d56236.herokuapp.com/comments/${id}`, 
  {headers:{accessToken: localStorage.getItem("accessToken")}
  }).then(()=>{
   setComments(comments.filter((val)=>{
    return val.id!= id;
   })
  );
  });

};

const deletePost=(id)=>{
  axios.delete(`https://social-media-api-b-e76829d56236.herokuapp.com/posts/${id}`, 
  {headers:{accessToken: localStorage.getItem("accessToken")}
  } ).then(()=>{
   history.push("/");
  })

};

const editpost=(option)=>{
  if (option ==="title"){
     let newTitle = prompt("Enter new Title");
     axios.put(`https://social-media-api-b-e76829d56236.herokuapp.com/posts/title`, {
      newTitle: newTitle,
       id:id,
      },  {headers:{accessToken: localStorage.getItem("accessToken")}
    } 
  );

  setPostObject({...postObject, title:newTitle})

  }else{
   let newPostText= prompt("enter new Text");
   axios.put(`https://social-media-api-b-e76829d56236.herokuapp.com/posts/PostText`, {
    newText: newPostText,
     id:id,
    },  {headers:{accessToken: localStorage.getItem("accessToken")}
  } 
);
setPostObject({...postObject, postText:newPostText})
  }
}
  return (
    <div className='postPage'>
   <div className='leftSide'>
    <div className='post' id='individual'>
    <div className='title' 
    onClick={()=>{
      if (authState.username === postObject.username){
        editpost("title")
      }
      }}>
      {postObject.title}
      </div>
    <div className='body' 
    onClick={()=>{
      if (authState.username === postObject.username){
      editpost("body")
    }
    }}>
      {postObject.postText}
      </div>
    <div className='footer'>{postObject.username}
    {authState.username===postObject.username && (
    <button onClick={()=>{deletePost(postObject.id)}}>Delete post</button>)
    }
    </div>
    </div>
   </div>
   <div className='rightSide'>
    <div className='addCommentContainer'>
      <input type="text"
       placeholder='Comment...'
       value={newComment} 
       onChange={(e)=>{setNewComment(e.target.value)}}/>
    
      <button onClick={addComment} >Add Comments</button>
    </div>
    <div className='listOfComments'>
      {comments.map((comment, key)=>{

        return <div key={key} className='comment'>
            {comment.CommentBody}, 
          <label>Username: {comment.username}</label>
         {authState.username ===comment.username && (
          <button onClick={()=>{deleteComment(comment.id)}}>X</button>
        )} 
          
          </div> 

          
        
                
      })}
    </div>
   </div>


    </div>
  )
}

export default Post
