import React from "react";
// import { Router } from "@reach/router";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StartView from "./components/StartView";
import SearchView from "./components/SearchView";

import "./css/reset.css";
import "./css/main.css";

const NotFound = () => {
  return <div>Sorry, nothing here</div>;
};

function App() {
  return (
    <div className="container">
      <header className="App-header">
        <h1>CityPop</h1>
      </header>
      <main>
        <Router>
          <Switch>
            <Route exact path="/">
              <StartView></StartView>
            </Route>
            <Route
              path="/search"
              render={(props) => <SearchView {...props}></SearchView>}
            ></Route>

            <NotFound default></NotFound>
          </Switch>
        </Router>
      </main>
    </div>
  );
}

export default App;
