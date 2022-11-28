/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionCreator as ReduxActionCreator } from 'redux';

export interface StandardAction<Payload, Meta = undefined> {
  type: string;
  payload?: Payload;
  error?: boolean;
  meta?: Meta;
}

type Payload = Promise<any> | any;
type Meta = any;

export interface Action extends StandardAction<Payload, Meta> {
  warning?: any;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ActionCreator extends ReduxActionCreator<Action> {}
