import { signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import { auth } from "../firebase/configFirebase";
import { SaveUserToFireBase } from "./auth";

export const singInWithTwitter = () => {
  auth.useDeviceLanguage();
  const provider = new TwitterAuthProvider();

  return signInWithPopup(auth, provider);
};
