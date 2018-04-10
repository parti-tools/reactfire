// @flow
import * as React from "react";
import { type HOC } from "@parti/reactfire-types";
import firebase from "@firebase/app";
const { Provider, Consumer } = (React: any).createContext(null);

type ConsumerProps = {
  children: (firebase: FirebaseApp) => React.Node
};

type Props = FirebaseOptions & {
  name?: string,
  children: React.Node
};

export class FirebaseProvider extends React.Component<Props> {
  app: FirebaseApp;

  componentWillMount() {
    console.log("------ --m");
    this.app = firebase.initializeApp(this.props, this.props.name);
  }

  componentWillUnmount() {
    console.log("------ unmount");
    this.app.delete();
  }

  render() {
    return <Provider value={this.app}>{this.props.children}</Provider>;
  }
}

export const FirebaseConsumer = (props: ConsumerProps) => (
  <Consumer>{app => props.children(app)}</Consumer>
);

export type FirebaseOptions = {
  apiKey: string,
  authDomain?: string,
  databaseURL?: string,
  projectId?: string,
  storageBucket?: string,
  messagingSenderId?: string
};

export type FirebaseApp = {
  name: string,
  +options: FirebaseOptions,
  delete(): Promise<void>
};

export type { HOC };
