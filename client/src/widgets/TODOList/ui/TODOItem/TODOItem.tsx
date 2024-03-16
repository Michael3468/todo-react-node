import { FC, useContext, useEffect, useState } from 'react';
import { Card, Col } from 'react-bootstrap';

import { ITodo } from '.';
import { StoreContext } from '../../../..';
import { TCaptionColors, getTodoCaptionColor } from '../../lib';

type TODOItemProps = {
  todo: ITodo;
};

const TODOItem: FC<TODOItemProps> = ({ todo }) => {
  const { createTodoStore } = useContext(StoreContext);
  const [captionColor, setCaptionColor] = useState<TCaptionColors>('gray');

  const date = new Date(todo.finishDate.toLocaleString());

  useEffect(() => {
    const capColor = getTodoCaptionColor(todo);
    setCaptionColor(capColor);
  }, [todo]);

  const handleTodoClick = (todoItem: ITodo) => {
    createTodoStore.showCreateTodo();
    createTodoStore.setText('Edit');
    createTodoStore.setTodoId(todoItem.id);
  };

  return (
    <Col className="d-flex align-items-center mt-3" onClick={() => handleTodoClick(todo)}>
      <Card style={{ cursor: 'pointer' }} className="w-100">
        <div className="p-2">
          <div className="d-flex justify-content-between flex-column">
            <div style={{ color: `${captionColor}` }}>{`caption: ${todo.caption}`}</div>
            <div>{`priority: ${todo.priority}`}</div>
            <div>{`finish date: ${date.toDateString()}`}</div>
            <div>{`responsible: ${todo.responsible}`}</div>
            <div>{`status: ${todo.status}`}</div>
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default TODOItem;
