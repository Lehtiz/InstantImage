import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getUserByUserId } from '../services/firebase';

export default function useUser() {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getUserObjByUserId() {
      // call a function (firebase service) that gets the user data based on the id
      const [response] = await getUserByUserId(user.uid);
      setActiveUser(response);
    }
    // call function only if a user id exists, otherwise rendering can be left out
    if (user?.uid) {
      getUserObjByUserId();
    }
  }, [user]); // Should the user change, we want ot switch the user

  return { user: activeUser };
}
