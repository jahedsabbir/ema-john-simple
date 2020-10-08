import React, { useState, useContext } from 'react';

import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFbLogin, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './loginManger';


function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn : false,
    name:'',
    email:'',
    password:'',
    photo:'',
    error:'',
    success: false
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res, true);
    })
  }

  const fbLogin = () => {
    handleFbLogin()
    .then(res => {
      handleResponse(res, true);
    })
  }
  const signOut = () => {
    handleSignOut()
    .then(res => {
      handleResponse(res, false);
    })
  }

  const handleResponse = (res, redirect ) => {
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from);
    }
  }
 
  const handleBlur = (e) => {
    
    let isFormValid = true;
    if(e.target.name === 'email'){
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
       
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordNumber = /\d{1}/.test(e.target.value);
      isFormValid =  isPasswordValid && passwordNumber;
    }
    if(isFormValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (e) => {
    if( newUser && user.email && user.password){
     createUserWithEmailAndPassword(user.name, user.email, user.password)
     .then(res => {
      handleResponse(res, true);
     })
    }
    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }
    e.preventDefault();
  }
  
  return (
    <div style={{textAlign:'center'}}>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign out</button> :
        <button onClick={googleSignIn}>Sign in</button>
      }
       <br/>
       <button onClick={fbLogin}>Log in using Facebook</button>
      

     {
       user.isSignedIn && <div>
         <p>Welcome, {user.name}</p>
         <img style={{width:'70px',borderRadius:'50%'}} src={user.photo} alt=""/>
         <p>Your Email: {user.email}</p>

       </div>
     }

     <h1>Our Own Authentication</h1>

    <input type="checkbox"  onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
    <label htmlFor="">New User Sign Up</label>

    <form onSubmit={handleSubmit}>
    {newUser && <input name="name" onBlur={handleBlur} type="text" placeholder="Your Name"/>}
      <br/>
    <input type="text" onBlur={handleBlur} name="email" placeholder="Enter Your Email" required/>
     <br/>
     <input type="password" onBlur={handleBlur} name="password" placeholder="Enter Your Password" required/>
     <br/>
     <input type="submit" value={newUser ? 'Sign up' : 'Sign in'}/>
    </form>
    <p style={{color:'red'}}> {user.error}</p>
    {user.success && <p style={{color:'green'}}>User {newUser? 'Created' : 'logged In'} Successfully</p>}
    </div>
  );
}

export default Login;