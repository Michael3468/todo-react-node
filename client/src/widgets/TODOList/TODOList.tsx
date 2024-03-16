import { observer } from 'mobx-react-lite';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';

import { StoreContext } from '../../index';
import { RDropdown } from '../../shared/ui';
import { ITodo } from '../../types';
import { sortTodos } from './lib';
import { SortConst, SortAdminConst, TSortAdminConst } from './TODOList.types';
import { TODOItem } from './ui';

const TODOList = observer(() => {
  const { todoStore, userStore } = useContext(StoreContext);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [sort, setSort] = useState<TSortAdminConst | string>('last updated');

  const getUserTodos = useCallback(
    (login: string): ITodo[] => todoStore.todos.filter((todo) => todo.responsible === login),
    [todoStore.todos],
  );

  useEffect(() => {
    todoStore.fetchAllTodos();
  }, [todoStore]);

  useEffect(() => {
    if (userStore.isAuth) {
      if (userStore.user?.role === 'ADMIN') {
        const sortedTodos = sortTodos(todoStore.todos, sort as TSortAdminConst);
        setTodos(sortedTodos);
      } else if (userStore.user?.role === 'USER') {
        const userTodos = getUserTodos(userStore.user?.login);

        const sortedTodos = sortTodos(userTodos, sort as TSortAdminConst);
        setTodos(sortedTodos);
      }
    }
  }, [
    getUserTodos,
    todoStore.todos,
    userStore.isAuth,
    userStore.user?.role,
    userStore.user?.login,
    sort,
  ]);

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
          {!userStore.isAuth ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: window.innerHeight }}
            >
              Login To See Your TODOS
            </div>
          ) : (
            <>
              {todos.length > 0 && (
                <RDropdown
                  variable={sort}
                  setVariable={setSort}
                  toggleText="Sort by"
                  itemsArray={
                    userStore.user?.role === 'ADMIN' ? [...SortAdminConst] : [...SortConst]
                  }
                />
              )}
              {todos.map((todo) => (
                <Col key={todo.id} sm={12} lg={12}>
                  <TODOItem todo={todo} />
                </Col>
              ))}
            </>
          )}
        </Row>
      )}
    </div>
  );
});

export default TODOList;
