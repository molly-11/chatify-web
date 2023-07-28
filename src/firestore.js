import { getFirestore } from "@firebase/firestore";
import app from './firebase';

const store = getFirestore(app);

export default store;