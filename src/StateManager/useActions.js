export const useActions = (dispatch, actionList) => {
  let actions = {}
  for (const action of Object.keys(actionList)) {
    actions = {
      ...actions,
      [action]: args => dispatch(actionList[action](args))
    }
  }
  return actions
}