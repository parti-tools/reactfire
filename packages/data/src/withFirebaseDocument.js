// @flow
import * as React from "react";
import {
  firebaseContext,
  type FirebaseContext,
  type HOC
} from "@parti/reactfire-provider";
import type { DocumentData, DocumentSnapshot } from "./types";

export type FirebaseDocument<T> =
  | "loading"
  | "notFound"
  | {
      +hasPendingWrites: boolean,
      +fromCache: boolean,
      +data: T
    };

type ExtractReturnType = <V>(V) => V | void;

export default function withFirebaseDocument<
  Name: string,
  DocType,
  ExtraProp: {},
  ExtendedProps: ExtraProp,
  Props: $Diff<ExtendedProps, {[Name]:FirebaseDocument<DocType>}>
>({
  name,
  prop,
  path,
  transform
}: {
  name: Name,
  prop: (FirebaseDocument<DocType>) => ExtraProp,
  path: Props => string,
  transform: (id: string, data: DocumentData) => DocType
}): HOC<ExtendedProps, Props> {
  return function(
    Component: React.ComponentType<ExtendedProps>
  ): React.ComponentType<Props> {
    type State = {
      refPath: ?string,
      doc: FirebaseDocument<DocType>
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
          refPath: this._calcRefPath(props),
          doc: "loading"
        };
        this._subscription = null;
      }

      componentDidMount() {
        this._subscribe(this.state.refPath);
      }

      componentWillUnmount() {
        this._unsubscribe();
      }

      componentWillReceiveProps(nextProps) {
        let newPath = this._calcRefPath(nextProps);
        if (newPath && newPath !== this.state.refPath) {
          this.setState({ refPath: newPath });
        }
      }
      componentWillUpdate(nextProps, nextState) {
        if (nextState.refPath !== this.state.refPath) {
          this._subscribe(nextState.refPath);
        }
      }

      _subscribe(refPath: ?string) {
        this._unsubscribe();
        if (!refPath) return;
        this._subscription = () => {}; // just to make sure we have some subscription

        this._subscription = this.context.firebaseApp
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

      _calcRefPath(props: Props): ?string {
        return path(props);
      }

      _observer(snap: DocumentSnapshot) {
        if (!this._subscription) return;
        let data = snap.data();
        if (!snap.exists || !data) {
          this.setState({ doc: "notFound" });
        } else {
          this.setState({
            doc: {
              fromCache: snap.metadata.fromCache,
              hasPendingWrites: snap.metadata.hasPendingWrites,
              data: transform(snap.id, data)
            }
          });
          snap.metadata.fromCache;
        }
      }

      render() {
        let props: ExtendedProps = {
          ...this.props,
          doc: this.state.doc
        };
        return <Component {...props} />;
      }
    };
  };
}
