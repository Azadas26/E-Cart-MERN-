import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const verifyUser = () => {
    // Check if the token is present in local storage
    return !!localStorage.getItem("token");
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [token]);

  return (
    <Router>
      <Route
        exact
        path="/"
        render={() =>
          verifyUser() ? (
            <h1>Welcome! Token: {token}</h1>
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      <Route
        path="/login"
        render={() => (
          <button
            onClick={() => {
              const fakeToken = "exampleToken123";
              localStorage.setItem("token", fakeToken);
              setToken(fakeToken);
            }}
          >
            Log in
          </button>
        )}
      />
    </Router>
  );
};

export default App;
