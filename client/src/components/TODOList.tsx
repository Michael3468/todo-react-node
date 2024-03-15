import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';

import { StoreContext } from '../index';
import { ITodo } from '../types';
import TODOItem from './TODOItem';

const TODOList = observer(() => {
  const { todoStore, userStore } = useContext(StoreContext);
  const [allTODOS, setAllTODOS] = useState<ITodo[]>([]);

  useEffect(() => {
    todoStore.fetchAllTodos();
  }, [todoStore]);

  useEffect(() => {
    setAllTODOS([]);

    if (userStore.isAuth) {
      if (userStore.user?.role === 'ADMIN') {
        setAllTODOS(todoStore.todos);
      } else if (userStore.user?.role === 'USER') {
        const userTodos = todoStore.todos.filter(
          (todo) => Number(todo.responsible) === userStore.user?.id,
        );

        setAllTODOS(userTodos);
      }
    }
  }, [todoStore.todos, userStore.isAuth, userStore.user?.id, userStore.user?.role]);

  return (
    <div>
      {todoStore.isLoading ? (
        // TODO move spinner to component
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: window.innerHeight }}
        >
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <Row className="d-flex mb-5">
          {!allTODOS.length && (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: window.innerHeight }}
            >
              Login To See Your TODOS
            </div>
          )}
          {allTODOS.map((todo) => (
            <Col key={todo.id} sm={12} lg={12}>
              <TODOItem todo={todo} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
});

export default TODOList;
