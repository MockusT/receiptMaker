import React from 'react';

interface TotalCostProps {
    cost: number;
}

const TotalCost: React.FunctionComponent<TotalCostProps> = (props: TotalCostProps) => {
  const { cost } = props;

  return (
    <div className="split-content">
      <p>Total:</p>
      <p className="cost">
        {`${cost} €`}
      </p>
    </div>
  );
};

export default TotalCost;
