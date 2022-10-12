import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Top } from './components/page/Top'
import { About } from './components/page/About'
import { NotFound } from './components/page/NotFound'

export const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Top} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)
