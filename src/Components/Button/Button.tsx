import React from 'react';
import './button.css';

interface ButtonProps {
    name: string;
    handleClick(e: React.MouseEvent<HTMLButtonElement>): void;
}

const Button: React.FunctionComponent<ButtonProps> = (props: ButtonProps) => {
  const { name, handleClick } = props;

  return (
    <button onClick={handleClick} type="button" className="button">
      {name}
    </button>
  );
};

export default Button;
