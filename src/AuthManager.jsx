import { useEffect } from 'react';
import { useStore } from './StateManager/Store'
import { Auth } from './firebase'

const useAuth = ({ Auth }) => {
  const { state, actions } = useStore()
  const { user } = state
  const { setUser } = actions.user
  const onAuthStateChange = setUser =>
    Auth.onAuthStateChanged(async () => {
      const currentToken = await Auth.currentUser?.getIdToken() ?? false
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

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return unsubscribe;
  }, []);
}

export const AuthManager = ({ children }) => {
  useAuth({ Auth })
  return children
}