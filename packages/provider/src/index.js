// @flow
import * as React from "react";
import firebase from "@firebase/app";

const PROP_NAME = "firebaseApp";

type UnaryFn<A, R> = (a: A) => R;
export type HOC<Base, Enhanced> = UnaryFn<
  React.ComponentType<Base>,
  React.ComponentType<Enhanced>
>;

export type LoadingOptionalData<T> = T | null | "loading";

export function isLoading(data: LoadingOptionalData<*>) {
  return data === "loading";
}

export function hasNoData(data: LoadingOptionalData<*>) {
  return data === null;
}

function isFirebaseApp(props: {}, propName: string, componentName: string) {
  let propValue = props[propName];
  if (typeof propValue !== "object") {
    return new Error(
      "Invalid prop " +
        propName +
        " on component " +
        componentName +
        ". was expecting FirebaseApp"
    );
  }
  return null;
}

export const firebaseContext = {
  [PROP_NAME]: isFirebaseApp
};

export type FirebaseContext = {
  [typeof PROP_NAME]: FirebaseApp
};

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
  // auth(): $npm$firebase$auth$Auth;
  delete(): Promise<void>
};

type Props = FirebaseOptions & {
  name?: string,
  children: React.Node
};

export class FirebaseProvider extends React.PureComponent<Props> {
  static defaultProps = {};
  static childContextTypes = firebaseContext;
  app: FirebaseApp;

  constructor(props: Props) {
    super(props);
  }

  componentWillMount() {
    this.app = firebase.initializeApp(this.props, this.props.name);
  }

  componentWillUnmount() {
    this.app.delete();
  }

  getChildContext() {
    return { [PROP_NAME]: this.app };
  }

  render() {
    return this.props.children;
  }
}

type FirebaseConsumerProps = {
  children: (firebase: FirebaseApp) => React.Node
};

export class FirebaseConsumer extends React.PureComponent<
  FirebaseConsumerProps
> {
  static defaultProps = {};
  static contextTypes = firebaseContext;

  render() {
    return this.props.children(this.context[PROP_NAME]);
  }
}

export function withFirebaseApp(): HOC<
  $Diff<Props, { firebaseApp: FirebaseApp | void }>,
  Props
> {
  return function(Component: React.ComponentType<Props>) {
    return (props: $Diff<Props, { firebaseApp: FirebaseApp | void }>) => (
      <FirebaseConsumer>
        {app => <Component {...props} firebaseApp={app} />}
      </FirebaseConsumer>
    );
  };
}
