import React from 'react';
import { useGoogleLogin } from 'react-google-login';
require('dotenv').config();

const clientId = process.env.GOOGLE_CLIENT_ID;

function LoginPage() {
  
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    console.log(
      `Logged in successfully welcome ${res.profileObj.name} See console for full profile object.`
    );
    //prop.showPage();
    //prop.grabUserInfo(res.profileObj)
  };
  
  const onFailure = (res) => {
    console.log('[Login failed] res:', res);
  };
  
  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
    // responseType: 'code',
    // prompt: 'consent',
  });
  
  return (
    <div>
      <button onClick={signIn} className="button">
        <img src="google.svg" alt="google login" className="icon"></img>
        <span className="buttonText">Continue with Google</span>
      </button>
    </div>
  );
}

export default LoginPage;