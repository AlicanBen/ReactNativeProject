import { ActionCreator } from '../../models/action';
import { simpsonApi } from '../services';

export enum COMMON_ACTION_TYPE {
  GET_SIMPSONS = '@@common/GET_SIMPSONS',
  SHOW_LOADING = '@@common/START_LOADING',
  HIDE_LOADING = '@@common/STOP_LOADING',
  ADD_STORAGE = '@@common/ADD_STORAGE',
  DELETE_STORAGE = '@@common/DELETE_STORAGE'
}

export const getSimpsons: ActionCreator = () => ({
  type    : COMMON_ACTION_TYPE.GET_SIMPSONS,
  payload : simpsonApi.getSimpsons()
});

export const showLoading: ActionCreator = (actionType, loadingText?: string) => ({
  type    : COMMON_ACTION_TYPE.SHOW_LOADING,
  payload : { actionType, loadingText }
});

export const hideLoading: ActionCreator = (actionType, processConfirmationGuard) => ({
  type    : COMMON_ACTION_TYPE.HIDE_LOADING,
  payload : { actionType, processConfirmationGuard }
});
