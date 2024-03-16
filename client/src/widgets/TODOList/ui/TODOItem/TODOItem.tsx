import { FC, useEffect, useState } from 'react';
import { Card, Col } from 'react-bootstrap';

import { ITodo } from '.';
import { CreateTODO } from '../../..';
import { TCaptionColors, getTodoCaptionColor } from '../../lib';

type TODOItemProps = {
  todo: ITodo;
};

const TODOItem: FC<TODOItemProps> = ({ todo }) => {
  const date = new Date(todo.finishDate.toLocaleString());
  const [createTodoVisible, setCreateTodoVisible] = useState<boolean>(false);
  const [captionColor, setCaptionColor] = useState<TCaptionColors>('gray');

  useEffect(() => {
    const capColor = getTodoCaptionColor(todo);
    setCaptionColor(capColor);
  }, [todo]);

  return (
    <>
      <Col className="d-flex align-items-center mt-3" onClick={() => setCreateTodoVisible(true)}>
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

      {/* TODO move to Main page */}
      <CreateTODO
        show={createTodoVisible}
        onHide={() => setCreateTodoVisible(false)}
        todoId={todo.id}
        todoText="Edit"
      />
    </>
  );
};

export default TODOItem;
