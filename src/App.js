import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import useAuthListener from './hooks/use-auth-listener';
import UserContext from './context/user';

// lazy loading dynamically loads on request (can also omit .js)
const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/sign-up'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const NotFound = lazy(() => import('./pages/not-found'));

export default function App() {
  const { user } = useAuthListener();

  return (
    // Handles user auth for the page
    <UserContext.Provider value={{ user }}>
      <Router>
        {/* Suspense allows us to wait for loading and specify a loading state with fallback */}
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
            <Route path={ROUTES.DASHBOARD} component={Dashboard} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}
