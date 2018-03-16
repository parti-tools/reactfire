// @flow
import * as React from "react";
import "@firebase/auth";
import {
  type HOC,
  type FirebaseContext,
  type LoadingOptionalData,
  firebaseContext
} from "@parti/reactfire-provider";
import { type UserState } from "./types";

export default function withFirebaseUser<
  ExtendedProps: { user: UserState },
  Props: $Diff<ExtendedProps, { user: UserState | void }>
>(): HOC<ExtendedProps, Props> {
  return function(
    Component: React.ComponentType<ExtendedProps>
  ): React.ComponentType<Props> {
    type State = {
      user: UserState
    };

    return class ComponentWithFirebaseDocument extends React.PureComponent<
      Props,
      State
    > {
      static defaultProps = {};
      static contextTypes = firebaseContext;

      _subscription: null | (() => void);

      constructor(props: Props, context: FirebaseContext) {
        super(props, context);
        this.state = {
          user: { type: "loading" }
        };
        this._subscription = null;
      }

      componentDidMount() {
        this._subscription = this.context.app
          .auth()
          .onAuthStateChanged(user => {
            if (user) {
              this.setState({ user: { type: "loaded", user } });
            } else {
              this.setState({ user: { type: "unknown" } });
            }
          });
      }

      componentWillUnmount() {
        if (this._subscription) {
          this._subscription();
          this._subscription = null;
        }
      }

      render() {
        let props: ExtendedProps = {
          ...this.props,
          user: this.state.user
        };
        return <Component {...props} />;
      }
    };
  };
}
