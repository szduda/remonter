import React from 'react';
import { StateManager } from './StateManager/Store'
import Router from './Router'
import { Theme } from './Features/theme';
import { useHeader } from './Features/Header/useHeader'

const Header = useHeader()

export default () => (
  <StateManager>
    <Theme>
      <header>
        <Header />
      </header>
      <main>
        <Router />
      </main>
    </Theme>
  </StateManager>
)
