import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';

import { createDevice } from '../../http/deviceAPI';

// TODO: TDeviceInfo ?
type TInfo = {
  id: number;
  title: string;
  description: string;
};

type Props = {
  show: boolean;
  onHide: () => void;
};

const CreateDevice: FC<Props> = observer(({ show, onHide }) => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [info, setInfo] = useState<TInfo[]>([]);
  const [addDeviceDisabledButtonStatus, setAddDeviceDisabledButtonStatus] = useState<boolean>(true);

  // TODO remove info
  const addInfo = () => {
    setInfo([{ title: '', description: '', id: Date.now() }, ...info]);
  };

  const removeInfo = (id: number) => {
    setInfo(info.filter((i) => i.id !== id));
  };

  const changeInfo = (key: string, value: string, id: number) => {
    setInfo(info.map((i) => (i.id === id ? { ...i, [key]: value } : i)));
  };

  // TODO rename to addTODO
  const addDevice = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', `${price}`);
    formData.append('info', JSON.stringify(info));

    createDevice(formData).then(() => onHide());
  };

  useEffect(() => {
    if (name && price) {
      setAddDeviceDisabledButtonStatus(false);
    } else {
      setAddDeviceDisabledButtonStatus(true);
    }
  }, [name, price]);

  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add TODO</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Control
            className="mt-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter TODO"
          />
          <Form.Control
            className="mt-3"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Enter device price"
            type="number"
          />

          <hr />
          <Button variant="outline-dark" onClick={addInfo}>
            Add new property
          </Button>
          {info.map((i) => (
            <Card key={i.id} className="mt-2 mb-2 p-2">
              <Row className="mt-2">
                <Col lg={5} className="mb-2">
                  <Form.Control
                    value={i.title}
                    onChange={(e) => changeInfo('title', e.target.value, i.id)}
                    placeholder="Name"
                  />
                </Col>
                <Col lg={5} className="mb-2">
                  <Form.Control
                    value={i.description}
                    onChange={(e) => changeInfo('description', e.target.value, i.id)}
                    placeholder="Description"
                  />
                </Col>
                <Col md={2} className="mb-2">
                  <Button variant="outline-danger" onClick={() => removeInfo(i.id)}>
                    Delete
                  </Button>
                </Col>
              </Row>
            </Card>
          ))}
        </Form>
      </Modal.Body>

      {/* TODO rename to addTODO */}
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button
          variant="outline-success"
          disabled={addDeviceDisabledButtonStatus}
          onClick={addDevice}
        >
          Add Device
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevice;
