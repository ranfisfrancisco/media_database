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
  
  return (
    <div>
      <script src="https://apis.google.com/js/platform.js" async defer></script>
      <meta name="google-signin-client_id" content={`${REACT_APP_GOOGLE_CLIENT_ID}.apps.googleusercontent.com`}></meta>
      <h1>Welcome!</h1>
      <button onClick={signIn} className="button">
        <img src="google.svg" alt="google login" className="icon"></img>
        <span className="buttonText">Continue with Google</span>
      </button>
    </div>
  );
}

export default LoginPage;