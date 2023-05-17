import React, { useState } from 'react';
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

import { addCompany } from 'api/company';

const Add = ({ onChange, notify }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setCode('');
    setName('');
    setAddress('');
    setTin('');
    onDismiss();
    setSubmitted(false);
    setIsOpen((currState) => !currState);
  };

  const [code, setCode] = useState();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [tin, setTin] = useState();

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

  const handleAdd = async () => {
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
      result = await addCompany(data);
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

    onChange();
    notify(
      'success',
      'Successfully added bank account.',
      'tim-icons icon-check-2'
    );
    toggleModal();
  };

  return (
    <>
      <Button
        color='info'
        size='sm'
        title='Add'
        onClick={toggleModal}
        className='animation-on-hover'>
        <i className='fa fa-plus'></i> New Company
      </Button>
      <Modal isOpen={isOpen} toggle={toggleModal} size='xl'>
        <ModalHeader toggle={toggleModal}>Add Company</ModalHeader>
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
            <Col>
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
          <Button color='info' onClick={handleAdd} className='mr-2'>
            Add
          </Button>
          <Button color='default' onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Add;
