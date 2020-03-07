import React from 'react';
import './select.css';

interface SelectProps {
    value: string;
    handleChange(e: React.FormEvent<HTMLSelectElement>): void;
}

const Select: React.FunctionComponent<SelectProps> = (props: SelectProps) => {
  const { value, handleChange } = props;

  return (

    <label htmlFor="select">
      <select id="select" value={value} onChange={handleChange} className="select">
        <option value="Food" className={value !== 'Food' ? 'option' : 'hidden'}>Food</option>
        <option value="Houseware" className={value !== 'Houseware' ? 'option' : 'hidden'}>Houseware</option>
        <option value="Entertainment" className={value !== 'Entertainment' ? 'option' : 'hidden'}>Entertainment</option>
      </select>
    </label>

  );
};

export default Select;
