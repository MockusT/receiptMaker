import React from 'react';
import './totalCost.css';

interface TotalCostProps {
    cost: number;
}

const TotalCost: React.FunctionComponent<TotalCostProps> = (props: TotalCostProps) => {
  const { cost } = props;

  return (
    <div className="total-price">
      <p>Total:</p>
      <p className="cost">
        {cost}
        {' '}
        €
      </p>
    </div>
  );
};

export default TotalCost;
