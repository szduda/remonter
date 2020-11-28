import React from 'react';
import { StateManager } from './StateManager/Store'
import Router from './Router'
import { Theme } from './Features/theme';
import { AuthManager } from './AuthManager'


export default () => (
  <StateManager>
    <AuthManager>
      <Theme>
        <Router />
      </Theme>
    </AuthManager>
  </StateManager>
)