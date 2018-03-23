// @flow
import * as React from "react";
import "@firebase/auth";
import {
  type HOC,
  type FirebaseContext,
  type FirebaseApp,
  firebaseContext,
  withFirebaseApp
} from "@parti/reactfire-provider";
import { type UserState } from "./types";

export default function withFirebaseUser<
  ExtendedProps: { },
  Props: $Diff<ExtendedProps, { user: UserState | void }>
>(): HOC<ExtendedProps, Props> {
  return function(
    Component: React.ComponentType<ExtendedProps>
  ): React.ComponentType<Props> {
    type State = {
      user: UserState
    };

    type TempProps = Props & { firebaseApp: FirebaseApp };

    class ComponentWithFirebaseDocument extends React.PureComponent<
      TempProps,
      State
    > {
      static defaultProps = {};
      static contextTypes = firebaseContext;

      _subscription: null | (() => void);

      constructor(props: TempProps, context: FirebaseContext) {
        super(props, context);
        this.state = {
          user: { type: "loading", user: undefined }
        };
        this._subscription = null;
      }

      componentDidMount() {
        this._subscription = (this.context: any).firebaseApp
          .auth()
          .onAuthStateChanged(user => {
            if (user) {
              this.setState({ user: { type: "loaded", user } });
            } else {
              this.setState({ user: { type: "unknown", user: undefined } });
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
        let { firebaseApp, ...otherProps } = this.props;
        let props: ExtendedProps = {
          ...otherProps,
          user: this.state.user
        };
        return <Component {...props} />;
      }
    }
    return withFirebaseApp()(ComponentWithFirebaseDocument);
  };
}
