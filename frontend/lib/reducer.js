const reducer = (state, { type, payload }) => {
  if (type === 'reset') {
    return Object.keys(payload).reduce((clearedState, key) => {
      clearedState[key] = payload[key];
      return clearedState;
    }, {});
  }

  return { ...state, [type]: payload };
};

export default reducer;
