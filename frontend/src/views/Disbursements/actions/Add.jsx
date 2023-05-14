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
import NonExpenseCategoryDropdown from 'components/Dropdown/Disbursement/NonExpenseCategoryDropdown';

import numberToCurrency from 'helper/numberToCurrency';

import { addDisbursement } from 'api/disbursement';
import { getEWT } from 'api/ewt';
import { getSupplier } from 'api/supplier';
import ItemCodeDropdown from 'components/Dropdown/ItemCodeDropdown';
import BankAccountDropdown from 'components/Dropdown/BankAccountDropdown';
import computeDisbursement from 'helper/computeDisbursement';
import defaultAlert from 'constants/defaultAlert';

const Add = ({ onChange, notify }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputs, setInputs] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const toggleModal = () => {
    if (Object.keys(inputs).length !== 0 || isDirty) {
      const response = window.confirm(
        'There have been changes made. Are you sure you want to close the window?'
      );

      if (!response) {
        return;
      }
    }

    setCheckPayee();
    setInputs({});
    setIsDirty(false);

    setIsOpen((currState) => !currState);
  };

  const handleInput = (name, value) => {
    setIsDirty(true);
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const [checkPayee, setCheckPayee] = useState();
  const [ewt, setEwt] = useState({});
  const [hasEwt, setHasEwt] = useState(false);

  const [vat, setVat] = useState(0);
  const [gross, setGross] = useState(0);
  const [ewtAmount, setEwtAmount] = useState(0);
  const [net, setNet] = useState(0);

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

  const [alert, setAlert] = useState(defaultAlert);
  const onDismiss = () => setAlert(defaultAlert);

  const handleAdd = async (status = 1) => {
    const data = {
      ...inputs,
      status
    };

    try {
      await addDisbursement(data);
    } catch (error) {
      setAlert({
        color: 'danger',
        message: `Error encountered while adding Disbursement: ${error}`,
        visible: true
      });
      return;
    }

    onChange();
    notify(
      'success',
      'Successfully added disbursement.',
      'tim-icons icon-check-2'
    );
    toggleModal();
  };

  useEffect(() => {
    const fetchSupplier = async () => {
      let result;
      try {
        result = await getSupplier(inputs?.supplierId);
      } catch (error) {
        setAlert({ color: 'danger', message: error, visible: true });
      }

      setCheckPayee(result.checkPayee);
    };

    if (inputs?.supplierId) {
      fetchSupplier();
    }
  }, [inputs?.supplierId]);

  useEffect(() => {
    const result = computeDisbursement(
      inputs?.nonVatableAmount,
      inputs?.vatableAmount,
      ewt.taxRate
    );

    setVat(result.vat);
    setGross(result.gross);
    setEwtAmount(result.ewt);
    setNet(result.net);
  }, [ewt.taxRate, inputs?.nonVatableAmount, inputs?.vatableAmount]);

  return (
    <>
      <Button
        color='info'
        size='sm'
        title='View'
        onClick={toggleModal}
        className='animation-on-hover'>
        <i className='fa fa-plus'></i> New Check Disbursement
      </Button>
      <Modal isOpen={isOpen} toggle={toggleModal} size='xl'>
        <ModalHeader toggle={toggleModal}>New Check Disbursement</ModalHeader>
        <ModalBody>
          <Alert color={alert.color} isOpen={alert.visible} toggle={onDismiss}>
            {alert.message}
          </Alert>

          <Row className='mb-2'>
            <Col lg='4' md='6' sm='12'>
              <Label>Month Posting</Label>
              <Input
                type='date'
                value={inputs?.disbursementDate}
                onChange={(e) =>
                  handleInput('disbursementDate', e.target.value)
                }
              />
            </Col>
            <Col lg='4' md='6' sm='12'>
              <Label>Company</Label>
              <CompanyDropdown
                value={inputs?.companyId}
                onChange={(e) => handleInput('companyId', e)}
              />
            </Col>
          </Row>
          <Row className='mb-2'>
            <Col lg='4' md='6' sm='12'>
              <Label>Expense Category</Label>
              <ExpenseCategoryDropdown
                value={inputs?.expenseCategory}
                onChange={(e) => handleInput('expenseCategory', e)}
              />
            </Col>
            <Col lg='4' md='6' sm='12'>
              <Label>Non-Expense Category</Label>
              <NonExpenseCategoryDropdown
                value={inputs?.nonExpenseCategory}
                onChange={(e) => handleInput('nonExpenseCategory', e)}
              />
            </Col>
            {inputs?.nonExpenseCategory === 0 && (
              <Col lg='4' md='6'>
                <Label>AR Charge To</Label>
                <Input
                  value={inputs?.apChargeTo}
                  placeholder='AR Charge To'
                  onChange={(e) => handleInput('apChargeTo', e.target.value)}
                />
              </Col>
            )}
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
            <Col lg='4' md='6' sm='12'>
              <Label>Check Payee</Label>
              <span className='form-control'>{checkPayee}</span>
            </Col>
          </Row>
          <Row className='mb-2'>
            <Col>
              <Label>Particulars</Label>
              <Input
                type='textarea'
                defaultValue={inputs?.particulars}
                placeholder='Particulars'
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
                defaultValue={inputs?.vatableAmount}
                placeholder='Amount'
                onChange={(e) =>
                  handleInput('vatableAmount', Number(e.target.value))
                }
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
                defaultValue={inputs?.nonVatableAmount}
                placeholder='Amount'
                onChange={(e) =>
                  handleInput('nonVatableAmount', Number(e.target.value))
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
                  onChange={(e) => setHasEwt(e.target.checked)}
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
            <Col lg='4' md='6'>
              <Label>Bank Account</Label>
              <BankAccountDropdown
                value={inputs?.bankAccountId}
                onChange={(e) => handleInput('bankAccountId', e)}
              />
            </Col>
            <Col lg='4' md='6'>
              <Label>Check Number</Label>
              <Input
                defaultValue={inputs?.checkNumber}
                placeholder='Check Number'
                onChange={(e) => handleInput('checkNumber', e.target.value)}
              />
            </Col>
            <Col lg='4' md='6'>
              <Label>Check Date</Label>
              <Input
                type='date'
                defaultValue={inputs?.checkDate}
                onChange={(e) => handleInput('checkDate', e.target.value)}
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
