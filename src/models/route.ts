import { Location } from 'history';

interface Route {
  currentPath: string;
  routes: Location[];
}

export type RouteState = Readonly<Route>;
