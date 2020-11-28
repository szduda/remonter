import React from 'react'
import { useStore } from '../../StateManager/Store'
import { Login } from './Login'

export const useLogin = ({ AuthProvider }) => {
  const useLoginContext = () => {
    const { state } = useStore()
    const { user } = state

    const submit = async () => {
      AuthProvider.signIn();
    }

    return { submit, isLoggedIn: !!user?.token, user }
  }

  return () => <Login {...{ useLoginContext }} />
}