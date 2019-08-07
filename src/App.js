import React from "react";
import "./App.css";
import { StateProvider } from "./stateManage";
import { initialState, reducer } from "./stateManage/reducer";
import { ApolloProvider } from "react-apollo-hooks";
import client from "./apollo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./main";
import Exam from "./main/exam";

function App() {
  return (
    <ApolloProvider client={client}>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Router>
          <div className="App">
            <div className="container">
              <Switch>
                <Route exact path="/" component={Main} />
              </Switch>
              <Switch>
                <Route exact path="/exam/:id" component={Exam} />
              </Switch>
            </div>
          </div>
        </Router>
      </StateProvider>
    </ApolloProvider>
  );
}

export default App;
