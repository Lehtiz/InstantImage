import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(username) {
  // Connect into firebase and fetch data
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  // returns all fields from query, if any values pop up user exists
  return result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUsername(username) {
  // Check in firebase if user exists
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
}

// get user from the firestore where userId === userId (passed from the auth)
export async function getUserByUserId(userId) {
  const result = await firebase.firestore().collection('users').where('userId', '==', userId).get();
  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return user;
}

export async function getSuggestedProfiles(userId, following) {
  // Get 10 profiles (can include you own, cant filter better on firebase)
  const result = await firebase.firestore().collection('users').limit(10).get();
  // Filter out our profile and the profiles we are already following from the result
  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
}

export async function updateLoggedInUserFollowing(
  loggedInUserDocId, // Current user
  profileId, // Target profile to follow
  isFollowingProfile // Bool to check if already following to handle unfollow
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile // Update field following
        ? FieldValue.arrayRemove(profileId) // Remove following if already followed
        : FieldValue.arrayUnion(profileId) // Add following if not followed already
    });
}

export async function updateFollowedUserFollowers(
  profileDocId, // Current profile to follow
  loggedInUserDocId, // User who follows
  isFollowingProfile // Bool to check if already following to handle unfollow
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile // Update field followers
        ? FieldValue.arrayRemove(loggedInUserDocId) // Remove following if already followed
        : FieldValue.arrayUnion(loggedInUserDocId) // Add following if not followed already
    });
}

export async function getPhotos(userId, following) {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .get();

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      // Find user that the photo belongs to
      const user = await getUserByUserId(photo.userId);
      // Gets name from firebases return array
      const { username } = user[0];

      return { username, ...photo, userLikedPhoto };
    })
  );

  return photosWithUserDetails;
}

export async function getUserPhotosByUsername(username) {
  const [user] = await getUserByUsername(username);
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', '==', user.userId)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
}

export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', loggedInUserUsername) // Active logged in user
    .where('following', 'array-contains', profileUserId)
    .get();

  // Wrap in array, default to obj if no result
  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
  return response.userId;
}

export async function toggleFollow(
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileUserId,
  followingUserId
) {
  await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);

  await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
}
