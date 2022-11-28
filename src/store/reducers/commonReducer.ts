import { Reducer } from 'redux';
import { Action } from 'src/models/action';

import { CommonState } from '../../models/common';
import { COMMON_ACTION_TYPE } from '../actions/commonActions';

const initialState: CommonState = {
  loading          : {},
  loadingCount     : 0,
  loadingText      : '',
  requestCompleted : true
};

const reducer: Reducer<CommonState, Action> = (state: CommonState = initialState, action: Action) => {
  switch (action.type) {
    case COMMON_ACTION_TYPE.GET_SIMPSONS:
      return {
        ...state,
        simpsons: { simpsons: action.payload }
      };
    case COMMON_ACTION_TYPE.SHOW_LOADING: {
      return {
        ...state,
        loading      : { ...state.loading, [action.payload.actionType]: true },
        loadingCount : state.loadingCount + 1,
        loadingText  : action.payload.loadingText
      };
    }
    case COMMON_ACTION_TYPE.HIDE_LOADING: {
      let { loadingCount } = state;
      let payload = state;

      loadingCount--;
      payload = {
        ...state,
        loading: { ...state.loading, [action.payload.actionType]: false },
        loadingCount
      };

      return payload;
    }
    default:
      return state;
  }
};

export default reducer;
