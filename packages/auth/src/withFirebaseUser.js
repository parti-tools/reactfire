// @flow
import * as React from "react";
import "@firebase/auth";
import { type HOC } from "@parti/reactfire-provider";
import { type UserState } from "./types";
import FirebaseUserContainer from "./FirebaseUserContainer";

export default function withFirebaseUser<
  ExtendedProps: {},
  Props: $Diff<ExtendedProps, { user: UserState | void }>
>(): HOC<ExtendedProps, Props> {
  return function(
    Component: React.ComponentType<ExtendedProps>
  ): React.ComponentType<Props> {
    return (props: Props) => (
      <FirebaseUserContainer>
        {user => <Component {...props} user={user} />}
      </FirebaseUserContainer>
    );
  };
}
