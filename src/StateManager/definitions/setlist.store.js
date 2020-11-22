export const defaultState = {}

export const setlistReducer = (state, action) => {
  const { payload, type } = action
  switch (type) {
    case 'addItem':
      return {
        ...state,
        [state.length]: payload.item
      }
    case 'setItems':
      return {
        ...payload.items
      }
    case 'updateItem':
      const index = Object.keys(state).map(o => state[o]).findIndex(i => i.id === payload.id)
      return {
        ...state,
        [index]: { ...state[index], ...payload.item }
      }

    default:
      return state;
  }
}

export const setlistActions = {
  setItems: payload => ({
    type: 'setItems',
    payload
  }),
  addItem: payload => ({
    type: 'addItem',
    payload
  }),
  updateItem: payload => ({
    type: 'updateItem',
    payload
  })
}