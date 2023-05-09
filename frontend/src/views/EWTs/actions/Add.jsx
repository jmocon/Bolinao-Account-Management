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

import { addEWT } from 'api/ewt';

const Add = ({ onChange = () => {} }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setTaxType(null);
    setDescription(null);
    setTaxRate(null);
    setAtc(null);
    onDismiss();
    setSubmitted(false);
    setIsOpen((currState) => !currState);
  };

  const [taxType, setTaxType] = useState();
  const [description, setDescription] = useState();
  const [taxRate, setTaxRate] = useState();
  const [atc, setAtc] = useState();

  // Notification
  const [notif, setNotif] = useState({
    color: 'primary',
    message: '',
    visible: false
  });

  const onDismiss = () =>
    setNotif({
      color: 'primary',
      message: '',
      visible: false
    });

  const CheckContent = () => {
    if (!taxType || !description || !atc) {
      return true;
    }

    return false;
  };

  const handleAdd = async () => {
    setSubmitted(true);

    if (CheckContent()) {
      setNotif({
        color: 'danger',
        message: 'Complete all required fields',
        visible: true
      });
      return;
    }

    const data = {
      taxType,
      description,
      taxRate: taxRate || 0,
      atc
    };

    let result;
    try {
      result = await addEWT(data);
    } catch (error) {
      setNotif({
        color: 'danger',
        message: error,
        visible: true
      });
      return;
    }

    if (!result.success) {
      setNotif({
        color: 'danger',
        message: result.message,
        visible: true
      });
      return;
    }

    onChange();

    toggleModal();
  };

  return (
    <>
      <Button
        color='info'
        size='sm'
        title='View'
        onClick={toggleModal}
        className='animation-on-hover'>
        <i className='fa fa-plus'></i> New EWT
      </Button>
      <Modal isOpen={isOpen} toggle={toggleModal} size='xl'>
        <ModalHeader toggle={toggleModal}>Add EWT</ModalHeader>
        <ModalBody>
          <Alert color={notif.color} isOpen={notif.visible} toggle={onDismiss}>
            {notif.message}
          </Alert>
          <Row>
            <Col lg='4'>
              <Label>Tax Type</Label>
              <Input
                value={taxType}
                placeholder='Tax Type'
                invalid={!taxType && submitted}
                onChange={(e) => setTaxType(e.target.value)}
              />
            </Col>
            <Col lg='4'>
              <Label>Tax Rate (%)</Label>
              <Input
                type='number'
                defaultValue={taxRate}
                placeholder='Tax Rate'
                onChange={(e) => setTaxRate(e.target.value)}
              />
            </Col>
            <Col lg='4'>
              <Label>Alphanumeric Tax Code</Label>
              <Input
                defaultValue={atc}
                placeholder='Alphanumeric Tax Code'
                invalid={!atc && submitted}
                onChange={(e) => setAtc(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Description</Label>
              <Input
                type='textarea'
                defaultValue={description}
                placeholder='Description'
                invalid={!description && submitted}
                onChange={(e) => setDescription(e.target.value)}
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
