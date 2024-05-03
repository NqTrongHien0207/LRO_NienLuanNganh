import "./App.css";
// import {  useContext } from "react";
// import { Fragment } from "react";
import React, { useContext } from "react";
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductContext } from "./contexts/ProductContextProvider.jsx";
import {
  privateRoutes,
  privateRoutes2,
  publicRoutes,
} from "./routes/routes.js";

function App() {
  const { user } = useContext(ProductContext);

  return (
    <>
      {user && user?.userId ? (
        <>
          {user?.form != "LRO" ? (
            <>
              <Router>
                <div className="App">
                  <Routes>
                    {privateRoutes2.map((route, index) => {
                      const Page = route.component;

                      return (
                        <Route
                          key={index}
                          path={route.path}
                          element={
                            <>
                              <Page />
                            </>
                          }
                        />
                      );
                    })}
                  </Routes>
                </div>
              </Router>
            </>
          ) : (
            <>
              <Router>
                <div className="App">
                  <Routes>
                    {privateRoutes.map((route, index) => {
                      const Page = route.component;

                      return (
                        <Route
                          key={index}
                          path={route.path}
                          element={
                            <>
                              <Page />
                            </>
                          }
                        />
                      );
                    })}
                  </Routes>
                </div>
              </Router>
            </>
          )}
        </>
      ) : (
        <>
          <Router>
            <div className="App">
              <Routes>
                {publicRoutes.map((route, index) => {
                  const Page = route.component;

                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        <>
                          <Page />
                        </>
                      }
                    />
                  );
                })}
              </Routes>
            </div>
          </Router>
        </>
      )}
    </>
  );
}

export default App;
