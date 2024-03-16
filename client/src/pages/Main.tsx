import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Button, Col, Container } from 'react-bootstrap';

import { CreateTODO, TODOList } from '../widgets';

import { StoreContext } from '..';

const Main = observer(() => {
  const { createTodoStore } = useContext(StoreContext);

  const handleCreateTodo = () => {
    createTodoStore.showCreateTodo();
    createTodoStore.setText('Create');
    createTodoStore.setTodoId(null);
  };

  return (
    <Container>
      <Col>
        <Col md={12}>
          <Button
            variant="outline-dark"
            className="mt-4"
            onClick={() => handleCreateTodo()}
          >
            New TODO
          </Button>

          <CreateTODO
            show={createTodoStore.visible}
            onHide={() => createTodoStore.hideCreateTodo()}
            todoText={createTodoStore.text}
            todoId={createTodoStore.todoId}
          />

          <TODOList />
        </Col>
      </Col>
    </Container>
  );
});

export default Main;
