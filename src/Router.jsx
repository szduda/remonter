import React from 'react'
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { DataService } from './DataService'
import { useSetlist } from './Features/Setlist/useSetlist'

const Setlist = useSetlist({ DataService })

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Setlist} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
)