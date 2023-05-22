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
  Alert,
  InputGroup,
  InputGroupText
} from 'reactstrap';

import { addCheckFormat } from 'api/checkFormat';
import BankDropdown from 'components/Dropdown/BankDropdown';
import { checkFormatTypeLabel } from 'constants/checkFormatType';
import confirmOnClose from 'helper/confirmOnClose';
import useAlert from 'helper/useAlert';
import defaultAlert from 'constants/defaultAlert';

const DEFAULT_POSITION = {
  checkDate: { x: 0, y: 0 },
  checkPayee: { x: 0, y: 0 },
  amount: { x: 0, y: 0 },
  amountInWords: { x: 0, y: 0 },
  voucherCode: { x: 0, y: 0 }
};

const Add = ({ onChange, notify }) => {
  const [alert, setAlert] = useState(defaultAlert);
  const alertFn = useAlert(setAlert);

  const [inputs, setInputs] = useState({});
  const [position, setPosition] = useState(DEFAULT_POSITION);
  const [isDirty, setIsDirty] = useState(false);
  const handleInput = (name, value) => {
    setIsDirty(true);
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const [submitted, setSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const cleanAndToggle = () => {
    setIsOpen((currState) => !currState);
    setInputs({});
    setIsDirty(false);
    setSubmitted(false);
    setPosition(DEFAULT_POSITION);
    alertFn.dismiss();
  };
  const toggleModal = () => {
    if (!confirmOnClose(isDirty)) return;
    cleanAndToggle();
  };

  const CheckContent = () => !inputs.name || !inputs.bankId;

  const handleAdd = async () => {
    setSubmitted(true);

    if (CheckContent()) {
      alertFn.danger('Complete all required fields');
      return;
    }

    let result;
    try {
      result = await addCheckFormat({ ...inputs, position });
    } catch (error) {
      alertFn.danger(`Error occurred while adding check format: ${error}`);
      return;
    }

    if (!result.success) {
      alertFn.danger(
        `Error occurred while adding check format: ${result.message}`
      );
      return;
    }

    onChange();
    notify(
      'success',
      'Successfully added check format.',
      'tim-icons icon-check-2'
    );
    cleanAndToggle();
  };

  const handlePosition = (type, direction, value) => {
    setPosition((prev) => ({
      ...prev,
      [type]: { ...prev[type], [direction]: value }
    }));
  };

  return (
    <>
      <Button
        color='info'
        size='sm'
        title='Add'
        onClick={toggleModal}
        className='animation-on-hover'>
        <i className='fa fa-plus'></i> New Check Format
      </Button>
      <Modal isOpen={isOpen} toggle={toggleModal} size='xl'>
        <ModalHeader toggle={toggleModal}>Add Check Format</ModalHeader>
        <ModalBody>
          <Alert
            color={alert.color}
            isOpen={alert.visible}
            toggle={alertFn.dismiss}>
            {alert.message}
          </Alert>
          <Row className='mb-2'>
            <Col>
              <Label>Bank</Label>
              <BankDropdown
                label='Bank'
                value={inputs.bankId}
                invalid={!inputs.bankId && submitted}
                onChange={(e) => handleInput('bankId', e)}
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
          </Row>
          <Row>
            <Col>
              <Label>Check Date</Label>
              <InputGroup>
                <InputGroupText>X</InputGroupText>
                <Input
                  type='number'
                  value={position?.checkDate?.x}
                  placeholder='Left'
                  onChange={(e) =>
                    handlePosition('checkDate', 'x', e.target.value)
                  }
                />
                <InputGroupText>Y</InputGroupText>
                <Input
                  type='number'
                  value={position?.checkDate?.y}
                  placeholder='Top'
                  onChange={(e) =>
                    handlePosition('checkDate', 'y', e.target.value)
                  }
                />
              </InputGroup>
            </Col>
            <Col>
              <Label>Check Payee</Label>
              <InputGroup>
                <InputGroupText>X</InputGroupText>
                <Input
                  type='number'
                  value={position?.checkPayee?.x}
                  placeholder='Left'
                  onChange={(e) =>
                    handlePosition('checkPayee', 'x', e.target.value)
                  }
                />
                <InputGroupText>Y</InputGroupText>
                <Input
                  type='number'
                  value={position?.checkPayee?.y}
                  placeholder='Top'
                  onChange={(e) =>
                    handlePosition('checkPayee', 'y', e.target.value)
                  }
                />
              </InputGroup>
            </Col>
            <Col>
              <Label>Voucher Code</Label>
              <InputGroup>
                <InputGroupText>X</InputGroupText>
                <Input
                  type='number'
                  value={position?.voucherCode?.x}
                  placeholder='Left'
                  onChange={(e) =>
                    handlePosition('voucherCode', 'x', e.target.value)
                  }
                />
                <InputGroupText>Y</InputGroupText>
                <Input
                  type='number'
                  value={position?.voucherCode?.y}
                  placeholder='Top'
                  onChange={(e) =>
                    handlePosition('voucherCode', 'y', e.target.value)
                  }
                />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Label>Amount</Label>
              <InputGroup>
                <InputGroupText>X</InputGroupText>
                <Input
                  type='number'
                  value={position?.amount?.x}
                  placeholder='Left'
                  onChange={(e) =>
                    handlePosition('amount', 'x', e.target.value)
                  }
                />
                <InputGroupText>Y</InputGroupText>
                <Input
                  type='number'
                  value={position?.amount?.y}
                  placeholder='Top'
                  onChange={(e) =>
                    handlePosition('amount', 'y', e.target.value)
                  }
                />
              </InputGroup>
            </Col>
            <Col md={4}>
              <Label>Amount in Words</Label>
              <InputGroup>
                <InputGroupText>X</InputGroupText>
                <Input
                  type='number'
                  value={position?.amountInWords?.x}
                  placeholder='Left'
                  onChange={(e) =>
                    handlePosition('amountInWords', 'x', e.target.value)
                  }
                />
                <InputGroupText>Y</InputGroupText>
                <Input
                  type='number'
                  value={position?.amountInWords?.y}
                  placeholder='Top'
                  onChange={(e) =>
                    handlePosition('amountInWords', 'y', e.target.value)
                  }
                />
              </InputGroup>
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
                {Object.entries(position).map(([key, value]) => {
                  const { x, y } = value;
                  return (
                    <div
                      key={`${key}`}
                      style={{
                        position: 'absolute',
                        top: `${y}px`,
                        left: `${x}px`,
                        width: '200px',
                        height: '10px'
                      }}>
                      {checkFormatTypeLabel[key]}
                    </div>
                  );
                })}
              </div>
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
