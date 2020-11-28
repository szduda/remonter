import { useActions } from "./useActions";
import {
  defaultState as setlistDefault,
  setlistReducer,
  setlistActions,
} from './definitions/setlist.store'
import {
  defaultState as userDefault,
  userReducer,
  userActions,
} from './definitions/user.store'

export const initialState = {
  setlist: setlistDefault,
  user: userDefault
}

export const reducer = ({ setlist, user }, action) => {
  return {
    setlist: setlistReducer(setlist, action),
    user: userReducer(user, action),
  }
}

export const useMyGetters = state => ({
})

const useSetlistActions = dispatch => useActions(dispatch, setlistActions)
const useUserActions = dispatch => useActions(dispatch, userActions)

export const useMyActions = dispatch => ({
  setlist: useSetlistActions(dispatch),
  user: useUserActions(dispatch),
})