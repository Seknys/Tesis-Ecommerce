import { db } from "../firebase/configFirebase";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/configFirebase";
import { ref, onValue, set, push, remove } from "firebase/database";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

export const signInWithGoogle = () => {
  auth.useDeviceLanguage();
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
  // .then((result) => {
  //   // This gives you a Google Access Token. You can use it to access the Google API.
  //   const credential = GoogleAuthProvider.credentialFromResult(result);
  //   const token = credential?.accessToken;
  //   // The signed-in user info.
  //   const user = result.user;

  //   console.log("User Google", user);
  //   SaveUserToFireBase(
  //     user.uid,
  //     user.displayName,
  //     "",
  //     user.email,
  //     "client",
  //     user.photoURL
  //   ).then(() => {
  //     console.log("User saved");
  //   });

  //   // ...
  // })
  // .catch((error) => {
  //   // Handle Errors here.
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // The email of the user's account used.
  //   const email = error.customData.email;
  //   // The AuthCredential type that was used.
  //   const credential = GoogleAuthProvider.credentialFromError(error);
  //   // ...
  // });
};

export const signOutUser = () => {
  console.log("USerLog Out");
  signOut(auth);
};

export const userLogin = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

interface IRegisterWithEmail {
  email: string;
  password: string;
  name: string;
  lastName: string;
  role: string;
}
export const RegisterWithEmail = async (
  email: string,
  password: string,
  name: string,
  lastName: string,
  role: string
) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("User logged in", user.uid);
      //Save user in database
      SaveUserToFireBase(user.uid, name, lastName, email, role).then(() => {
        console.log("User saved");
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // console.log("Bak", errorCode, errorMessage);
      throw new Error(errorCode);
    });
};

export const SaveUserToFireBase = async (
  uid: string,
  name: string | null,
  lastName: string | null,
  email: string | null,
  role: string,
  image?: string | null
) => {
  // const userRef = ref(db, "users/" + uid);
  // set(userRef, {
  //   name: name,
  //   lastName: lastName,
  //   email: email,
  // }).then(() => {
  //   console.log("User saved");
  // });

  return await setDoc(doc(db, "users", uid), {
    name: name ? name : "",
    lastName: lastName ? lastName : "",
    email: email ? email : "",
    uid: uid,
    role: role,
    img: image ? image : "",
  });
};

export const getCurrentUser = (fSnapshot: (snapshot: any) => void) => {
  return onAuthStateChanged(auth, fSnapshot);
};

export const getUserByUid = (
  uid: string,
  fSnapshot: (snapshot: any) => void
) => {
  return onSnapshot(doc(db, "users", uid), fSnapshot);
};

export const sendEmailToResetPassword = (email: any) => {
  return sendPasswordResetEmail(auth, email);
};
