// @flow
import * as React from "react";
import withFirebaseUser from "./withFirebaseUser";
import { type UserState } from "./types";

type Props = {
  user: UserState,
  children: UserState => React.Node
};

class FirebaseUserContainer extends React.PureComponent<Props> {
  render() {
    return this.props.children(this.props.user);
  }
}

export default withFirebaseUser()(FirebaseUserContainer);
