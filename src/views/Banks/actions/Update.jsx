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
import { getBank, updateBank } from 'api/bank';

const Update = ({ id, isOpen, toggle, notify }) => {
  const [name, setName] = useState('');
  const [abbr, setAbbr] = useState('');

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

  useEffect(() => {
    const fetchData = async () => {
      let bank = {};
      try {
        bank = await getBank(id);
      } catch (error) {
        setAlert({
          color: 'danger',
          message: `Error while fetching Bank: ${error}`,
          visible: true
        });
      }

      setName(bank.name);
      setAbbr(bank.abbr);
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const CheckContent = () => {
    return !name || !abbr;
  };

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

    const data = {
      name,
      abbr
    };

    let result;
    try {
      result = await updateBank(id, data);
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
      'Successfully updated bank.',
      'tim-icons icon-check-2'
    );

    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='xl'>
      <ModalHeader toggle={toggle}>Update Bank</ModalHeader>
      <ModalBody>
        <Alert color={alert.color} isOpen={alert.visible} toggle={onDismiss}>
          {alert.message}
        </Alert>
        <Row>
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
            <Label>Abbreviation</Label>
            <Input
              value={abbr}
              placeholder='Abbreviation'
              onChange={(e) => setAbbr(e.target.value)}
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
