import { useActions } from "./useActions";
import {
  defaultState as setlistDefault,
  setlistReducer,
  setlistActions,
} from './definitions/setlist.store'

export const initialState = {
  setlist: setlistDefault,
}

export const reducer = ({ setlist }, action) => {
  return {
    setlist: setlistReducer(setlist, action),
  }
}

export const useMyGetters = state => ({
})

const useSetlistActions = dispatch => useActions(dispatch, setlistActions)

export const useMyActions = dispatch => ({
  setlist: useSetlistActions(dispatch),
})