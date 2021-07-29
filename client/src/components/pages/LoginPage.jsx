import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { userServerLogin } from '../../actions/actions';

const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;

function LoginPage() {
  const dispatch = useDispatch();

  const onSuccess = (res) => {
    console.log(
      `Google Login successful! Welcome ${res.profileObj.name}`
    );
    dispatch(userServerLogin(res.profileObj.email));
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: {userEmail: res.profileObj.email}});
  };
  
  const onFailure = (res) => {
    dispatch({ type: 'USER_LOGIN_FAILURE'});
    console.log('[Login failed] res:', res.details);
  };
  
  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    REACT_APP_GOOGLE_CLIENT_ID,
    isSignedIn: true,
    accessType: 'offline',
  });

  const logInButton = () => {
    return (
      <div>
        <script src="https://apis.google.com/js/platform.js" async defer></script>
        <meta name="google-signin-client_id" content={`${REACT_APP_GOOGLE_CLIENT_ID}.apps.googleusercontent.com`}></meta>
        <button onClick={signIn} className="button">
          <img src="google.svg" alt="google login" className="icon"></img>
          <span className="buttonText">Continue with Google</span>
        </button>
      </div>
    );
  }

  return (
    <div className ="landing-page">
      <div className="landing-container1">
          <div className="landing-top-text">
              <br></br>
              <br></br>
              <h1 className="landing-title">Multimedia Database</h1>
              <br></br>
              <p>Keep track of what you have experienced through this web interface.</p>
              <br></br>
              <p>Just Sign In To Begin!</p>
              <br></br>
              {logInButton()}
          </div>
          <img src="media.png" alt="background" className="landing-background1"></img>
      </div>
      <div className="landing-container2">
        <div className="landing-bot-text">
        </div>
      </div>
    </div>
  );
}

export default LoginPage;