import React from 'react';

interface SelectProps {
    value: string;
    handleChange(e: React.FormEvent<HTMLSelectElement>): void;
}

const Select: React.FunctionComponent<SelectProps> = (props: SelectProps) => {
  const { value, handleChange } = props;

  return (

    <label htmlFor="select">
      <select id="select" value={value} onChange={handleChange}>
        <option value="Food">Food</option>
        <option value="Houseware">Houseware</option>
        <option value="Entertainment">Entertainment</option>
      </select>
    </label>

  );
};

export default Select;
