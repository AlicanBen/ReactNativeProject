import { combineReducers } from 'redux';
import { reducer as formReducer, FormStateMap } from 'redux-form';
import { CommonState } from 'src/models/common';

import { RouteState } from '../../models/route';
import routeReducer from '../../store/reducers/routeReducer';
import commonReducer from '../../store/reducers/commonReducer';

export interface RootState {
  form: FormStateMap;
  route: RouteState;
  common: CommonState;
}

// Combine all reducers
const appReducer = combineReducers<RootState>({
  form   : formReducer,
  route  : routeReducer,
  common : commonReducer
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
