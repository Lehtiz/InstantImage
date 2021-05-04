/* eslint-disable no-nested-ternary */
import { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import LoggedInUserContext from '../context/logged-in-user';
import usePhotos from '../hooks/use-photos';
import Post from './post';

export default function Timeline() {
  const { user } = useContext(LoggedInUserContext);
  // Get the logged in users photos (userContext)
  const { photos } = usePhotos(user);

  return (
    <div className="container col-span-2">
      {
        // Show loading while we don't have photos or user data
        !photos && user.following === undefined ? (
          // No photo and user data skeleton
          <Skeleton count={4} width="100%" height="270%" className="mb-5" />
        ) : // User is following, and there are photos to show
        user.following !== undefined && photos && photos.length > 0 ? (
          photos.map((content) => <Post key={content.docId} content={content} />)
        ) : // User is following but there are no posts
        user.following !== undefined && photos && photos.length === 0 ? (
          <p className="text-center text-2xl">People you follow have no posts</p>
        ) : // User is not following anyone
        user && user.following.length === 0 ? (
          <p className="text-center text-2xl">Follow people to see photos</p>
        ) : (
          // fallback skeleton
          <Skeleton count={4} width="100%" height="270%" className="mb-5" />
        )
      }
    </div>
  );
}
