import React from 'react';
import styled from 'styled-components';

const Select = ({
  name,
  defaultValue,
  options,
  handleChange,
  label,
}) => (
  <SelectStyles>
    <label htmlFor={name}>{label}</label>
    <select
      name={name}
      defaultValue={defaultValue}
      onChange={handleChange}
    >
      {options.map((option) => <option key={option} value={option}>{option}</option>)}
    </select>
  </SelectStyles>
);

const SelectStyles = styled.div`
  label {
    padding-right: 5px;
  }
  select {
    background: white;
    font-size: 1.5rem;
    border: 1px solid ${(props) => props.theme.black};
    border-radius: 4px;
    padding: 10px;
    color: ${(props) => props.theme.black};
    &:focus {
      border: 1px solid ${(props) => props.theme.primaryColor};
      outline: 0px;
    }
  }
`;

export default Select;
