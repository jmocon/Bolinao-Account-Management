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
import defaultAlert from 'constants/defaultAlert';
import useAlert from 'helper/useAlert';
import confirmOnClose from 'helper/confirmOnClose';

const Update = ({ id, isOpen, toggle, notify }) => {
  const [alert, setAlert] = useState(defaultAlert);
  const alertFn = useAlert(setAlert);

  const [submitted, setSubmitted] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [inputs, setInputs] = useState({});
  const handleInput = (name, value) => {
    setIsDirty(true);
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const toggleModal = () => {
    if (!confirmOnClose(isDirty)) {
      return;
    }

    setInputs({});
    setIsDirty(false);
    toggle();
  };

  const CheckContent = () => !inputs.code || !inputs.name || !inputs.tin;

  useEffect(() => {
    const fetchData = async () => {
      let result = {};
      try {
        result = await getCompany(id);
      } catch (error) {
        setAlert({
          color: 'danger',
          message: `Error while fetching Company: ${error}`,
          visible: true
        });
      }

      setInputs(result);
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleUpdate = async () => {
    setSubmitted(true);

    if (CheckContent()) {
      alertFn.danger('Complete all required fields');
      return;
    }

    let result;
    try {
      result = await updateCompany(id, inputs);
    } catch (error) {
      alertFn.danger(`Error occurred while updating company: ${error}`);
      return;
    }

    if (!result.success) {
      alertFn.danger(
        `Error occurred while updating company: ${result.message}`
      );
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
    <Modal isOpen={isOpen} toggle={toggleModal} size='xl'>
      <ModalHeader toggle={toggleModal}>Update Company</ModalHeader>
      <ModalBody>
        <Alert
          color={alert.color}
          isOpen={alert.visible}
          toggle={alertFn.dismiss}>
          {alert.message}
        </Alert>
        <Row>
          <Col>
            <Label>Code</Label>
            <Input
              placeholder='Code'
              value={inputs.code ?? ''}
              invalid={!inputs.code && submitted}
              onChange={(e) => handleInput('code', e.target.value)}
            />
          </Col>
          <Col>
            <Label>Name</Label>
            <Input
              placeholder='Name'
              value={inputs.name ?? ''}
              invalid={!inputs.name && submitted}
              onChange={(e) => handleInput('name', e.target.value)}
            />
          </Col>
          <Col>
            <Label>TIN</Label>
            <Input
              placeholder='TIN'
              value={inputs.tin ?? ''}
              invalid={!inputs.tin && submitted}
              onChange={(e) => handleInput('tin', e.target.value)}
            />
          </Col>
        </Row>
        <Row className='mb-2'>
          <Col>
            <Label>Address</Label>
            <Input
              type='textarea'
              placeholder='Address'
              value={inputs.address ?? ''}
              invalid={!inputs.address && submitted}
              onChange={(e) => handleInput('address', e.target.value)}
            />
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className='p-4 justify-content-end'>
        <Button color='info' onClick={handleUpdate} className='mr-2'>
          Update
        </Button>
        <Button color='default' onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Update;
