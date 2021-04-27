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
