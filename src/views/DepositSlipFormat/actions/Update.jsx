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
import BankDropdown from 'components/Dropdown/BankDropdown';
import InputFormatXY from '../components/InputFormatXY';
import InputFormat from '../components/InputFormat';
import depositSlipPlaceHolder from '../constant/depositSlipPlaceholder';
import { getDepositSlipFormat, updateDepositSlipFormat } from 'api/depositSlipFormat';

const Update = ({ id, isOpen, toggle, notify }) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [bankId, setBankId] = useState();
  const [position, setPosition] = useState({});

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
        result = await getDepositSlipFormat(id);
      } catch (error) {
        setAlert({
          color: 'danger',
          message: `Error while fetching CheckFormat: ${error}`,
          visible: true
        });
      }

      const format = result.format[0];
      const layout = result.layout.reduce(
        (agg, curr) => ({ ...agg, [curr.type]: curr }),
        {}
      );

      setName(format.name);
      setBankId(format.bankId);
      setPosition(layout);
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
      result = await updateDepositSlipFormat(id, data);
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
    <Modal isOpen={isOpen} toggle={toggle} size='fullscreen'>
      <ModalHeader toggle={toggle}>Update Deposit Slip Format</ModalHeader>
      <ModalBody>
        <Alert color={alert.color} isOpen={alert.visible} toggle={onDismiss}>
          {alert.message}
        </Alert>
        <Row className='mb-2'>
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
          <Col sm='3' style={{ maxHeight: '50vh', overflowY: 'auto' }}>
            <Row>
              <Col>
                <Label>Account Number</Label>
                <InputFormatXY
                  value={position?.accountNumber}
                  name='accountNumber'
                  onChange={handlePosition}
                />
                <InputFormat
                  label='Font Size'
                  value={position?.accountNumber?.fontSize}
                  name='accountNumber'
                  format='fontSize'
                  onChange={handlePosition}
                />
                <InputFormat
                  label='Letter Spacing'
                  value={position?.accountNumber?.letterSpacing}
                  name='accountNumber'
                  format='letterSpacing'
                  onChange={handlePosition}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label>Account Name</Label>
                <InputFormatXY
                  value={position?.accountName}
                  name='accountName'
                  onChange={handlePosition}
                />
                <InputFormat
                  label='Font Size'
                  value={position?.accountName?.fontSize}
                  name='accountName'
                  format='fontSize'
                  onChange={handlePosition}
                />
                <InputFormat
                  label='Width'
                  value={position?.accountName?.width}
                  name='accountName'
                  format='width'
                  onChange={handlePosition}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label>Cash Domination</Label>
                <InputFormatXY
                  value={position?.cashDomination}
                  name='cashDomination'
                  onChange={handlePosition}
                />
                <InputFormat
                  label='Font Size'
                  value={position?.cashDomination?.fontSize}
                  name='cashDomination'
                  format='fontSize'
                  onChange={handlePosition}
                />
                <InputFormat
                  label='Margin'
                  value={position?.cashDomination?.margin}
                  name='cashDomination'
                  format='margin'
                  onChange={handlePosition}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label>No. of Pieces</Label>
                <InputFormatXY
                  value={position?.cashPieces}
                  name='cashPieces'
                  onChange={handlePosition}
                />
                <InputFormat
                  label='Font Size'
                  value={position?.cashPieces?.fontSize}
                  name='cashPieces'
                  format='fontSize'
                  onChange={handlePosition}
                />
                <InputFormat
                  label='Margin'
                  value={position?.cashPieces?.margin}
                  name='cashPieces'
                  format='margin'
                  onChange={handlePosition}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label>Cash Amount</Label>
                <InputFormatXY
                  value={position?.cashAmount}
                  name='cashAmount'
                  onChange={handlePosition}
                />
                <InputFormat
                  label='Font Size'
                  value={position?.cashAmount?.fontSize}
                  name='cashAmount'
                  format='fontSize'
                  onChange={handlePosition}
                />
                <InputFormat
                  label='Margin'
                  value={position?.cashAmount?.margin}
                  name='cashAmount'
                  format='margin'
                  onChange={handlePosition}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label>Cash Total</Label>
                <InputFormatXY
                  value={position?.cashTotal}
                  name='cashTotal'
                  onChange={handlePosition}
                />
                <InputFormat
                  label='Font Size'
                  value={position?.cashTotal?.fontSize}
                  name='cashTotal'
                  format='fontSize'
                  onChange={handlePosition}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label>Check Bank</Label>
                <InputFormatXY
                  value={position?.checkBank}
                  name='checkBank'
                  onChange={handlePosition}
                />
                <InputFormat
                  label='Font Size'
                  value={position?.checkBank?.fontSize}
                  name='checkBank'
                  format='fontSize'
                  onChange={handlePosition}
                />
                <InputFormat
                  label='Margin'
                  value={position?.checkBank?.margin}
                  name='checkBank'
                  format='margin'
                  onChange={handlePosition}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label>Check Number</Label>
                <InputFormatXY
                  value={position?.checkNumber}
                  name='checkNumber'
                  onChange={handlePosition}
                />
                <InputFormat
                  label='Font Size'
                  value={position?.checkNumber?.fontSize}
                  name='checkNumber'
                  format='fontSize'
                  onChange={handlePosition}
                />
                <InputFormat
                  label='Margin'
                  value={position?.checkNumber?.margin}
                  name='checkNumber'
                  format='margin'
                  onChange={handlePosition}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label>Check Amount</Label>
                <InputFormatXY
                  value={position?.checkAmount}
                  name='checkAmount'
                  onChange={handlePosition}
                />
                <InputFormat
                  label='Font Size'
                  value={position?.checkAmount?.fontSize}
                  name='checkAmount'
                  format='fontSize'
                  onChange={handlePosition}
                />
                <InputFormat
                  label='Margin'
                  value={position?.checkAmount?.margin}
                  name='checkAmount'
                  format='margin'
                  onChange={handlePosition}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label>Check Total</Label>
                <InputFormatXY
                  value={position?.checkTotal}
                  name='checkTotal'
                  onChange={handlePosition}
                />
                <InputFormat
                  label='Font Size'
                  value={position?.checkTotal?.fontSize}
                  name='checkTotal'
                  format='fontSize'
                  onChange={handlePosition}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label>Grand Total</Label>
                <InputFormatXY
                  value={position?.grandTotal}
                  name='grandTotal'
                  onChange={handlePosition}
                />
                <InputFormat
                  label='Font Size'
                  value={position?.grandTotal?.fontSize}
                  name='grandTotal'
                  format='fontSize'
                  onChange={handlePosition}
                />
              </Col>
            </Row>
          </Col>
          <Col>
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
                  {Object.entries(position).map(([key, value]) => {
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
