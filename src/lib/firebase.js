import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// here i want to import the seed file
// eslint-disable-next-line no-unused-vars
import { seedDatabase } from '../seed.js';

const config = {};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// here is where i want to call the seed file only once
// seedDatabase(firebase);

export { firebase, FieldValue };
