// @flow
import * as React from "react";

type UnaryFn<A, R> = (a: A) => R;
export type HOC<Base, Enhanced> = UnaryFn<
  React.ComponentType<Base>,
  React.ComponentType<Enhanced>
  >;
