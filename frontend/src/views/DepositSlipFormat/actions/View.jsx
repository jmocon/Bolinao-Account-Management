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

import depositSlipPlaceHolder from '../constant/depositSlipPlaceholder';
import { getDepositSlipFormat } from 'api/depositSlipFormat';

const View = ({ id, isOpen, toggle }) => {
  const [format, setFormat] = useState({});
  const [layout, setLayout] = useState({});

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
      const result = await getDepositSlipFormat(id);
      setFormat(result.format[0]);

      const layout = result.layout.reduce(
        (agg, curr) => ({ ...agg, [curr.type]: curr }),
        {}
      );

      setLayout(layout);
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='fullscreen'>
      <ModalHeader toggle={toggle}>View CheckFormat</ModalHeader>
      <ModalBody>
        <Alert color={alert.color} isOpen={alert.visible} toggle={onDismiss}>
          {alert.message}
        </Alert>
        <Row className='mb-2'>
          <Col>
            <Label>Bank</Label>
            <span className='form-control'>{format.bankName || ''}</span>
          </Col>
          <Col>
            <Label>Name</Label>
            <span className='form-control'>{format.name || ''}</span>
          </Col>
        </Row>
        <Row>
          <Col
            className='border'
            style={{ maxHeight: '50vh', overflowY: 'auto' }}>
            <div
              style={{
                position: 'relative',
                width: '100px',
                height: '50vh'
              }}>
              {Object.entries(layout).map(([key, value]) => {
                const { x, y } = value;
                return (
                  <div
                    key={`${key}`}
                    style={{
                      position: 'absolute',
                      top: `${y}px`,
                      left: `${x}px`,
                      width: `${value.width}px` || '200px',
                      fontSize: value.fontSize && `${value.fontSize}px`,
                      letterSpacing:
                        value.letterSpacing && `${value.letterSpacing}px`,
                      height: value.fontSize
                        ? `${value.fontSize * 1.5}px`
                        : '10px',
                      borderBottom: '1px solid #ccc',
                      whiteSpace: 'nowrap'
                    }}>
                    {typeof depositSlipPlaceHolder[key] === typeof [] ? (
                      <ul style={{ padding: '0px' }}>
                        {depositSlipPlaceHolder[key].map((ph, i) => (
                          <li
                            key={`${key}-${i}-${ph}`}
                            style={{
                              marginBottom:
                                value?.margin && `${value?.margin}px`,
                              listStyleType: 'none'
                            }}>
                            {ph}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      depositSlipPlaceHolder[key]
                    )}
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className='p-4 justify-content-end'>
      </ModalFooter>
    </Modal>
  );
};

export default View;
