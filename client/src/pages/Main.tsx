import { observer } from 'mobx-react-lite';
import { Col, Container } from 'react-bootstrap';

import { TODOList } from '../components';

const Main = observer(() => (
  <Container>
    <Col>
      <Col md={12}>
        <TODOList />
      </Col>
    </Col>
  </Container>
));

export default Main;
