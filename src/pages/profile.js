import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Header from '../components/header';
import UserProfile from '../components/profile';

export default function Profile() {
  // Use parameters to determine which profile to show, parameter username is set in routes for profile pages
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    async function checkUserExists() {
      const [user] = await getUserByUsername(username);
      // Conditional here prevents accessing userId if user is undefined
      if (user?.userId) {
        setUser(user);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    }

    checkUserExists();
  }, [username, history]);

  // User doesn't exist on 1st render, insted of checking if user exists can use optional chaining here
  return user?.username ? (
    <div className="bg-gray-background">
      <Header />
      <div className=" mx-auto max-w-screen-lg">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
}
