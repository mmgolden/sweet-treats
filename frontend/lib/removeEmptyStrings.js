const removeEmptyStrings = (input) => Object.keys(input).reduce((inputVariables, key) => {
  inputVariables[key] = input[key];
  if (input[key] === '') delete inputVariables[key];
  return inputVariables;
}, {});

export default removeEmptyStrings;
