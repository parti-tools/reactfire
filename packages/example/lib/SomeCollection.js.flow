// @flow
import * as React from "react";

import FirebaseQueryContainer from "@parti/reactfire-data/FirebaseQueryContainer";
import type { HOC } from "../../provider";

type Props = {};

type State = {};

export default class SomeCollection extends React.PureComponent<Props, State> {
  static defaultProps = {};

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <FirebaseQueryContainer
        path={"/test"}
        transform={(id, data) => {
          return { id, value: data };
        }}
      >
        {{
          default: () => "default view",
          loading: () => "loading...",
          render: docs =><ul>
            {docs.map(d => <li key={d.id}>{d.id}</li>)}
          </ul>
        }}
      </FirebaseQueryContainer>
    );
  }
}
