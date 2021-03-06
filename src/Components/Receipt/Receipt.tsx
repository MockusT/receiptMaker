import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Button from '../Button/Button';
import SubReceipt from '../SubReceipt/SubReceipt';
import SubReceiptInt from '../../Interfaces/SubReceiptInt';
import './receipt.css';
import TotalCost from '../TotalCost/TotalCost';

const Receipt: React.FunctionComponent = () => {
  const [subReceipts, setSubReceipts] = useState<SubReceiptInt[]>([]);
  const [id, setId] = useState(0);
  const [cost, setCost] = useState(0);

  useEffect(() => {
    setCost(subReceipts.reduce((a, b) => a + b.products.reduce((c, d) => c + Number.parseFloat(
      Number.isNaN(Number.parseFloat(d.cost.toString()))
        ? '0' : d.cost.toString(),
    ), 0), 0));
  }, [subReceipts]);

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
    subReceipt: SubReceiptInt,
  ): void => {
    setSubReceipts(subReceipts.map((s) => (s.id !== subReceipt.id ? s : subReceipt)));
  };

  const onDragEnd = (result: any): void => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    const ans = [...subReceipts];
    const [removed] = ans.splice(source.index, 1);
    ans.splice(destination.index, 0, removed);
    setSubReceipts(ans);
  };

  return (
    <div className="container">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="Receipt">
          {(provided) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <div
              className={subReceipts.length ? 'sub-receipt-container' : ''}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {subReceipts.map((s, i) => (
                <Draggable draggableId={s.id.toString()} index={i} key={s.id}>
                  {(providedDrag) => (
                    <div
                          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                          // @ts-ignore
                      ref={providedDrag.innerRef}
                      {...providedDrag.draggableProps}
                      {...providedDrag.dragHandleProps}
                    >
                      <SubReceipt
                        subReceipt={s}
                        setSubReceipt={handleProductChange}
                        handleAddProduct={(): void => handleAddProduct(s.id)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="total-container">
        <TotalCost cost={cost} />
        <div className="button-wrapper">
          <Button name="Add receipt" handleClick={handleAddSubReceipt} />
        </div>
      </div>
    </div>
  );
};

export default Receipt;
