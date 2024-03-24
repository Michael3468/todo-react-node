import { observer } from 'mobx-react-lite';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';

import { StoreContext } from '../../index';
import { RDropdown } from '../../shared/ui';
import { ITodo } from '../../types';
import {
  checkIsUserSupervisor,
  filterTodosByResponsible,
  groupTodosByFinishDate,
  sortTodos,
} from './lib';
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
  const [isUserSupervisor, setIsUserSupervisor] = useState<boolean>(false);

  const getUserTodos = useCallback(
    (login: string): ITodo[] => {
      const responsibleTodos = todoStore.todos.filter((todo) => todo.responsible === login);
      const creatorTodos = todoStore.todos.filter((todo) => todo.creator === login);

      return Array.from(new Set([...responsibleTodos, ...creatorTodos]));
    },
    [todoStore.todos],
  );

  useEffect(() => {
    if (userStore.user?.login) {
      checkIsUserSupervisor(userStore.user?.login).then((isSupervisor) =>
        setIsUserSupervisor(isSupervisor),
      );
    }
  }, [userStore.user?.login]);

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
    if (userStore.isAuth && userStore.user) {
      const userTodos: ITodo[] = getUserTodos(userStore.user?.login);

      const sortedTodos = sortTodos(userTodos, sort as TSortAdminConst);
      setTodos(sortedTodos);
    }
  }, [
    getUserTodos,
    todoStore.todos,
    userStore.isAuth,
    userStore.user?.login,
    sort,
    userStore.user,
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
              <RDropdown
                variable={sort}
                setVariable={setSort}
                toggleText="Sort by"
                itemsArray={isUserSupervisor ? [...SortAdminConst] : [...SortConst]}
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
