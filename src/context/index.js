import React from "react";
import AuthProvider from "./auth";
import UserProvider from "./user";
import { authConfig } from "../config/auth";
import history from "../utils/history";

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

const AppProvider = props => {
  const { children } = props;

  return (
    <AuthProvider
      domain={authConfig.domain}
      client_id={authConfig.clientId}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <UserProvider>{children}</UserProvider>
    </AuthProvider>
  );
};

export default AppProvider;
