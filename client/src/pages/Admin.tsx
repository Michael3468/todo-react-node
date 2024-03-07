import { useState } from 'react';
import { Button, Col, Container } from 'react-bootstrap';

import { CreateTODO } from '../components/modals';
import { mainTheme } from '../constants';

const Admin = () => {
  const [todoVisible, setTodoVisible] = useState<boolean>(false);

  return (
    <Container
      className="d-flex align-items-center"
      style={{ height: window.innerHeight - mainTheme.header.height }}
    >
      <Col xs={8} sm={8} md={6} className="d-flex flex-column ms-auto me-auto mt-auto mb-auto">
        <Button variant="outline-dark" className="mt-4" onClick={() => setTodoVisible(true)}>
          Add TODO
        </Button>

        <CreateTODO show={todoVisible} onHide={() => setTodoVisible(false)} />
      </Col>
    </Container>
  );
};

export default Admin;
