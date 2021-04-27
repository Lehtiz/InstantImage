import { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebase';

export default function useAuthListener() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        // After authed we can store the authUser in localStorage
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        // If no authUser clear the localStorage
        localStorage.removeItem('authUser');
        setUser(null);
      }
    });
    // do a cleanup
    return () => listener();
  }, [firebase]); // needs firebase ref here

  return { user };
}
