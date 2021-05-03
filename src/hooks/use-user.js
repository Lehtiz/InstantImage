import { useState, useEffect } from 'react';
import { getUserByUserId } from '../services/firebase';

export default function useUser(userId) {
  const [activeUser, setActiveUser] = useState({});

  useEffect(() => {
    async function getUserObjByUserId(userId) {
      // call a function (firebase service) that gets the user data based on the id
      const [user] = await getUserByUserId(userId);
      // Set user or empty object
      setActiveUser(user || {});
    }
    // call function only if a user id exists, otherwise rendering can be left out
    if (userId) {
      getUserObjByUserId(userId);
    }
  }, [userId]); // Should the user change, we want ot switch the user

  return { user: activeUser };
}
