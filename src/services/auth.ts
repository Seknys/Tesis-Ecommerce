import { db } from "../firebase/configFirebase";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/configFirebase";
import { ref, onValue, set, push, remove } from "firebase/database";

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;

      console.log("Token: ", token);
      console.log("User", user);
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

export const signOutUser = () => {
  signOut(auth);
};

export const userLogin = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password)
    
};

export const RegisterWithEmail = async (
  email: string,
  password: string,
  name: string,
  lastName: string
) => {
  console.log("Params", email, password, name, lastName);
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("User logged in", user.uid);
      //Save user in database
      SaveUserToFireBase(user.uid, name, lastName, email);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Bak", errorCode, errorMessage);
      throw new Error( errorCode);
    });
};

const SaveUserToFireBase = async (
  uid: string,
  name: string,
  lastName: string,
  email: string
) => {
  const userRef = ref(db, "users/" + uid);
  set(userRef, {
    name: name,
    lastName: lastName,
    email: email,
  }).then(() => {
    console.log("User saved");
  });
};
