// @flow
import * as React from "react";

import { FirebaseDocumentContainer } from "@parti/reactfire-data";
import type { HOC } from "../../provider";

type Props = {};

type State = {};

export default class SomeDocument extends React.PureComponent<Props, State> {
  static defaultProps = {};

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <FirebaseDocumentContainer
        path={"/test/sample"}
        transform={(index, data) => {
          return { id: index, value: data };
        }}
      >
        {{
          default: () => "default view",
          loading: () => "loading...",
          render: doc => "value: " + JSON.stringify(doc)
        }}
      </FirebaseDocumentContainer>
    );
  }
}
