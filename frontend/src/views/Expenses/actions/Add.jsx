import React, { useEffect, useState } from 'react';
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

import CompanyDropdown from 'components/Dropdown/CompanyDropdown';
import SupplierDropdown from 'components/Dropdown/SupplierDropdown';
import EWTDropdown from 'components/Dropdown/EWTDropdown';
import ExpenseCategoryDropdown from 'components/Dropdown/Disbursement/ExpenseCategoryDropdown';

import numberToCurrency from 'helper/numberToCurrency';

import { getEWT } from 'api/ewt';
import ItemCodeDropdown from 'components/Dropdown/ItemCodeDropdown';
import computeDisbursement from 'helper/computeDisbursement';
import { addExpense } from 'api/expense';
import ModeOfPaymentDropdown from 'components/Dropdown/Disbursement/ModeOfPaymentDropdown';
import defaultAlert from 'constants/defaultAlert';

const Add = ({ onChange, notify }) => {
  const [alert, setAlert] = useState(defaultAlert);
  const onDismiss = () => setAlert(defaultAlert);

  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen((currState) => !currState);
  };

  const [inputs, setInputs] = useState({});
  const handleInput = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const [hasEwt, setHasEwt] = useState(false);
  const [ewt, setEwt] = useState({});
  useEffect(() => {
    const fetchEWT = async () => {
      if (hasEwt && inputs?.ewtId) {
        const selectedEWT = await getEWT(inputs?.ewtId);
        setEwt(selectedEWT);
        return;
      }
      setEwt({ taxRate: 0 });
    };

    fetchEWT();
  }, [hasEwt, inputs?.ewtId]);

  const [vat, setVat] = useState(0);
  const [gross, setGross] = useState(0);
  const [ewtAmount, setEwtAmount] = useState(0);
  const [net, setNet] = useState(0);

  useEffect(() => {
    const result = computeDisbursement(
      Number(inputs.nonVatableAmount),
      Number(inputs.vatableAmount),
      ewt.taxRate
    );

    setVat(result.vat);
    setGross(result.gross);
    setEwtAmount(result.ewt);
    setNet(result.net);
  }, [ewt.taxRate, inputs.nonVatableAmount, inputs.vatableAmount]);

  const handleAdd = async (status = 1) => {
    try {
      await addExpense({ ...inputs, status });
    } catch (error) {
      console.log(error);
      return;
    }

    onChange();
    notify('success', 'Successfully added expense.', 'tim-icons icon-check-2');
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
        <i className='fa fa-plus'></i> New Expense
      </Button>
      <Modal isOpen={isOpen} toggle={toggleModal} size='xl'>
        <ModalHeader toggle={toggleModal}>New Expense</ModalHeader>
        <ModalBody>
          <Alert color={alert.color} isOpen={alert.visible} toggle={onDismiss}>
            {alert.message}
          </Alert>

          <Row className='mb-2'>
            <Col lg='4' md='6' sm='12'>
              <Label>Date</Label>
              <Input
                type='date'
                value={inputs?.expenseDate}
                onChange={(e) => handleInput('expenseDate', e.target.value)}
              />
            </Col>
            <Col lg='4' md='6' sm='12'>
              <Label>Company</Label>
              <CompanyDropdown
                value={inputs?.companyId}
                onChange={(e) => handleInput('companyId', e)}
              />
            </Col>
            <Col lg='4' md='6' sm='12'>
              <Label>Expense Category</Label>
              <ExpenseCategoryDropdown
                value={inputs?.expenseCategory}
                onChange={(e) => handleInput('expenseCategory', e)}
              />
            </Col>
          </Row>
          <Row className='mb-2'>
            <Col lg='4' md='6' sm='12'>
              <Label>Item Code</Label>
              <ItemCodeDropdown
                label='Item Code'
                value={inputs?.itemCode}
                onChange={(e) => handleInput('itemCode', e)}
              />
            </Col>
            <Col lg='4' md='12'>
              <Label>Supplier</Label>
              <SupplierDropdown
                value={inputs?.supplierId}
                onChange={(e) => handleInput('supplierId', e)}
              />
            </Col>
          </Row>
          <Row className='mb-2'>
            <Col>
              <Label>Particulars</Label>
              <Input
                type='textarea'
                placeholder='Particulars'
                value={inputs?.particulars}
                onChange={(e) => handleInput('particulars', e.target.value)}
              />
            </Col>
          </Row>
          <hr />
          <Row className='mb-2'>
            <Col lg='4' md='6' sm='12'>
              <Label>Vatable Amount</Label>
              <Input
                type='number'
                placeholder='Amount'
                value={inputs?.vatableAmount}
                onChange={(e) => handleInput('vatableAmount', e.target.value)}
              />
            </Col>
            <Col lg='4' md='6' sm='12'>
              <Label>VAT</Label>
              <span className='form-control'>{numberToCurrency(vat)}</span>
            </Col>
          </Row>
          <Row className='mb-2'>
            <Col lg='4' md='6' sm='12'>
              <Label>Non-Vatable Amount</Label>
              <Input
                type='number'
                placeholder='Amount'
                value={inputs?.nonVatableAmount}
                onChange={(e) =>
                  handleInput('nonVatableAmount', e.target.value)
                }
              />
            </Col>
            <Col lg='4' md='6' sm='12'>
              <Label>Gross Amount</Label>
              <span className='form-control'>{numberToCurrency(gross)}</span>
            </Col>
          </Row>
          <Row className='mb-2'>
            <Col lg='2' md='6' sm='6'>
              <Label>EWT</Label>
              <p>
                <Input
                  type='checkbox'
                  defaultValue={hasEwt}
                  onChange={(e) => {
                    setHasEwt(e.target.checked);
                    handleInput('ewtId', null);
                  }}
                  style={{
                    marginLeft: '0px',
                    marginRight: '5px',
                    marginTop: '10px',
                    position: 'relative'
                  }}
                />{' '}
                with EWT
              </p>
            </Col>
            {hasEwt && (
              <>
                <Col lg='2' md='6' sm='6'>
                  <Label>Code</Label>
                  <EWTDropdown
                    value={inputs?.ewtId}
                    onChange={(e) => handleInput('ewtId', e)}
                  />
                </Col>
                <Col lg='4' md='6' sm='12'>
                  <Label>EWT Rate</Label>
                  <span className='form-control'>{ewt.taxRate} %</span>
                </Col>
                <Col lg='4' md='6' sm='12'>
                  <Label>EWT Amount</Label>
                  <span className='form-control'>
                    {numberToCurrency(ewtAmount)}
                  </span>
                </Col>
              </>
            )}
          </Row>
          <Row className='mb-2'>
            <Col lg='4' md='6' sm='12'>
              <Label>NET Amount</Label>
              <span className='form-control'>{numberToCurrency(net)}</span>
            </Col>
          </Row>
          <hr />
          <Row className='mb-2'>
            <Col lg='4' md='12'>
              <Label>Mode of Payment</Label>
              <ModeOfPaymentDropdown
                value={inputs?.modeOfPayment}
                onChange={(e) => handleInput('modeOfPayment', e)}
              />
            </Col>
            <Col lg='4' md='12'>
              <Label>Invoice Date</Label>
              <Input
                type='date'
                value={inputs?.invoiceDate}
                onChange={(e) => handleInput('invoiceDate', e.target.value)}
              />
            </Col>
            <Col lg='4' md='6' sm='12'>
              <Label>Invoice Number</Label>
              <Input
                value={inputs?.invoiceNumber}
                placeholder='Invoice Number'
                onChange={(e) => handleInput('invoiceNumber', e.target.value)}
              />
            </Col>
          </Row>
          <hr />
          <Row className='mb-2'>
            <Col>
              <Label>Remarks</Label>
              <Input
                type='textarea'
                placeholder='Remarks'
                value={inputs?.remarks}
                onChange={(e) => handleInput('remarks', e.target.value)}
              />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter className='p-4 justify-content-end'>
          <Button color='primary' onClick={() => handleAdd(0)} className='mr-2'>
            Draft
          </Button>
          <Button color='info' onClick={() => handleAdd(1)} className='mr-2'>
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
