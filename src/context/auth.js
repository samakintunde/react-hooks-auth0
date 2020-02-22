import React, { useEffect, useContext, useState, createContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = props => {
  // PROPS
  const {
    children,
    onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
    ...initOptions
  } = props;

  // STATE
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [auth0Client, setAuth0Client] = useState(null);
  // To kep track of auth request
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  // EFFECTS
  useEffect(() => {
    // Initialize the Auth0 SPA SDK
    const initAuth0 = async () => {
      const authClient = await createAuth0Client(initOptions);
      console.log("authClient", authClient);
      setAuth0Client(authClient);

      if (
        window.location.search.includes("code=") &&
        window.location.search.includes("state=")
      ) {
        const { appState } = await authClient.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      // Check if a user is authenticated
      const isAuthenticated = await authClient.isAuthenticated();
      console.log("isAuthenticated:", isAuthenticated);
      setIsAuthenticated(isAuthenticated);

      // Get the logged in user
      if (isAuthenticated) {
        const user = await authClient.getUser();
        console.log("user", user);
        setUser(user);
      }

      setLoading(false);
    };

    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client.getUser();
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        // Get the information out of our token
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        // Use the library to login
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        // Get the authentication token so we can use for API calls
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) => auth0Client.logout(...p)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
