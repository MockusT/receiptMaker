import React, { useState } from 'react';
import Button from '../Button/Button';
import SubReceipt from '../SubReceipt/SubReceipt';
import SubReceiptInt from '../../Interfaces/SubReceiptInt';

const Receipt: React.FunctionComponent = () => {
  const [subReceipts, setSubReceipts] = useState<SubReceiptInt[]>([]);
  const [id, setId] = useState(0);
  const [cost, setCost] = useState(0);

  const handleAddSubReceipt = (): void => {
    setSubReceipts([...subReceipts, {
      id, category: 'Food', lastId: 0, products: [],
    }]);
    setId(id + 1);
  };

  const handleAddProduct = (currentId: number): void => {
    setSubReceipts(subReceipts.map((s) => (s.id !== currentId ? s : {
      ...s, products: [...s.products, { id: s.lastId, name: '', cost: 0 }], lastId: s.lastId + 1,
    })));
  };

  const handleProductChange = (
    subReceiptId: number,
    e: React.ChangeEvent<HTMLInputElement>,
    productId: number,
  ): void => {
    const { name, value } = e.currentTarget;
    setSubReceipts(subReceipts.map((s) => (s.id !== subReceiptId ? s : {
      ...s, products: s.products.map((p) => (p.id !== productId ? p : { ...p, [name]: value })),
    })));
  };

  return (
    <div>
      <p>RECEIPT</p>
      {subReceipts.map((s) => (
        <SubReceipt
          subReceipt={s}
          setProducts={handleProductChange}
          handleAddProduct={(): void => handleAddProduct(s.id)}
          key={s.id}
        />
      ))}
      <br />
      <br />
      <br />
      <br />
      <Button name="Add rec" handleClick={handleAddSubReceipt} />
    </div>
  );
};

export default Receipt;
