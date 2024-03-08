import { FC } from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import noImage from '../assets/images/no-image.png';
import star from '../assets/images/star.svg';
import { ROUTE } from '../constants';
import { IDevice } from '../types';

type Props = {
  device: IDevice;
};

const DeviceItem: FC<Props> = ({ device }) => {
  const navigate = useNavigate();

  return (
    <Col
      className="d-flex align-items-center mt-3"
      onClick={() => navigate(`${ROUTE.DEVICE}/${device.id}`)}
    >
      <Card style={{ cursor: 'pointer' }}>
        <Image
          style={{ borderRadius: 'inherit' }}
          className="w-100"
          src={device.img.length ? process.env.REACT_APP_API_URL + device.img : noImage}
        />
        <div className="p-2">
          <div className="d-flex  justify-content-between">
            <div>{device.name}</div>
            <div className="d-flex align-items-center">
              <div>{device.rating}</div>
              <Image className="ms-1" width={20} height={20} src={star} />
            </div>
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default DeviceItem;
