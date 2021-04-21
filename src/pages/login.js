import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FirebaseConstext from '../context/firebase';

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseConstext);

  // Fields required for login
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  // Basic validation on password and email fields being empty
  const isInvalid = password === '' || emailAddress === '';

  const handleLogin = () => {};

  // Runs on 1st render, can use brackets to run everytime given value changes
  // Change title to "Login - Instagram"
  useEffect(() => {
    document.title = 'Login - Instagram';
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <p>Login page</p>
    </div>
  );
}
