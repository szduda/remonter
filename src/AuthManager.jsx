import { useMemo, useEffect, useCallback } from 'react';
import { useStore } from './StateManager/Store'
import { Auth } from './firebase'

const useAuth = ({ Auth }) => {
  const { state, actions } = useStore()
  const auth = useMemo(() => Auth, [Auth])
  const user = useMemo(() => state.user, [state.user])
  const setUser = useCallback(actions.user.setUser, [])
  useEffect(() => {
    const onAuthStateChange = setUser =>
      auth.onAuthStateChanged(async () => {
        const currentToken = await auth.currentUser?.getIdToken() ?? false
        if (!currentToken) {
          setUser(null)
        } else if (currentToken !== user.token) {
          setUser({
            user: {
              role: 'admin',
              token: currentToken
            }
          })
        }
      })
    const unsubscribe = onAuthStateChange(setUser);
    return unsubscribe;
  }, [auth, user, setUser]);
}

export const AuthManager = ({ children }) => {
  useAuth({ Auth })
  return children
}