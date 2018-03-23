// @flow
import * as React from "react";
import { type FirebaseApp } from "./types";
import FirebaseConsumer from "./FirebaseConsumer";
import { type HOC } from "@parti/reactfire-types";

export default function withFirebaseApp<Props: {}>(): HOC<
  Props,
  $Diff<Props, { firebaseApp: FirebaseApp | void }>
> {
  return function(Component: React.ComponentType<Props>) {
    return (props: $Diff<Props, { firebaseApp: FirebaseApp | void }>) => (
      <FirebaseConsumer>
        {app => <Component {...props} firebaseApp={app} />}
      </FirebaseConsumer>
    );
  };
}
