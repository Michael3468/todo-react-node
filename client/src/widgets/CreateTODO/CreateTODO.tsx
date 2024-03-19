import { observer } from 'mobx-react-lite';
import { FC, useContext, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import { TodoPriorities, TodoStatuses } from '.';
import { StoreContext } from '../..';
import { createTODO, editTODO } from '../../http/todoAPI';
import { getAllUsers } from '../../http/userAPI';
import { RDropdown } from '../../shared/ui';
import { ITodo, IUser } from '../../types';
import { TTodoText } from './CreateTODO.types';

type CreateTODOProps = {
  show: boolean;
  todoText: TTodoText;
  todoId: number | null;
  onHide: () => void;
};

const CreateTODO: FC<CreateTODOProps> = observer(({ show, todoId, todoText, onHide }) => {
  const { todoStore, userStore } = useContext(StoreContext);

  const [todo, setTodo] = useState<ITodo | null>(null);
  const [caption, setCaption] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [finishDate, setFinishDate] = useState<Date | null>(null);
  const [priority, setPriority] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [creator, setCreator] = useState<string | null>(null);
  const [responsible, setResponsible] = useState<string | null>(null);
  const [responsibleLogin, setResponsibleLogin] = useState<string>('');
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [userLogins, setUserLogins] = useState<string[]>([]);
  const [addTODODisabledButtonStatus, setAddTODODisabledButtonStatus] = useState<boolean>(true);

  const handleTODO = async () => {
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('description', description);
    formData.append('finishDate', finishDate ? finishDate.toISOString() : '');
    formData.append('priority', priority);
    formData.append('status', status);
    formData.append('creator', creator ? creator.toString() : '');
    formData.append('responsible', responsible ? responsible.toString() : '');

    if (todoText === 'Create') {
      await createTODO(formData).then(() => onHide());
    } else {
      formData.append('id', todoId ? todoId.toString() : '');
      await editTODO(formData).then(() => onHide());
    }

    todoStore.fetchAllTodos();
  };

  useEffect(() => {
    if (todoId) {
      const currTodo = todoStore.getTodoById(todoId);
      if (currTodo) {
        setTodo(currTodo);
      }
    }
  }, [todoId, todoStore, todoStore.todos]);

  useEffect(() => {
    if (todo) {
      setCaption(todo.caption);
      setDescription(todo.description);
      setFinishDate(new Date(todo.finishDate));
      setPriority(todo.priority);
      setStatus(todo.status);
      setCreator(todo.creator);
      setResponsible(todo.responsible);

      setResponsibleLogin(todo.responsible);
    }
  }, [todo]);

  useEffect(() => {
    if (caption && description && finishDate && priority) {
      setAddTODODisabledButtonStatus(false);
    } else {
      setAddTODODisabledButtonStatus(true);
    }
  }, [caption, description, finishDate, priority]);

  useEffect(() => {
    if (userStore.user?.id) {
      setCreator(userStore.user.login);
    }
  }, [userStore]);

  const getUsers = async () => {
    let users;
    try {
      users = await getAllUsers();
      return users;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    return users;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsersArr = await getUsers();
      if (allUsersArr) {
        setAllUsers(allUsersArr);
        const userLoginsArr = allUsersArr.map((user) => user.login);
        setUserLogins(userLoginsArr);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const responsibleUser = allUsers.filter((user) => user.login === responsibleLogin);

    if (responsibleUser.length) {
      setResponsible(responsibleUser[0].login);
    }
  }, [allUsers, responsibleLogin]);

  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{`${todoText} TODO`}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Control
            className="mt-3"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Enter caption"
          />

          <Form.Control
            className="mt-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />

          <Form.Control
            className="mt-3"
            value={finishDate ? finishDate.toISOString().split('T')[0] : ''}
            onChange={(e) => setFinishDate(new Date(e.target.value))}
            placeholder="Enter finish date"
            type="date"
          />

          <RDropdown
            variable={priority}
            setVariable={setPriority}
            toggleText="Priority"
            itemsArray={[...TodoPriorities]}
          />

          <RDropdown
            variable={status}
            setVariable={setStatus}
            toggleText="Status"
            itemsArray={[...TodoStatuses]}
          />

          <RDropdown
            variable={responsibleLogin}
            setVariable={setResponsibleLogin}
            toggleText="Responsible"
            itemsArray={[...userLogins]}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>

        <Button
          variant="outline-success"
          disabled={addTODODisabledButtonStatus}
          onClick={handleTODO}
        >
          {`${todoText} TODO`}
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateTODO;
