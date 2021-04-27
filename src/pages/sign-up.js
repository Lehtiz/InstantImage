import { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseConstext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase';

export default function SignUp() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseConstext);

  // Fields required for sign up
  const [username, setUsername] = useState('');
  const [fullname, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  // Basic validation on password and email fields being empty
  const isInvalid = password === '' || emailAddress === '' || username === '' || fullname === '';

  // prevent default form functionality and use our own
  // async because connection to firebase takes time
  const handleSignUp = async (event) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExist(username);
    // returns empty array if user does not exist, use length of array to determine falsehood (js falsy values)
    if (!usernameExists.length) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

        // authentication
        // -> emailAddress & password & username (displayname in authentication)
        await createdUserResult.user.updateProfile({
          displayName: username
        });

        // firebase user collection (create a document)
        await firebase.firestore().collection('users').add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullname,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          dateCreated: Date.now()
        });

        // After signing up redirect to dashboard
        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setUsername('');
        setFullName('');
        setEmailAddress('');
        setPassword('');
        setError(error.message);
      }
    } else {
      setError('That username is already taken, please try another.');
    }
  };

  // Runs on 1st render, can use brackets to run everytime given value changes
  // Change title to "Login - Instagram"
  useEffect(() => {
    document.title = 'Sign Up - Instagram';
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="iPhone with Instagram" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 rounded border border-gray-primary mb-4">
          <h1 className="flex justify-center w-full">
            <img src="/imageS/logo.png" alt="Instagram" className="mt-2 w-6/12 mb-4" />
          </h1>

          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleSignUp} method="POST">
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setFullName(target.value)}
              value={fullname}
            />
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold 
              ${isInvalid && 'opacity-50'}`}
            >
              Sign up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            Already have an account? {` `}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
