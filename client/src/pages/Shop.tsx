import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { DeviceList, Pages } from '../components';
import { fetchDevices } from '../http/deviceAPI';
import { StoreContext } from '../index';

const Shop = observer(() => {
  const { deviceStore } = useContext(StoreContext);

  useEffect(() => {
    fetchDevices({ typeId: undefined, brandId: undefined, page: 1, limit: 2 }).then((data) => {
      deviceStore.setDevices(data.rows);
      deviceStore.setTotalCount(data.count);
    });
  }, [deviceStore]);

  useEffect(() => {
    fetchDevices({
      page: deviceStore.page,
      limit: 2,
    }).then((data) => {
      deviceStore.setDevices(data.rows);
      deviceStore.setTotalCount(data.count);
    });
  }, [deviceStore, deviceStore.page]);

  return (
    <Container>
      <Row>
        <Col md={9}>
          <DeviceList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
