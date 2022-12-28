import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/configFirebase";
import { SaveUserToFireBase } from "./auth";

export const singInWithGitHub = () => {
  auth.useDeviceLanguage();
  const provider = new GithubAuthProvider();

  return signInWithPopup(auth, provider);
};
