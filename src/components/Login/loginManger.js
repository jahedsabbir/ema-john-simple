import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = () => {
    
  const provider = new firebase.auth.GoogleAuthProvider();
   return firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, email, photoURL} = res.user;
      const signedInUser = {
        isSignedIn:true,
        name:displayName,
        email:email,
        photo:photoURL,
        success:true
      }
      setUsertoken();
      return signedInUser;
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
     
    })
  }

  const setUsertoken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      sessionStorage.setItem('token', idToken)
    }).catch(function(error) {
      // Handle error
    });
  }

  export  const handleFbLogin = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    console.log('button clicked');
   return firebase.auth().signInWithPopup(fbProvider).then(function(result) {
     
      var token = result.credential.accessToken;
      var user = result.user;
      user.success = true;
      return user;
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  export const handleSignOut = () => {
   return firebase.auth().signOut()
    .then(res => {
      const signedOutUser={
        isSignedIn:false,
        name:'',
        email:'',
        photo:''
      }
      return signedOutUser;
    })
  }

  export const createUserWithEmailAndPassword = (name, email, password) => {
   return firebase.auth().createUserWithEmailAndPassword(email, password)

    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;

    })
    .catch(error => {
      const newUserInfo ={};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
  }

  export const signInWithEmailAndPassword = (email, password) => {
   return  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch(function(error) {
      const newUserInfo ={};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
      
    });
  }

  const updateUserName = name => { 
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function() {
      // Update successful.
    }).catch(function(error) {
      // An error happened.
    });
  }