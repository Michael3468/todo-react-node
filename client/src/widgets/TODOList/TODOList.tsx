import { observer } from 'mobx-react-lite';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';

import { StoreContext } from '../../index';
import { RDropdown } from '../../shared/ui';
import { ITodo } from '../../types';
import { filterTodosByResponsible, groupTodosByFinishDate, sortTodos } from './lib';
import {
  SortConst,
  SortAdminConst,
  TSortAdminConst,
  GroupByFinishDateConst,
  TGroupByFinishDateConst,
} from './TODOList.types';
import { TODOItem } from './ui';

const TODOList = observer(() => {
  const { todoStore, userStore } = useContext(StoreContext);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<ITodo[]>([]);
  const [sort, setSort] = useState<TSortAdminConst | string>('last updated');
  const [groupByFinishDate, setGroupByFinishDate] = useState<TGroupByFinishDateConst | string>(
    'all',
  );
  const [responsibleToGroupBy, setResponsibleToGroupBy] = useState<string>('');
  const [responsibles, setResponsibles] = useState<string[]>([]);
  const [isGroupDropdownVisible, setIsGroupDropdownVisible] = useState<boolean>(false);
  const [isResponsibleDropdownVisible, setIsResponsibleDropdownVisible] = useState<boolean>(false);

  const getUserTodos = useCallback(
    (login: string): ITodo[] => todoStore.todos.filter((todo) => todo.responsible === login),
    [todoStore.todos],
  );

  useEffect(() => {
    const getResponsibles = async () => {
      await todoStore.fetchAllTodos();

      const resp: string[] = todoStore.todos.map((todo) => todo.responsible);
      const uniqueResp: string[] = resp.filter(
        (value, index, self) => self.indexOf(value) === index,
      );
      setResponsibles(uniqueResp);
    };

    getResponsibles();
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

  useEffect(() => {
    if ((sort as TSortAdminConst) === 'finish date') {
      setIsGroupDropdownVisible(true);
      setIsResponsibleDropdownVisible(false);
    } else if ((sort as TSortAdminConst) === 'responsible') {
      setIsResponsibleDropdownVisible(true);
      setIsGroupDropdownVisible(false);
    } else {
      setIsGroupDropdownVisible(false);
      setIsResponsibleDropdownVisible(false);
    }
  }, [sort]);

  useEffect(() => {
    const gTodos = groupTodosByFinishDate(groupByFinishDate, todos);
    setFilteredTodos(gTodos);
  }, [groupByFinishDate, todos]);

  useEffect(() => {
    if (responsibleToGroupBy) {
      if (responsibleToGroupBy === 'all') {
        const sTodos = sortTodos(todos, 'finish date');
        setFilteredTodos(sTodos);
      } else {
        const responsibleTodos = filterTodosByResponsible(responsibleToGroupBy, todos);
        setFilteredTodos(responsibleTodos);
      }
    }
  }, [responsibleToGroupBy, todos]);

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
              {filteredTodos.length > 0 && (
                <>
                  <RDropdown
                    variable={sort}
                    setVariable={setSort}
                    toggleText="Sort by"
                    itemsArray={
                      userStore.user?.role === 'ADMIN' ? [...SortAdminConst] : [...SortConst]
                    }
                  />

                  {isGroupDropdownVisible && (
                    <RDropdown
                      variable={groupByFinishDate}
                      setVariable={setGroupByFinishDate}
                      toggleText="Group by"
                      itemsArray={[...GroupByFinishDateConst]}
                    />
                  )}

                  {isResponsibleDropdownVisible && (
                    <RDropdown
                      variable={responsibleToGroupBy}
                      setVariable={setResponsibleToGroupBy}
                      toggleText="Group by"
                      itemsArray={['all', ...responsibles]}
                    />
                  )}
                </>
              )}
              {filteredTodos.map((todo) => (
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
