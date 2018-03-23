// @flow
import * as React from "react";
import { firebaseContext } from "@parti/reactfire-provider";
import type { FirebaseContext } from "@parti/reactfire-provider";
import type {
  CollectionReference,
  DocumentData,
  QuerySnapshot,
  Query,
  AppWithFirestore
} from "./types";
import "@firebase/firestore";

type QueryFn = (col: CollectionReference) => Query;

type Props<T> = {
  path: string,
  transform: (id: string, data: DocumentData, index: number) => T,
  query?: QueryFn,
  compareField?: string,
  children:
    | {
        default?: () => React.Node,
        loading?: () => React.Node,
        reloading?: () => React.Node,
        unknown?: () => React.Node,
        render: Array<T> => React.Node
      }
    | ((
        | { type: "loaded", data: Array<T> }
        | { type: "loading" }
        | { type: "reloading" }
      ) => React.Node)
};

type State<T> = {
  status: "loading" | "loaded" | "reloading",
  query?: Query,
  data?: Array<T>
};

export default class FirebaseQueryContainer<T: {}> extends React.PureComponent<
  Props<T>,
  State<T>
> {
  static defaultProps = {};
  static contextTypes = firebaseContext;

  _subscription: null | (() => void);

  constructor(props: Props<T>, context: FirebaseContext) {
    super(props, context);
    let collectionReference = this._col(props.path);
    this.state = {
      status: "loading",
      query: props.query ? props.query(collectionReference) : collectionReference
    };
    this._subscription = null;
  }

  componentDidMount() {
    this._subscribe(this.state.query);
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  componentWillReceiveProps(nextProps: Props<T>) {
    let queryFn = this.props.query;
    let collectionReference = this._col(nextProps.path);
    if (queryFn) {
      let newQuery = queryFn(collectionReference);
      // TODO: check if newQuery is different than this.state.query
      this.setState({ query: newQuery });
      this._subscribe(newQuery);
    }
  }

  _subscribe(query?: Query | CollectionReference) {
    this._unsubscribe();
    if (!query) return;
    this._subscription = () => {}; // just to make sure we have some subscription
    this._subscription = query.onSnapshot(this._observer);
    this.setState(({ status }) => ({
      status: status === "loading" ? "reloading" : "loading"
    }));
  }

  _col(refPath: string): CollectionReference {
    return (this.context.firebaseApp: AppWithFirestore)
      .firestore()
      .collection(refPath);
  }

  _unsubscribe() {
    if (this._subscription) {
      this._subscription();
      this._subscription = null;
    }
  }

  _observer = (snap: QuerySnapshot) => {
    if (!this._subscription) return;
    let data = snap.docs.map((doc, index) =>
      this.props.transform(doc.id, doc.data(), index)
    );
    this.setState({
      status: "loaded",
      data
    });
  };

  render() {
    let status = this.state.status;
    let data = this.state.data;

    let children = this.props.children;
    if ("function" === typeof children) {
      switch (status) {
        case "loading":
          return children({ type: "loading" });
        case "reloading":
          return children({ type: "reloading" });
        case "loaded":
          return children({ type: "loaded", data: data || [] });
        default:
          (status: void);
          return children({ type: "loaded", data: data || [] });
      }
    } else {
      switch (status) {
        case "loading":
          return children.loading
            ? children.loading()
            : children.default ? children.default() : null;
        case "reloading":
          return children.reloading
            ? children.reloading()
            : children.default ? children.default() : null;
        case "loaded":
          if (!data) {
            return children.unknown
              ? children.unknown()
              : children.default ? children.default() : null;
          }
          return children.render(data);
        default:
          (status: void);
          return null;
      }
    }
  }
}
