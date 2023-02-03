// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    NextOrObserver,
    User,
    GoogleAuthProvider,
    signInWithRedirect,
    FacebookAuthProvider,
    GithubAuthProvider,
    signOut,
    getRedirectResult,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

export const createUserWithEmail = async (email: string, password: string) => {
    if (!email || !password) {
        return;
    }
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const isUserInDB = async (user: User) => {
    const { uid } = user;
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
};

export const setUserToDB = async (user: User) => {
    const { uid, displayName, email } = user;
    const existUserInDB = await isUserInDB(user);
    if (!existUserInDB) {
        await setDoc(doc(db, "users", uid), {
            displayName,
            email,
            books: [],
        });
    }
};

export const signInWithGoogle = async () => {
    await signInWithRedirect(auth, googleProvider);
};

export const signInWithFacebook = async () => {
    await signInWithRedirect(auth, facebookProvider);
};

export const signInWithGithub = async () => {
    await signInWithRedirect(auth, githubProvider);
};

export const signIn = async (email: string, password: string) => {
    if (!email || !password) {
        return;
    }
    await signInWithEmailAndPassword(auth, email, password);
};

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
    return onAuthStateChanged(auth, callback);
};

export const signOutUser = async () => {
    return await signOut(auth);
};
