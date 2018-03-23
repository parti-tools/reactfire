// @flow
import * as React from "react";
import withFirebaseUser from "./withFirebaseUser";
import { type UserState, type User } from "./types";

type Props = {
  user: UserState,
  children:
    | {
        default?: () => React.Node,
        loading?: () => React.Node,
        unknown?: () => React.Node,
        render: User => React.Node
      }
    | (UserState => React.Node)
};

class FirebaseUserContainer extends React.PureComponent<Props> {
  render() {
    let children = this.props.children;
    if ("function" === typeof children) {
      return children(this.props.user);
    } else {
      switch (this.props.user.type) {
        case "loading":
          return children.loading
            ? children.loading()
            : children.default ? children.default() : null;
        case "unknown":
          return children.unknown
            ? children.unknown()
            : children.default ? children.default() : null;
        case "loaded":
          return children.render(this.props.user.user);
        default:
          (this.props.user: void);
          return null;
      }
    }
  }
}

export default withFirebaseUser()(FirebaseUserContainer);
