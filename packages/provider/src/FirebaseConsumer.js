// @flow
import * as React from "react";
import { firebaseContext, FIREBASE_APP_PROP_NAME } from "./firebaseContext";
import { type FirebaseApp } from "./types";
import { type HOC } from "@parti/reactfire-types";

export type { HOC, FirebaseApp };

type FirebaseConsumerProps = {
  children: (firebase: FirebaseApp) => React.Node
};

export default class FirebaseConsumer extends React.PureComponent<
  FirebaseConsumerProps
> {
  static defaultProps = {};
  static contextTypes = firebaseContext;

  render() {
    return this.props.children(this.context[FIREBASE_APP_PROP_NAME]);
  }
}
