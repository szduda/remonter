import React from 'react'
import { Header } from './Header'
import { useStore } from '../../StateManager/Store'

export const useHeader = () => {
  const useHeaderContext = () => {
    const { state } = useStore()
    return { user: !!state.user?.token }
  }

  return () => <Header {...{ useHeaderContext }} />
}