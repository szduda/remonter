import React from 'react'
import { Route, HashRouter, Redirect } from 'react-router-dom';
import { DataService } from './DataService'
import { AuthProvider } from './firebase'
import { useSetlist } from './Features/Setlist/useSetlist'
import { useLogin } from './Features/Login/useLogin'

const Setlist = useSetlist({ DataService })
const Login = useLogin({ AuthProvider })

export default () => (
  <HashRouter basename="/">
    <Route exact path='/' component={Setlist} />
    <Route path='/login' component={Login} />
    <Redirect to="/" />
  </HashRouter>
)