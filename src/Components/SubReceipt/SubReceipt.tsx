import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';
import SubReceiptInt from '../../Interfaces/SubReceiptInt';
import Select from '../Select/Select';

interface SubReceiptProps {
  subReceipt: SubReceiptInt;
  setSubReceipt(
      subReceipt: SubReceiptInt
  ): void;
  handleAddProduct(): void;
}

const SubReceipt: React.FunctionComponent<SubReceiptProps> = (props: SubReceiptProps) => {
  const { subReceipt, setSubReceipt, handleAddProduct } = props;
  const { products, category } = subReceipt;
  const [price, setPrice] = useState(0);

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>, currentId: number): void => {
    const { name, value } = e.currentTarget;
    let correctValue = parseFloat(value);
    if (name === 'cost') if (correctValue < 0) correctValue = 0;
    setSubReceipt({
      ...subReceipt,
      products: products.map((p) => (p.id !== currentId ? p : { ...p, [name]: correctValue })),
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const { value } = e.currentTarget;
    setSubReceipt({ ...subReceipt, category: value });
  };

  useEffect(() => {
    setPrice(products.reduce((a, b) => a
        + Number.parseFloat(
          Number.isNaN(Number.parseFloat(b.cost.toString()))
            ? '0' : b.cost.toString(),
        ), 0));
  }, [products]);


  return (
    <div>
      <Select value={category} handleChange={handleCategoryChange} />
      {subReceipt.products.map((p) => (
        <div key={p.id}>
          <input
            value={p.name}
            onChange={(e): void => handleProductChange(e, p.id)}
            name="name"
          />
          <input
            value={p.cost}
            onChange={(e): void => handleProductChange(e, p.id)}
            name="cost"
            type="number"
            min={0}
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
