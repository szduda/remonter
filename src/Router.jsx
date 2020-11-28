import React from 'react'
import { Route, HashRouter, Redirect } from 'react-router-dom';
import { DataService } from './DataService'
import { AuthProvider } from './firebase'
import { useSetlist } from './Features/Setlist/useSetlist'
import { useLogin } from './Features/Login/useLogin'
import { useHeader } from './Features/Header/useHeader'

const Header = useHeader()
const Setlist = useSetlist({ DataService })
const Login = useLogin({ AuthProvider })

export default () => (
  <HashRouter basename="/">
    <header>
      <Header />
    </header>
    <main>
      <Route exact path='/' component={Setlist} />
      <Route path='/login' component={Login} />
      <Redirect to="/" />
    </main>
  </HashRouter>
)