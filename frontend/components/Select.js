import React from 'react';

const Select = ({
  name,
  defaultValue,
  options,
  handleChange,
}) => (
  <label htmlFor={name}>
    <select
      name={name}
      defaultValue={defaultValue}
      onChange={handleChange}
    >
      {options.map((option) => <option key={option} value={option}>{option}</option>)}
    </select>
  </label>
);

export default Select;
