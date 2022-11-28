import { Reducer } from 'redux';
import { RouteState } from '../../models/route';
import { Action } from '../../models/action';
import { ROUTE } from '../actions/routeActions';

const initialState: RouteState = {
  routes: [
    {
      pathname : '/',
      search   : '',
      state    : undefined,
      hash     : '',
      key      : '/'
    }
  ],
  currentPath: '/'
};

const reducer: Reducer<RouteState, Action> = (state: RouteState = initialState, action: Action) => {
  switch (action.type) {
    case ROUTE.PUSH_LOCATION: {
      const currentPath = action.payload.pathname;

      return {
        ...state,
        routes: [ ...state.routes, action.payload ],
        currentPath
      };
    }
    case ROUTE.POP_LOCATION: {
      const poppedRoute = state.routes.splice(0, state.routes.length - 1);
      const poppedRouteLastIndex = poppedRoute.length - 1;

      return {
        ...state,
        routes      : poppedRoute,
        currentPath : poppedRoute[poppedRouteLastIndex].pathname
      };
    }
    default:
      return state;
  }
};

export default reducer;
