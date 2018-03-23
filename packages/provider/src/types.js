// @flow
import * as React from "react";

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
}
