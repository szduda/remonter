import React from 'react'
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { DataService } from './DataService'
import { AuthProvider } from './firebase'
import { useSetlist } from './Features/Setlist/useSetlist'
import { useLogin } from './Features/Login/useLogin'

const Setlist = useSetlist({ DataService })
const Login = useLogin({ AuthProvider })

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/login' component={Login} />
      <Route exact path='/' component={Setlist} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
)