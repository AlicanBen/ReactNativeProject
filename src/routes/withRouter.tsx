import React, { ComponentType } from 'react';
import { Actions } from 'react-native-router-flux';
import { Location } from 'history';

import { setTimeout } from '../common/utils/timeoutUtil';
import { STACK } from '../common/constants/constants';

import paths from './paths';
import store from '../store/storeConfig';
import { pushLocation, popLocation } from '../store/actions/routeActions';

// eslint-disable-next-line
const push = (pathname: string, state: any) => {
  const location: Location = {
    pathname,
    state,
    search : '',
    hash   : ''
  };

  if (pathname === paths.DEFAULT) {
    Actions.reset(pathname, { location });
    STACK.length = 0;
  } else if (Actions.currentScene !== pathname) {
    Actions.push(pathname, { location });
  } else {
    return;
  }

  setTimeout(100).then(Actions.refresh);

  store.dispatch(pushLocation(location));
  STACK.push(pathname);
};

// eslint-disable-next-line
const replace = (pathname: string, state: any) => {
  const location: Location = {
    pathname,
    state,
    search : '',
    key    : '',
    hash   : ''
  };

  STACK.push(pathname);
  store.dispatch(pushLocation(location));
  Actions.replace(pathname, { location });
};

const history = {
  push,
  goBack: () => {
    Actions.pop();
    store.dispatch(popLocation());
    STACK.pop();
  },
  replace,
  entries : STACK,
  go      : (index: number) => {
    for (let i = 0; i < index; i++) {
      Actions.pop();
    }

    store.dispatch(popLocation());
  }
};

// eslint-disable-next-line
const withRouter = (Component: ComponentType<any>) => props => <Component history={history} {...props} />;

export default withRouter;
