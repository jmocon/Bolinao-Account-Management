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

import { getEWT, updateEWT } from 'api/ewt';

const Update = ({ id, isOpen, toggle }) => {
  const [taxType, setTaxType] = useState('');
  const [description, setDescription] = useState('');
  const [taxRate, setTaxRate] = useState(0);
  const [atc, setAtc] = useState('');

  const [submitted, setSubmitted] = useState(false);

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

  useEffect(() => {
    const fetchData = async () => {
      let ewt = {};
      try {
        ewt = await getEWT(id);
      } catch (error) {
        setNotif({
          color: 'danger',
          message: `Error while fetching EWT: ${error}`,
          visible: true
        });
      }

      setTaxType(ewt.taxType);
      setDescription(ewt.description);
      setTaxRate(ewt.taxRate);
      setAtc(ewt.atc);
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const CheckContent = () => {
    if (!taxType || !description || !atc) {
      return true;
    }

    return false;
  };

  const handleUpdate = async () => {
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
      result = await updateEWT(id,data);
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

    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='xl'>
      <ModalHeader toggle={toggle}>Update EWT</ModalHeader>
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
              value={taxRate}
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
