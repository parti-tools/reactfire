// @flow
import {FirebaseOptions} from "../provider/types";

export type UserState =
  | { type: "loading", user: void }
  | { type: "unknown", user: void }
  | { type: "loaded", user: User };

export interface AuthProvider {}

export interface UserMetadata {
  creationTime?: string;
  lastSignInTime?: string;
}
export interface AuthCredential {
  providerId: string;
}
export interface ApplicationVerifier {
  type: string;
  verify(): Promise<any>;
}

export type ActionCodeSettings = {
  android?: {
    installApp?: boolean,
    minimumVersion?: string,
    packageName: string
  },
  handleCodeInApp?: boolean,
  iOS?: {
    bundleId: string
  },
  url: string
};

export type User = {
  delete(): Promise<any>,
  emailVerified: boolean,
  getIdToken(forceRefresh?: boolean): Promise<any>,
  getToken(forceRefresh?: boolean): Promise<any>,
  isAnonymous: boolean,
  linkAndRetrieveDataWithCredential(credential: AuthCredential): Promise<any>,
  linkWithCredential(credential: AuthCredential): Promise<any>,
  linkWithPhoneNumber(
    phoneNumber: string,
    applicationVerifier: ApplicationVerifier
  ): Promise<any>,
  linkWithPopup(provider: AuthProvider): Promise<any>,
  linkWithRedirect(provider: AuthProvider): Promise<any>,
  metadata: UserMetadata,
  phoneNumber: string | null,
  providerData: (UserInfo | null)[],
  reauthenticateAndRetrieveDataWithCredential(
    credential: AuthCredential
  ): Promise<any>,
  reauthenticateWithCredential(credential: AuthCredential): Promise<any>,
  reauthenticateWithPhoneNumber(
    phoneNumber: string,
    applicationVerifier: ApplicationVerifier
  ): Promise<any>,
  reauthenticateWithPopup(provider: AuthProvider): Promise<any>,
  reauthenticateWithRedirect(provider: AuthProvider): Promise<any>,
  refreshToken: string,
  reload(): Promise<any>,
  sendEmailVerification(
    actionCodeSettings?: ActionCodeSettings | null
  ): Promise<any>,
  toJSON(): Object,
  unlink(providerId: string): Promise<any>,
  updateEmail(newEmail: string): Promise<any>,
  updatePassword(newPassword: string): Promise<any>,
  updatePhoneNumber(phoneCredential: AuthCredential): Promise<any>,
  updateProfile(profile: {
    displayName: string | null,
    photoURL: string | null
  }): Promise<any>
} & UserInfo;

export type UserInfo = {
  displayName: string | null,
  email: string | null,
  phoneNumber: string | null,
  photoURL: string | null,
  providerId: string,
  uid: string
};

export type FirebaseAuth = {
  someval:string
}



declare type npm$parti$reactfire$FirebaseApp = {
  auth(): FirebaseAuth;
};
