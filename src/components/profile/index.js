import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Photos from './photos';
import { getUserPhotosByUsername } from '../../services/firebase';

export default function Profile({ user }) {
  // Can exist outside the function, might behave differently depending on position (garbage collection)
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {}, // object
    photosCollection: [], // array
    followerCount: 0
  };
  // dispacth allows setting of values when called
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUsername(user.username);
      dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length });
    }
    getProfileInfoAndPhotos();
  }, [user.username]);

  return (
    <>
      <Header
        photosCount={
          // Photos collection if exists input amount, else 0
          photosCollection ? photosCollection.length : 0
        }
        profile={profile}
        followerCount={followerCount /* user.followers.length */}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} />
    </>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    emailAddress: PropTypes.string,
    dateCreated: PropTypes.number.isRequired,
    following: PropTypes.array.isRequired,
    followers: PropTypes.array.isRequired,
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  }).isRequired
};
