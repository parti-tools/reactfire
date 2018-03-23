// @flow
import type { FirebaseApp } from "./types";

export const FIREBASE_APP_PROP_NAME = "firebaseApp";

function isFirebaseApp(props: {}, propName: string, componentName: string) {
  let propValue = props[propName];
  if (typeof propValue !== "object") {
    return new Error(
      "Invalid prop " +
        propName +
        " on component " +
        componentName +
        ". was expecting FirebaseApp"
    );
  }
  return null;
}

export const firebaseContext = {
  [FIREBASE_APP_PROP_NAME]: isFirebaseApp
};

export type FirebaseContext = {
  firebaseApp: FirebaseApp
};
