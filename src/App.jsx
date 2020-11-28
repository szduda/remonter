import React from 'react';
import { StateManager } from './StateManager/Store'
import Router from './Router'
import { Theme } from './Features/theme';
import { useHeader } from './Features/Header/useHeader'
import { AuthManager } from './AuthManager'

const Header = useHeader()

export default () => (
  <StateManager>
    <AuthManager>
      <Theme>
        <header>
          <Header />
        </header>
        <main>
          <Router />
        </main>
      </Theme>
    </AuthManager>
  </StateManager>
)