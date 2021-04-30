/* eslint-disable no-nested-ternary */
import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/use-photos';

export default function Timeline() {
  // Get the logged in users photos (userContext)
  const { photos } = usePhotos();

  return (
    <div className="container col-span-2">
      {!photos ? (
        <>
          <Skeleton count={4} width={640} height={500} className="mb-5" />
        </>
      ) : photos?.length > 0 ? (
        // If we have photos render them
        photos.map((content) => <p key={content.docId}>{content.imageSrc}</p>)
      ) : (
        // if the user has no photos, tell them to create some photos
        <p className="text-center text-2xl">Follow people to see photos</p>
      )}
    </div>
  );
}
