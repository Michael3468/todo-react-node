import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import { TodoPriorities, TodoStatuses } from '.';
// TODO pass as prop
import { createDevice } from '../../http/deviceAPI'; // TODO rename device -> todoAPI
import { getAllUsers } from '../../http/userAPI';
import { IUser } from '../../types';
import RDropdown from './ui/RDropdown';

type CreateTODOProps = {
  show: boolean;
  onHide: () => void;
};

const CreateTODO: FC<CreateTODOProps> = observer(({ show, onHide }) => {
  const [caption, setCaption] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [finishDate, setFinishDate] = useState<Date | null>(null);
  const [priority, setPriority] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [creator, setCreator] = useState<number | null>(null);
  const [responsible, setResponsible] = useState<number | null>(null);
  const [responsibleLogin, setResponsibleLogin] = useState<string>('');
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [userLogins, setUserLogins] = useState<string[]>([]);
  const [addTODODisabledButtonStatus, setAddTODODisabledButtonStatus] = useState<boolean>(true);

  const addTODO = () => {
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('description', description);
    formData.append('finishDate', finishDate ? finishDate.toISOString() : ''); // TODO string to DB
    formData.append('priority', priority);
    formData.append('status', status);
    formData.append('creator', creator ? creator.toString() : '');
    formData.append('responsible', responsible ? responsible.toString() : '');

    createDevice(formData).then(() => onHide());
  };

  useEffect(() => {
    if (caption && description && finishDate && priority) {
      setAddTODODisabledButtonStatus(false);
    } else {
      setAddTODODisabledButtonStatus(true);
    }
  }, [caption, description, finishDate, priority]);

  useEffect(() => {
    const creatorId = localStorage.getItem('userId');
    setCreator(Number(creatorId));
  }, []);

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
    const fetchData = async () => {
      const allUsersArr = await getUsers();
      if (allUsersArr) {
        setAllUsers(allUsersArr);
        const userLoginsArr = allUsersArr.map((user) => user.login);
        setUserLogins(userLoginsArr);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const responsibleUser = allUsers.filter((user) => user.login === responsibleLogin);

    if (responsibleUser.length) {
      setResponsible(responsibleUser[0].id);
    }
  }, [allUsers, responsibleLogin]);

  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add TODO</Modal.Title>
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

        <Button variant="outline-success" disabled={addTODODisabledButtonStatus} onClick={addTODO}>
          Add TODO
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateTODO;
