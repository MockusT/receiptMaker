import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';
import SubReceiptInt from '../../Interfaces/SubReceiptInt';

interface SubReceiptProps {
  subReceipt: SubReceiptInt;
  setProducts(
      subReceiptId: number,
      e: React.ChangeEvent<HTMLInputElement>,
      productId: number
  ): void;
  handleAddProduct(): void;
}

const SubReceipt: React.FunctionComponent<SubReceiptProps> = (props: SubReceiptProps) => {
  const { subReceipt, setProducts, handleAddProduct } = props;
  const { id, products, category } = subReceipt;

  const [price, setPrice] = useState(0);

  useEffect(() => {
    setPrice(products.reduce((a, b) => a + Number.parseFloat(b.cost.toString()), 0));
  }, [products]);


  return (
    <div>
      {subReceipt.products.map((p) => (
        <div key={p.id}>
          <input
            value={p.name}
            onChange={(e): void => setProducts(id, e, p.id)}
            name="name"
          />
          <input
            value={p.cost}
            onChange={(e): void => setProducts(id, e, p.id)}
            name="cost"
            type="number"
          />
        </div>
      ))}
      <Button name="Add" handleClick={handleAddProduct} />
      <p>
        Cost is:
        {price}
      </p>
    </div>
  );
};

export default SubReceipt;
