import React from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

import Home from './pages/home';
import Details from './pages/details';
import Add from './pages/add';


function Routes() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/add">
            <Add />
          </Route>
          <Route exact path="/details">
            <Details />
          </Route>
        </Switch>
    </BrowserRouter>
  )
}

export default Routes;
