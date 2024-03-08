import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

// TODO pass as prop
import { createDevice } from '../../http/deviceAPI';

type CreateTODOProps = {
  show: boolean;
  onHide: () => void;
};

const CreateTODO: FC<CreateTODOProps> = observer(({ show, onHide }) => {
  const [caption, setCaption] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [finishDate, setFinishDate] = useState<Date | null>(null);
  const [priority, setPriority] = useState<string>('');
  const [addTODODisabledButtonStatus, setAddTODODisabledButtonStatus] = useState<boolean>(true);

  const addTODO = () => {
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('description', description);
    formData.append('finishDate', finishDate ? finishDate.toISOString() : ''); // TODO string to DB

    createDevice(formData).then(() => onHide());
  };

  useEffect(() => {
    if (caption && description) {
      setAddTODODisabledButtonStatus(false);
    } else {
      setAddTODODisabledButtonStatus(true);
    }
  }, [caption, description]);

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

          <Form.Control
            className="mt-3"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            placeholder="Enter priority"
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
