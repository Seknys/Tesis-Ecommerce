import { db, storage } from "../firebase/configFirebase";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { auth } from "../firebase/configFirebase";
import { onValue, set, push, remove } from "firebase/database";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { uploadBytes, ref } from "firebase/storage";

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
  return signOut(auth);
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
      //Save user in database
      SaveUserToFireBase(user.uid, name, lastName, email, role);
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

export const updateUser = async (uid: string, data: any) => {
  return await updateDoc(doc(db, "users", uid), data);
};

export const reauthenticateUserActions = async (password: any) => {
  //   const user = auth.currentUser;
  //   const cred = GoogleAuthProvider.credential(user?.email, password);
  //   return await user?.reauthenticateWithCredential(cred);

  const user: any = auth.currentUser;
  const credential = EmailAuthProvider.credential(user.email, password);
  return reauthenticateWithCredential(user, credential);
};

export const updateEmailAdress = async (email: string) => {
  const user: any = auth.currentUser;
  return await updateEmail(user, email);
};

export const updatePassService = async (password: string) => {
  const user: any = auth.currentUser;
  return await updatePassword(user, password);
};

export const uploadImageUser = async (uid: string, image: any) => {

  return await uploadBytes(
    ref(storage, "users/" + uid + "/profile.png"),
    image
  );
};

export const updateImageUser = async (uid: string, image: string) => {
  return await updateDoc(doc(db, "users", uid), { img: image });
};
