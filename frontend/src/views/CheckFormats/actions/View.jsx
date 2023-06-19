import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Alert
} from 'reactstrap';

import { getCheckFormat } from 'api/checkFormat';
import { checkFormatTypeLabel } from 'constants/checkFormatType';

const View = ({ id, isOpen, toggle }) => {
  const [data, setData] = useState({});

  // Notification
  const [alert, setAlert] = useState({
    color: 'primary',
    message: '',
    visible: false
  });
  const onDismiss = () =>
    setAlert({
      color: 'primary',
      message: '',
      visible: false
    });

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const result = await getCheckFormat(id);
        setData(result);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='xl'>
      <ModalHeader toggle={toggle}>View CheckFormat</ModalHeader>
      <ModalBody>
        <Alert color={alert.color} isOpen={alert.visible} toggle={onDismiss}>
          {alert.message}
        </Alert>
        <Row className='mb-2'>
          <Col>
            <Label>Bank</Label>
            <span className='form-control'>
              {data?.check ? data?.check[0].bankName : ''}
            </span>
          </Col>
          <Col>
            <Label>Name</Label>
            <span className='form-control'>
              {data?.check ? data?.check[0]?.name : ''}
            </span>
          </Col>
        </Row>
        <Row>
          <Col className='overflow-auto border' style={{ maxHeight: '50vh' }}>
            <div
              style={{
                position: 'relative',
                width: '100px',
                height: '50vh'
              }}>
              {data?.checkFormat?.map((format) => {
                const { type, x, y } = format;
                return (
                  <div
                    key={type}
                    style={{
                      position: 'absolute',
                      top: `${y}px`,
                      left: `${x}px`,
                      width: '200px',
                      height: '10px'
                    }}>
                    {checkFormatTypeLabel[type]}
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className='p-4 justify-content-end'></ModalFooter>
    </Modal>
  );
};

export default View;
