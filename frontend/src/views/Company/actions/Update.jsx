import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  Alert
} from 'reactstrap';

import { getCompany, updateCompany } from 'api/company';

const Update = ({ id, isOpen, toggle, notify }) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [tin, setTin] = useState('');

  const [submitted, setSubmitted] = useState(false);

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

  const CheckContent = () => !code || !name || !tin;

  useEffect(() => {
    const fetchData = async () => {
      let company = {};
      try {
        company = await getCompany(id);
      } catch (error) {
        setAlert({
          color: 'danger',
          message: `Error while fetching Company: ${error}`,
          visible: true
        });
      }

      setCode(company.code);
      setName(company.name);
      setAddress(company.address);
      setTin(company.tin);
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleUpdate = async () => {
    setSubmitted(true);

    if (CheckContent()) {
      setAlert({
        color: 'danger',
        message: 'Complete all required fields',
        visible: true
      });
      return;
    }

    const data = { code, name, address, tin };

    let result;
    try {
      result = await updateCompany(id, data);
    } catch (error) {
      setAlert({
        color: 'danger',
        message: error,
        visible: true
      });
      return;
    }

    if (!result.success) {
      setAlert({
        color: 'danger',
        message: result.message,
        visible: true
      });
      return;
    }

    notify(
      'success',
      'Successfully updated company.',
      'tim-icons icon-check-2'
    );

    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='xl'>
      <ModalHeader toggle={toggle}>Update Company</ModalHeader>
      <ModalBody>
        <Alert color={alert.color} isOpen={alert.visible} toggle={onDismiss}>
          {alert.message}
        </Alert>
        <Row>
          <Col>
            <Label>Code</Label>
            <Input
              value={code}
              placeholder='Code'
              invalid={!code && submitted}
              onChange={(e) => setCode(e.target.value)}
            />
          </Col>
          <Col>
            <Label>Name</Label>
            <Input
              value={name}
              placeholder='Name'
              invalid={!name && submitted}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
          <Col>
            <Label>TIN</Label>
            <Input
              value={tin}
              placeholder='TIN'
              invalid={!tin && submitted}
              onChange={(e) => setTin(e.target.value)}
            />
          </Col>
        </Row>
        <Row className='mb-2'>
          <Col lg='4'>
            <Label>Address</Label>
            <Input
              type='textarea'
              defaultValue={address}
              placeholder='Address'
              onChange={(e) => setAddress(e.target.value)}
            />
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className='p-4 justify-content-end'>
        <Button color='info' onClick={handleUpdate} className='mr-2'>
          Update
        </Button>
        <Button color='default' onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Update;
