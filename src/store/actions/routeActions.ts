import { Action, ActionCreator } from '../../models/action';
import { Location } from 'history';

export enum ROUTE {
  PUSH_LOCATION = '@@route/PUSH_LOCATION',
  POP_LOCATION = '@@route/POP_LOCATION'
}

export const pushLocation: ActionCreator = (location: Location): Action => ({
  type    : ROUTE.PUSH_LOCATION,
  payload : location
});

export const popLocation: ActionCreator = () => ({
  type: ROUTE.POP_LOCATION
});
