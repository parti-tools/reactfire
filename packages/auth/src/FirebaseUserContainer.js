// @flow
import * as React from "react";
import {
  type HOC,
  type FirebaseApp,
  FirebaseConsumer
} from "@parti/reactfire-provider";
import { type UserState, type User } from "./types";

type Props = {
  app: FirebaseApp | null,
  children:
    | {
        default?: () => React.Node,
        loading?: () => React.Node,
        unknown?: () => React.Node,
        render: User => React.Node
      }
    | (UserState => React.Node)
};
type State = {
  user: UserState
};

class FirebaseUserContainer extends React.Component<Props, State> {
  _subscription: null | (() => void);

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState || !prevState.user) {
      return {
        user: { type: "loading", user: undefined }
      };
    }
    return null;
  }

  componentDidMount() {
    this._listenToUserChange();
  }

  componentDidUpdate(prevProps) {
    if (this.props.app !== prevProps.app) {
      this._listenToUserChange();
    }
  }

  componentWillUnmount() {
    if (this._subscription) {
      this._subscription();
    }
  }

  _listenToUserChange() {
    if (this._subscription) {
      this._subscription();
    }
    if (this.props.app) {
      this._subscription = (this.props.app: any)
        .auth()
        .onAuthStateChanged(user => {
          if (user) {
            this.setState({ user: { type: "loaded", user } });
          } else {
            this.setState({ user: { type: "unknown", user: undefined } });
          }
        });
    }
  }

  render() {
    let children = this.props.children;
    if ("function" === typeof children) {
      return children(this.state.user);
    } else {
      switch (this.state.user.type) {
        case "loading":
          return children.loading
            ? children.loading()
            : children.default ? children.default() : null;
        case "unknown":
          return children.unknown
            ? children.unknown()
            : children.default ? children.default() : null;
        case "loaded":
          return children.render(this.state.user.user);
        default:
          (this.state.user: void);
          return null;
      }
    }
  }
}

export default (props: $Diff<Props, { app: any | void }>) => (
  <FirebaseConsumer>
    {app => <FirebaseUserContainer {...props} app={app} />}
  </FirebaseConsumer>
);
