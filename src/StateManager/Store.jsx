import React, { createContext, useContext, useReducer } from 'react';
import { initialState, reducer, useMyGetters, useMyActions } from './store.config'

export const StateContext = createContext();
export const useStore = () => {
  const [state, dispatch] = useContext(StateContext)
  return {
    state,
    actions: useMyActions(dispatch),
    getters: useMyGetters(state)
  }
}

export const StateProvider = ({ reducer, initialState, children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
}

export const StateManager = props => (
  <StateProvider  {...{ initialState, reducer, ...props }} />
)

export default StateManager