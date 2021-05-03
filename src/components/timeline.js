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
      {!photos ? (
        <Skeleton count={4} width={640} height={500} className="mb-5" />
      ) : photos.length > 0 ? (
        // If we have photos render them
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        // if the user has no photos, tell them to create some photos
        <p className="text-center text-2xl">Follow people to see photos</p>
      )}
    </div>
  );
}
