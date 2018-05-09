// @flow
import * as React from "react";
import "./App.css";
import { FirebaseProvider, FirebaseConsumer } from "@parti/reactfire-provider";
import { FirebaseUserContainer, type User } from "@parti/reactfire-auth";
import SomeDocument from "./SomeDocument";
import SomeCollection from "./SomeCollection";

class App extends React.Component<{}> {
  render() {
    return (
      <FirebaseProvider
        apiKey={process.env.REACT_APP_FB_API_KEY || ""}
        authDomain={process.env.REACT_APP_FB_AUTH_DOMAIN || ""}
        databaseURL={process.env.REACT_APP_FB_DATABASE_URL || ""}
        projectId={process.env.REACT_APP_FB_PROJECT_ID || ""}
        storageBucket={process.env.REACT_APP_FB_STORAGE_BUCKET || ""}
        messagingSenderId={process.env.REACT_APP_FB_MESSAGING_SENDER_ID || ""}
      >
        <div className="App">
          <h1>This is a user</h1>
          <FirebaseUserContainer>{{
            render: user => JSON.stringify(user)
          }}</FirebaseUserContainer>
        </div>
        <div>
          <h1>This is a document</h1>
          <SomeDocument>

          </SomeDocument>
        </div>
        <div>
          <h1>Collection</h1>
          <SomeCollection>
          </SomeCollection>
        </div>
        <FirebaseConsumer>{
          app => {
            let q = app
              .firestore()
              .collection("test")
            console.log(q)
            return null;
          }
        }
        </FirebaseConsumer>
      </FirebaseProvider>
    );
  }
}

export default App;
