import React,{useContext, useEffect} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { AuthContext } from '../helpers/AuthContext';


// initialValues={} onSubmit={} validationSchema={}
function CreatePost() {
  let history=useHistory();
  const {authState} =useContext(AuthContext);

    const initialValues={
        title:"",
        postText:"",
      
    };

    useEffect(()=>{
      if (!localStorage.getItem("accessToken")){
        history.push("/login");
      }
    },[])

    const validationSchema=Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required(),
       
    });

    const onSubmit =(data)=>{

       axios.post("http://localhost:3001/posts", data, {headers:
       {accessToken: localStorage.getItem("accessToken")}}
      ).then((response)=>{
        history.push('/');
     
     
    });
    };

 
  return (
    <div className="createPostPage">
     <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='formContainer'>
            <label>Title: </label>
            <ErrorMessage name="title" component="span"/>
            <Field 
            id="inputCreatePost" 
            name="title"
             placeholder="(Ex.Title"
             />
               <label>Post: </label>
               <ErrorMessage name="postText" component="span"/>
            <Field 
            id="inputCreatePost" 
            name="postText"
             placeholder="(Ex.Post"
             />
             <button type="submit">Create post</button>

        </Form>

     </Formik>
    </div>
  )
}

export default CreatePost
