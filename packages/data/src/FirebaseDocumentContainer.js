// @flow
import * as React from "react";
import { FirebaseConsumer } from "@parti/reactfire-provider";
import type { DocumentData, DocumentSnapshot, AppWithFirestore } from "./types";
import "@firebase/firestore";

type DocumentInfo<T> = {
  fromCache: boolean,
  hasPendingWrites: boolean,
  data: T
};

export type DocumentStatus<T> =
  | { type: "loading" }
  | { type: "notFound" }
  | (DocumentInfo<T> & {
      type: "loaded"
    });

type Props<T> = {
  path: string,
  app: AppWithFirestore,
  transform: (id: string, data: DocumentData) => T,
  children:
    | {
        default?: () => React.Node,
        loading?: () => React.Node,
        unknown?: () => React.Node,
        render: T => React.Node
      }
    | ((DocumentStatus<T>) => React.Node)
};

type State<T> = {
  status: "loading" | "notFound" | "loaded",
  data?: DocumentInfo<T>
};

class FirebaseDocumentContainer<T: {}> extends React.Component<
  Props<T>,
  State<T>
> {
  _subscription: null | (() => void);

  constructor(props: Props<T>) {
    super(props);
    this.state = {
      status: "loading"
    };
    this._subscription = null;
  }

  componentDidMount() {
    this._subscribe(this.props.path);
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  componentWillReceiveProps(nextProps: Props<T>) {
    if (nextProps.path !== this.props.path) {
      this._subscribe(nextProps.path);
    }
  }

  _subscribe(refPath: ?string) {
    this._unsubscribe();
    if (!refPath) return;
    this._subscription = () => {}; // just to make sure we have some subscription
    this._subscription = this.props.app
      .firestore()
      .doc(refPath)
      .onSnapshot(this._observer);
  }

  _unsubscribe() {
    if (this._subscription) {
      this._subscription();
      this._subscription = null;
    }
  }

  _observer = (snap: DocumentSnapshot) => {
    if (!this._subscription) return;
    let data = snap.data();
    if (!snap.exists || !data) {
      this.setState({ status: "notFound" });
    } else {
      this.setState({
        status: "loaded",
        data: {
          fromCache: snap.metadata.fromCache,
          hasPendingWrites: snap.metadata.hasPendingWrites,
          data: this.props.transform(snap.id, data)
        }
      });
      snap.metadata.fromCache;
    }
  };

  render() {
    let status = this.state.status;
    let data = this.state.data;

    let children = this.props.children;
    if ("function" === typeof children) {
      switch (status) {
        case "loading":
          return children({ type: "loading" });
        case "notFound":
          return children({ type: "notFound" });
        case "loaded":
          if (data) {
            return children({ type: "loaded", ...data });
          } else {
            return children({ type: "notFound" });
          }
        default:
          (status: void);
          return children({ type: "notFound" });
      }
    } else {
      switch (status) {
        case "loading":
          return children.loading
            ? children.loading()
            : children.default ? children.default() : null;
        case "notFound":
          return children.unknown
            ? children.unknown()
            : children.default ? children.default() : null;
        case "loaded":
          if (!data) {
            return children.unknown
              ? children.unknown()
              : children.default ? children.default() : null;
          }
          return children.render(data.data);
        default:
          (status: void);
          return null;
      }
    }
  }
}

export default <T: {}>(props: $Diff<Props<T>, { app: any | void }>) => (
  <FirebaseConsumer>
    {app => (
      <FirebaseDocumentContainer
        {...props}
        app={((app: any): AppWithFirestore)}
      />
    )}
  </FirebaseConsumer>
);
