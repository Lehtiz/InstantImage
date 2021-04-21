import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import routes constants
import * as ROUTES from './constants/routes';

// lazy loading dynamically loads on request
const Login = lazy(() => import('./pages/login.js'));

function App() {
  return (
    <Router>
      {/* Suspense allows us to wait for loading and specify a loading state with fallback */}
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path={ROUTES.LOGIN} component={Login} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
