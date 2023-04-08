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
  Alert,
  InputGroup,
  InputGroupText
} from 'reactstrap';
import { getCheckFormat, updateCheckFormat } from 'api/checkFormat';
import BankDropdown from 'components/Dropdown/BankDropdown';
import { checkFormatTypeLabel } from 'constants/checkFormatType';

const Update = ({ id, isOpen, toggle, notify }) => {
  const [name, setName] = useState('');
  const [bankId, setBankId] = useState();
  const [position, setPosition] = useState({
    checkDate: { x: 0, y: 0 },
    checkPayee: { x: 0, y: 0 },
    amount: { x: 0, y: 0 },
    amountInWords: { x: 0, y: 0 },
    voucherCode: { x: 0, y: 0 }
  });

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
      let result = {};
      try {
        result = await getCheckFormat(id);
      } catch (error) {
        setAlert({
          color: 'danger',
          message: `Error while fetching CheckFormat: ${error}`,
          visible: true
        });
      }

      setName(result.check[0].name);
      setBankId(result.check[0].bankId);
      setPosition(
        result.checkFormat.reduce(
          (agg, curr) => ({ ...agg, [curr.type]: { x: curr.x, y: curr.y } }),
          {}
        )
      );
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const CheckContent = () => {
    return !name || !bankId;
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

    const data = { name, bankId, position };

    let result;
    try {
      result = await updateCheckFormat(id, data);
    } catch (error) {
      setAlert({
        color: 'danger',
        message: error.message,
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
      'Successfully updated check format.',
      'tim-icons icon-check-2'
    );

    toggle();
  };

  const handlePosition = (type, direction, value) => {
    setPosition((prev) => ({
      ...prev,
      [type]: { ...prev[type], [direction]: value }
    }));
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='xl'>
      <ModalHeader toggle={toggle}>Update Check Format</ModalHeader>
      <ModalBody>
        <Alert color={alert.color} isOpen={alert.visible} toggle={onDismiss}>
          {alert.message}
        </Alert>
        <Row>
          <Col>
            <Label>Bank</Label>
            <BankDropdown
              value={bankId}
              label='Bank'
              invalid={!bankId && submitted}
              onChange={setBankId}
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
                onChange={(e) => handlePosition('amount', 'x', e.target.value)}
              />
              <InputGroupText>Y</InputGroupText>
              <Input
                type='number'
                value={position?.amount?.y}
                placeholder='Top'
                onChange={(e) => handlePosition('amount', 'y', e.target.value)}
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
                      width: '2000px',
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
