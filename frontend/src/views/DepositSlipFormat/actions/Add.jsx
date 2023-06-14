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

import { addDepositSlipFormat } from 'api/depositSlipFormat';
import BankDropdown from 'components/Dropdown/BankDropdown';
import InputFormat from '../components/InputFormat';
import InputFormatXY from '../components/InputFormatXY';
import depositSlipPlaceHolder from '../constant/depositSlipPlaceholder';
import defaultAlert from 'constants/defaultAlert';
import useAlert from 'helper/useAlert';
import confirmOnClose from 'helper/confirmOnClose';


const Add = ({ onChange, notify }) => {
  const [alert, setAlert] = useState(defaultAlert);
  const alertFn = useAlert(setAlert);

  const [inputs, setInputs] = useState({});
  const [position, setPosition] = useState({});
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
    setPosition({});
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
      result = await addDepositSlipFormat({ ...inputs, position });
    } catch (error) {
      alertFn.danger(`Error occurred while adding deposit slip: ${error}`);
      return;
    }

    if (!result.success) {
      alertFn.danger(
        `Error occurred while adding deposit slip: ${result.message}`
      );
      return;
    }

    onChange();
    notify(
      'success',
      'Successfully added deposit slip format.',
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
        <i className='fa fa-plus'></i> New Deposit Slip Format
      </Button>
      <Modal isOpen={isOpen} toggle={toggleModal} size='fullscreen'>
        <ModalHeader toggle={toggleModal}>Add Deposit Slip Format</ModalHeader>
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
          <Button color='info' onClick={handleAdd} className='mr-2'>
            Add
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Add;
