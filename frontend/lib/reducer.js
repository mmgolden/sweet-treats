const reducer = (state, { type, payload }) => {
  if (type === 'reset') {
    return payload;
  }

  return { ...state, [type]: payload };
};

export default reducer;
