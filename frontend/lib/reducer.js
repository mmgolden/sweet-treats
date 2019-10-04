const reducer = (state, { type, payload }) => ({ ...state, [type]: payload });

export default reducer;
