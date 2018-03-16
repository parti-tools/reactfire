// @flow
import * as React from "react";
import "./App.css";
import { FirebaseProvider } from "@parti/reactfire-provider";
import { FirebaseUserContainer, type User } from "@parti/reactfire-auth";

class App extends React.Component<{}> {
  render() {
    return (
      <FirebaseProvider

      >
        <div className="App">
          <header className="App-header" />
          <FirebaseUserContainer>
            {({ type, user }) => {
              if (type === "loaded") {
                return JSON.stringify(user);
              }
            }}
          </FirebaseUserContainer>
        </div>
      </FirebaseProvider>
    );
  }
}

export default App;
