export const defaultState = {}

const getIndex = (obj, id) => Object.keys(obj)
  .map(id => obj[id])
  .findIndex(i => i.id === id)

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
      return {
        ...state,
        [getIndex(state, payload.id)]: { ...state[index], ...payload.item }
      }
    case 'setActiveLabel':
      const index = getIndex(state, payload.itemId)
      const updatedItem = { ...state[index] }
      Object.keys(updatedItem.labels)
        .map(k => updatedItem.labels[k].active = payload.labelId === k)
      return {
        ...state,
        [index]: updatedItem
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
  }),
  setActiveLabel: payload => ({
    type: 'setActiveLabel',
    payload
  })
}