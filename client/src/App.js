import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Config from "./utils/default";
import Alert from "./components/layout/Alert";

// Components
import Header from "./components/Header";
import Routes from "./components/routing/Routes";

// Pages
import Home from "./pages/Home";
import AboutUS from "./pages/AboutUS";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";
import Footer from "./components/Footer";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const [uri] = useState(window.location.href.split("/"));
  const [pageInList] = useState(Config.pageInList);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div
            className={
              pageInList.includes(uri[3])
                ? "page-wrapper"
                : "page-wrapper-single"
            }
          >
            <Alert />
            {pageInList.includes(uri[3]) ? (
              <Header headerStyle="header-style-two" />
            ) : (
              ""
            )}

            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/tetang-kami" component={AboutUS} />
              <Route component={Routes} />
            </Switch>

            {pageInList.includes(uri[3]) || uri[3] === "" || uri[3] === "#!" ? (
              <Footer />
            ) : (
              (() => {
                switch (uri[3]) {
                  case "tentang-kami":
                    return <Footer />;
                  case "fitur":
                    return <Footer />;
                  case "hubungi-kami":
                    return <Footer />;
                  default:
                    return "";
                }
              })()
            )}
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
