import { observer } from 'mobx-react-lite';
import { FC, useContext, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import { TodoPriorities, TodoStatuses } from '.';
import { StoreContext } from '../..';
import { createTODO, editTODO } from '../../shared/api';
import { getUsers } from '../../shared/lib';
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
  const [creator, setCreator] = useState<string>('');
  const [responsible, setResponsible] = useState<string>('');
  const [responsibleLogin, setResponsibleLogin] = useState<string>('');
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [userLogins, setUserLogins] = useState<string[]>([]);
  const [isAddTODOButtonDisabled, setIsAddTODOButtonDisabled] = useState<boolean>(true);
  const [isEditDisabled, setIsEditDisabled] = useState<boolean>(false);

  const handleTODOButtonClick = async () => {
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('description', description);
    formData.append('finishDate', finishDate ? finishDate.toISOString() : '');
    formData.append('priority', priority);
    formData.append('status', status);
    formData.append('creator', creator ? creator.toString() : '');
    formData.append('responsible', responsible ? responsible.toString() : '');

    if (todoText === 'Create') {
      await createTODO(formData)
        .then(() => {
          onHide();
          setCaption('');
          setDescription('');
          setFinishDate(null);
          setPriority('');
          setStatus('');
          setResponsible('');
        })
        // eslint-disable-next-line no-console
        .catch((error) => console.error(error));
    } else {
      formData.append('id', todoId ? todoId.toString() : '');

      await editTODO(formData)
        .then(() => onHide())
        // eslint-disable-next-line no-console
        .catch((error) => console.error(error));
    }

    todoStore.fetchAllTodos();
  };

  useEffect(() => {
    if (todoText === 'Create') {
      setIsEditDisabled(false);
    }
  }, [todoText]);

  useEffect(() => {
    if (todoText === 'Create') {
      setCaption('');
      setDescription('');
      setFinishDate(null);
      setPriority('');
      setStatus('');
      if (userStore.user) {
        setCreator(userStore.user.login);
      }
      setResponsible('');
      setResponsibleLogin('');
    }
  }, [todoText, userStore.user]);

  useEffect(() => {
    if (todoId) {
      const currTodo = todoStore.getTodoById(todoId);
      if (currTodo) {
        setTodo(currTodo);

        if (currTodo.creator === userStore.user?.login) {
          setIsEditDisabled(false);
        } else {
          setIsEditDisabled(true);
        }
      }
    }
  }, [todoId, todoStore, todoStore.todos, todoText, userStore.user?.login]);

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
    if (caption && description && finishDate && priority && status && responsible) {
      setIsAddTODOButtonDisabled(false);
    } else {
      setIsAddTODOButtonDisabled(true);
    }
  }, [caption, description, finishDate, priority, status, responsible]);

  useEffect(() => {
    if (userStore.user?.id) {
      setCreator(userStore.user.login);
    }
  }, [userStore]);

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsersArr = await getUsers();

      if (allUsersArr) {
        setAllUsers(allUsersArr);

        const subordinateUsers = allUsersArr.filter(
          (user) => user.supervisor === userStore.user?.login,
        );

        const userLoginsArr = subordinateUsers.map((user) => user.login);
        if (userStore.user?.login) {
          setUserLogins([...userLoginsArr, userStore.user.login]);
        }
      }
    };

    fetchUsers();
  }, [userStore.user?.login]);

  useEffect(() => {
    const responsibleUser = allUsers.filter((user) => user.login === responsibleLogin);

    if (responsibleUser.length) {
      setResponsible(responsibleUser[0].login);
    }
  }, [allUsers, responsibleLogin]);

  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {`${todoText} TODO ${
            todoText === 'Edit'
              ? `| Creator: ${todo?.creator === userStore.user?.login ? 'You' : todo?.creator}`
              : ''
          }`}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Control
            className="mt-3"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Enter caption"
            disabled={isEditDisabled}
          />

          <Form.Control
            className="mt-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            disabled={isEditDisabled}
          />

          <Form.Control
            className="mt-3"
            value={finishDate ? finishDate.toISOString().split('T')[0] : ''}
            onChange={(e) => setFinishDate(new Date(e.target.value))}
            placeholder="Enter finish date"
            type="date"
            disabled={isEditDisabled}
          />

          <RDropdown
            variable={priority}
            setVariable={setPriority}
            toggleText="Priority"
            itemsArray={[...TodoPriorities]}
            disabled={isEditDisabled}
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
            disabled={isEditDisabled}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>

        <Button
          variant="outline-success"
          disabled={isAddTODOButtonDisabled}
          onClick={handleTODOButtonClick}
        >
          {`${todoText} TODO`}
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateTODO;
