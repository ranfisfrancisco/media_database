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
    dispatch({ type: 'USER_LOGIN_SUCCESS'});
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
      <br></br>
      <div className="landing-container1">
          <br></br>
          <div class="landing-top-text">
              <br></br>
              <br></br>
              <h1 class="landing-title">Multimedia Database</h1>
              <br></br>
              <p>Keep track of what you've experienced through this web interface.</p>
              <br></br>
              <p>Just Sign In To Begin!</p>
              {logInButton()}
          </div>
          <img src="servicebkg1.png" alt="background" className="landing-background1"></img>
      </div>
      <div className="landing-container2">
      <br></br>
        <div class="landing-bot-text">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h1>Share your thoughts with the community</h1>
          <br></br>
          <p>Post comments and let others know what you thought about the movie.</p>
          <br></br>
          <p>Add and share your favorites or create your own watchlist.</p>
        </div>
        <img src="landbkg2.png" alt="background" className="landing-background2"></img>
      </div>
    </div>
  );
}

export default LoginPage;