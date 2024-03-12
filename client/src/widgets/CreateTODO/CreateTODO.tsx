import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import { TodoPriorities, TodoStatuses } from '.';
// TODO pass as prop
import { createDevice } from '../../http/deviceAPI'; // TODO rename device -> todoAPI
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
  const [addTODODisabledButtonStatus, setAddTODODisabledButtonStatus] = useState<boolean>(true);

  const addTODO = () => {
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('description', description);
    formData.append('finishDate', finishDate ? finishDate.toISOString() : ''); // TODO string to DB
    formData.append('priority', priority);
    formData.append('status', status);
    formData.append('creator', creator ? creator.toString() : '');

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
