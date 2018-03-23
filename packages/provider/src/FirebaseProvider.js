// @flow
import * as React from "react";
import firebase from "@firebase/app";
import { firebaseContext, FIREBASE_APP_PROP_NAME } from "./firebaseContext";
import { type FirebaseOptions, type FirebaseApp } from "./types";

type Props = FirebaseOptions & {
  name?: string,
  children: React.Node
};

export default class FirebaseProvider extends React.PureComponent<Props> {
  static defaultProps = {};
  static childContextTypes = firebaseContext;
  app: FirebaseApp;

  componentWillMount() {
    console.log("------ --m")
    this.app = firebase.initializeApp(this.props, this.props.name);
  }

  componentWillUnmount() {
    console.log("------ unmount")
    this.app.delete();
  }

  getChildContext() {
    return { [FIREBASE_APP_PROP_NAME]: this.app };
  }

  render() {
    return this.props.children;
  }
}
