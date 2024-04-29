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

  const logout=()=>{
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status:false,
    });
    window.location.href = "/login";
  }
  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
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
