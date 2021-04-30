import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import useAuthListener from './hooks/use-auth-listener';
import UserContext from './context/user';
import ProtectedRoute from './helpers/protected-route';
import IsUserLoggedIn from './helpers/is-user-logged-in';

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
            <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.LOGIN}>
              <Login />
            </IsUserLoggedIn>
            <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.SIGN_UP}>
              <SignUp />
            </IsUserLoggedIn>
            <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
              <Dashboard />
            </ProtectedRoute>
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}
