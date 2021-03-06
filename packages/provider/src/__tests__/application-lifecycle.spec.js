// @flow
import { FirebaseProvider, FirebaseConsumer } from "../index";
import firebase from "firebase";
import * as React from "react";
import { shallow, mount, render } from "enzyme";

const REACT_APP_FB_API_KEY = process.env.REACT_APP_FB_API_KEY || "";
const REACT_APP_FB_AUTH_DOMAIN = process.env.REACT_APP_FB_AUTH_DOMAIN || "";
const REACT_APP_FB_DATABASE_URL = process.env.REACT_APP_FB_DATABASE_URL || "";
const REACT_APP_FB_PROJECT_ID = process.env.REACT_APP_FB_PROJECT_ID || "";
const REACT_APP_FB_STORAGE_BUCKET =
  process.env.REACT_APP_FB_STORAGE_BUCKET || "";
const REACT_APP_FB_MESSAGING_SENDER_ID =
  process.env.REACT_APP_FB_MESSAGING_SENDER_ID || "";

beforeEach(() => {
  return Promise.all(firebase.apps.map(app => app.delete()));
});

test("sanity -> Firebase config is defined", () => {
  expect(REACT_APP_FB_API_KEY).not.toEqual("");
  expect(REACT_APP_FB_AUTH_DOMAIN).not.toEqual("");
  expect(REACT_APP_FB_DATABASE_URL).not.toEqual("");
  expect(REACT_APP_FB_PROJECT_ID).not.toEqual("");
  expect(REACT_APP_FB_STORAGE_BUCKET).not.toEqual("");
  expect(REACT_APP_FB_MESSAGING_SENDER_ID).not.toEqual("");
});

test("sanity -> make sure than a deleted app is removed from firebase list", async () => {
  let app = firebase.initializeApp(
    {
      apiKey: REACT_APP_FB_API_KEY,
      authDomain: REACT_APP_FB_AUTH_DOMAIN,
      databaseURL: REACT_APP_FB_DATABASE_URL,
      projectId: REACT_APP_FB_PROJECT_ID,
      storageBucket: REACT_APP_FB_STORAGE_BUCKET,
      messagingSenderId: REACT_APP_FB_MESSAGING_SENDER_ID
    },
    "app1"
  );
  expect(firebase.apps).toHaveLength(1);
  await app.delete();
  expect(firebase.apps).toHaveLength(0);
});

test("make sure firebase app exists when provider is mounted", () => {
  let rendered = render(
    <FirebaseProvider
      name="testapp"
      apiKey={REACT_APP_FB_API_KEY}
      authDomain={REACT_APP_FB_AUTH_DOMAIN}
      databaseURL={REACT_APP_FB_DATABASE_URL}
      projectId={REACT_APP_FB_PROJECT_ID}
      storageBucket={REACT_APP_FB_STORAGE_BUCKET}
      messagingSenderId={REACT_APP_FB_MESSAGING_SENDER_ID}
    >
      <FirebaseConsumer>{app => <i>{app && app.name}</i>}</FirebaseConsumer>
    </FirebaseProvider>
  );
  expect(rendered.html().indexOf("testapp")).toBe(0);
});

test("app should be destroyed when unmounted", async () => {
  let rendered = mount(
    <FirebaseProvider
      name="testapp"
      apiKey={REACT_APP_FB_API_KEY}
      authDomain={REACT_APP_FB_AUTH_DOMAIN}
      databaseURL={REACT_APP_FB_DATABASE_URL}
      projectId={REACT_APP_FB_PROJECT_ID}
      storageBucket={REACT_APP_FB_STORAGE_BUCKET}
      messagingSenderId={REACT_APP_FB_MESSAGING_SENDER_ID}
    >
      <FirebaseConsumer>{app => <i>{app && app.name}</i>}</FirebaseConsumer>
    </FirebaseProvider>
  );
  rendered.unmount();
  await wait(1);
  expect(firebase.apps).toHaveLength(0);
});

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
