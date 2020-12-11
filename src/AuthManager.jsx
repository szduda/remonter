import { useEffect, useRef } from 'react';
import { useStore } from './StateManager/Store'
import { Auth } from './firebase'

const useAuth = ({ Auth }) => {
  const { state, actions } = useStore()
  const auth = useRef(Auth)
  const user = useRef(state.user)
  const setUser = useRef(actions.user.setUser)
  useEffect(() => {
    const onAuthStateChange = () =>
      auth.current.onAuthStateChanged(async () => {
        const currentToken = await auth.currentUser?.getIdToken() ?? false
        if (!currentToken) {
          setUser.current(null)
        } else if (currentToken !== user.current.token) {
          setUser.current({
            user: {
              role: 'admin',
              token: currentToken
            }
          })
        }
      })
    const unsubscribe = onAuthStateChange();
    return unsubscribe;
  }, [auth, user, setUser]);
}

export const AuthManager = ({ children }) => {
  useAuth({ Auth })
  return children
}