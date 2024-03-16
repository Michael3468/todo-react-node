import { FC, useState } from 'react';
import { Card, Col } from 'react-bootstrap';

import { CreateTODO } from '../../..';
import { ITodo } from './TODOItem.types';

type TODOItemProps = {
  todo: ITodo;
};

const TODOItem: FC<TODOItemProps> = ({ todo }) => {
  const date = new Date(todo.finishDate.toLocaleString());
  const [createTodoVisible, setCreateTodoVisible] = useState<boolean>(false);

  return (
    <>
      <Col className="d-flex align-items-center mt-3" onClick={() => setCreateTodoVisible(true)}>
        <Card style={{ cursor: 'pointer' }} className="w-100">
          <div className="p-2">
            <div className="d-flex justify-content-between flex-column">
              <div>{`caption: ${todo.caption}`}</div>
              <div>{`priority: ${todo.priority}`}</div>
              <div>{`finish date: ${date.toDateString()}`}</div>
              <div>{`responsible: ${todo.responsible}`}</div>
              <div>{`status: ${todo.status}`}</div>
            </div>
          </div>
        </Card>
      </Col>

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
