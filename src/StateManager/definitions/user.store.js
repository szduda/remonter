export const defaultState = {}

export const userReducer = (state, action) => {
  const { payload, type } = action

  switch (type) {
    case 'setUser':
      return { ...payload.user }

    default:
      return state;
  }
}

export const userActions = {
  setUser: payload => ({
    type: 'setUser',
    payload: payload || {}
  }),
}