import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import AddContainer from '../screens/add/AddContainer';
import DetailContainer from '../screens/detail/DetailContainer';
import List from '../screens/list/List';

import paths from './paths';
import withRouter from './withRouter';

const Routes = () => (
  <Router>
    <Stack key="root">
      <Scene hideNavBar initial component={withRouter(List)} key={paths.HOME} />
      <Scene hideNavBar component={withRouter(AddContainer)} key={paths.ADD} />
      <Scene hideNavBar component={withRouter(DetailContainer)} key={paths.DETAIL} />
    </Stack>
  </Router>
);

export default Routes;
