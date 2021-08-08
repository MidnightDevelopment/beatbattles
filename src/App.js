import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";


import routes from "./pages/routes";
import MainPage from "./pages/MainPage";
import Submission from "./pages/Submission";

const pages = [
  // Public pages
  {
    exact: true,
    path: routes.mainPage,
    component: MainPage,
  },
  // Authenticated pages
  {
    exact: false,
    path: routes.submit,
    component: Submission,
  }
];

const App = () => {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <Switch>
        {pages.map(
          ({ exact, path, component: Component }, index) => (
            <Route
              key={index}
              exact={exact}
              path={path}
              render={props => (
                <Component history={props.history} {...props} />
              )}
            />
          )
        )}
        <Redirect to={routes.mainPage} />
        {/* Or Uncomment below to use a custom 404 page */}
        {/* <Route component={NotFoundPage} /> */}
      </Switch>
    </Router>
  );
};

export default App;
