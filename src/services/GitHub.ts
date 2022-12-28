import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/configFirebase";
import { SaveUserToFireBase } from "./auth";

export const singInWithGitHub = () => {
  const provider = new GithubAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;

      console.log("USerGitHub", user);
      SaveUserToFireBase(
        user.uid,
        user.displayName,
        "",
        user.email,
        "client",
        user.photoURL
      ).then(() => {
        console.log("User saved");
      });

      // ...
    })
    .catch((error) => {
      // Handle Errors here.

      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;

      console.log("errorCode", errorCode);
      console.log("errorMessage", errorMessage);
      console.log("email", email);
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
      // ...
    });
};
