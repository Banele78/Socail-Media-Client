import  {BrowserRouter as Router,Route,Switch, Link} from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { AuthContext } from './helpers/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import Navbar from './pages/Navbar';


function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status:false,
  });
 

  useEffect(()=>{
    axios.get("https://social-media-api-b-e76829d56236.herokuapp.com/auth/auth", {
      headers:{
      accessToken: localStorage.getItem("accessToken"),
    }}).then((response) =>{
      if (response.data.error){
        setAuthState({
          ...authState,
          status:false,
        });
      }else{
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status:true,
        });
      }
    })

  },[]);

  
  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
        <Navbar/>
        <Switch>

          <Route path="/" exact component={Home} />
          <Route path="/createpost"  component={CreatePost} />
          <Route path="/post/:id"  component={Post} />
          <Route path="/login"  component={Login} />
          <Route path="/registration"  component={Registration} />
          <Route path="/profile/:id"  component={Profile} />
          <Route path="/changepassword"  component={ChangePassword} />
          <Route path="*" exact component={PageNotFound}/>

        </Switch>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
