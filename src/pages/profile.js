import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';

export default function Profile() {
  // Use parameters to determine which profile to show, parameter username is set in routes for profile pages
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [userExists, setUserExists] = useState(false);
  const history = useHistory();

  useEffect(() => {
    async function checkUserExists() {
      const user = await getUserByUsername(username);
      if (user.length > 0) {
        setUser(user[0]);
        setUserExists(true);
      } else {
        // setUserExists(false); // already false not needed
        history.push(ROUTES.NOT_FOUND);
      }
    }

    checkUserExists();
  }, [username, history]);

  return userExists ? (
    <div className="bg-gray-background">
      <div className=" mx-auto max-w-screen-lg">{user.fullName}</div>
    </div>
  ) : null;
}
