import React from "react";
import { Route, Switch } from "react-router-dom";
import AboutUS from "../../pages/AboutUS";
import Feature from "../../pages/Feature";
import ContactUS from "../../pages/ContactUS";
import Register from "../auth/Register";
import RegisterMessage from "../auth/RegisterMessage";
import RegisterActivation from "../auth/RegisterActivation";
import Login from "../auth/Login";
import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword";
import Dashboard from "../../pages/Admin/Dashboard";
import UpdatePassword from "../../pages/Admin/UserPassword";

import PublicList from "../../pages/Admin/PublicList";
import PrivateList from "../../pages/Admin/PrivateList";
import Profile from "../../pages/Admin/UserProfile";
import Channel from "../../pages/Admin/ChannelList";
import NewChannel from "../../pages/Admin/ChannelNew";
import ShortenOriginal from "../../pages/ShortenOriginal";
import ShortenChannel from "../../pages/ShortenChannel";
import NotFound from "../../components/layout/NotFound";

import PrivateRoute from "../routing/PrivateRoute";

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/hubungi-kami" component={ContactUS} />
        <Route exact path="/tentang-kami" component={AboutUS} />
        <Route exact path="/fitur" component={Feature} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register-success" component={RegisterMessage} />
        <Route exact path="/activation/:id" component={RegisterActivation} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/reset-password" component={ResetPassword} />

        {/* User admin page route */}
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/public-shorten" component={PublicList} />
        <PrivateRoute exact path="/private-shorten" component={PrivateList} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute
          exact
          path="/update-password"
          component={UpdatePassword}
        />
        <PrivateRoute exact path="/channel-list" component={Channel} />
        <PrivateRoute exact path="/create-new-channel" component={NewChannel} />

        {/* Only for shorten page */}
        <Route exact path="/:channel/:slug" component={ShortenChannel} />
        <Route exact path="/:key" component={ShortenOriginal} />
        <Route exact path="/404" component={NotFound} />
      </Switch>
    </div>
  );
};

export default Routes;
