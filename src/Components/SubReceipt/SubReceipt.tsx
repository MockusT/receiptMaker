import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';
import SubReceiptInt from '../../Interfaces/SubReceiptInt';
import Select from '../Select/Select';
import './subReceipt.css';
import TotalCost from '../TotalCost/TotalCost';

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
    let correctValue = value === 'cost' ? parseFloat(value) : value;
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
    <div className="subReceipt">
      <div className="split-content center-container">
        <Select value={category} handleChange={handleCategoryChange} />
        <Button name="Add expense" handleClick={handleAddProduct} />
      </div>
      {subReceipt.products.map((p) => (
        <div key={p.id} className="split-content">
          <input
            value={p.name}
            onChange={(e): void => handleProductChange(e, p.id)}
            name="name"
            className="input input-text"
          />
          <div className="div-numeric">
            <span className="input-symbol-euro">
              <input
                value={p.cost}
                onChange={(e): void => handleProductChange(e, p.id)}
                name="cost"
                type="number"
                min={0}
                className="input input-numeric"
              />
            </span>
          </div>
        </div>
      ))}
      <TotalCost cost={price} />
    </div>
  );
};

export default SubReceipt;
