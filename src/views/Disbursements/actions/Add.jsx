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

const Add = ({ onChange, notify }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setCompanyId();
    setDisbursementDate();
    setExpenseCategory();
    setNonExpenseCategory();
    setSupplierId();
    setParticulars();
    setItemCode();
    setVatableAmount(0);
    setNonVatableAmount(0);
    setHasEwt(false);
    setEwtId();
    setApChargeTo();
    setBankAccountId();
    setCheckNumber();
    setCheckDate();
    setCheckPayee();

    setIsOpen((currState) => !currState);
  };

  const [companyId, setCompanyId] = useState();
  const [disbursementDate, setDisbursementDate] = useState();
  const [expenseCategory, setExpenseCategory] = useState();
  const [nonExpenseCategory, setNonExpenseCategory] = useState();
  const [supplierId, setSupplierId] = useState();
  const [particulars, setParticulars] = useState();
  const [itemCode, setItemCode] = useState();
  const [vatableAmount, setVatableAmount] = useState(0);
  const [nonVatableAmount, setNonVatableAmount] = useState(0);
  const [hasEwt, setHasEwt] = useState(false);
  const [ewtId, setEwtId] = useState();
  const [apChargeTo, setApChargeTo] = useState();
  const [bankAccountId, setBankAccountId] = useState();
  const [checkNumber, setCheckNumber] = useState();
  const [checkDate, setCheckDate] = useState();

  const [checkPayee, setCheckPayee] = useState();
  const [ewt, setEwt] = useState({});

  const [vat, setVat] = useState(0);
  const [gross, setGross] = useState(0);
  const [ewtAmount, setEwtAmount] = useState(0);
  const [net, setNet] = useState(0);

  useEffect(() => {
    const fetchEWT = async () => {
      if (hasEwt && ewtId) {
        const selectedEWT = await getEWT(ewtId);
        setEwt(selectedEWT);
        return;
      }
      setEwt({ taxRate: 0 });
    };

    fetchEWT();
  }, [ewtId, hasEwt]);

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

  const handleAdd = async (status = 1) => {
    const data = {
      companyId,
      disbursementDate,
      expenseCategory,
      nonExpenseCategory,
      supplierId,
      particulars,
      itemCode,
      vatableAmount,
      nonVatableAmount,
      ewtId,
      apChargeTo,
      bankAccountId,
      checkNumber: checkNumber || '',
      checkDate: checkDate || '',
      status
    };

    try {
      await addDisbursement(data);
    } catch (error) {
      console.log(error);
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
        result = await getSupplier(supplierId);
      } catch (error) {
        console.error(error);
      }

      setCheckPayee(result.checkPayee);
    };

    if (supplierId) {
      fetchSupplier();
    }
  }, [supplierId]);

  useEffect(() => {
    const tmpVat = vatableAmount * 0.12;
    const tmpGross = vatableAmount + tmpVat + nonVatableAmount;
    const tmpEwtAmount = (vatableAmount * ewt.taxRate) / 100;
    const tmpNet = tmpGross - tmpEwtAmount;

    setVat(tmpVat);
    setGross(tmpGross);
    setEwtAmount(tmpEwtAmount);
    setNet(tmpNet);
  }, [vatableAmount, nonVatableAmount, ewt.taxRate]);

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
                defaultValue={disbursementDate}
                onChange={(e) => setDisbursementDate(e.target.value)}
              />
            </Col>
            <Col lg='4' md='6' sm='12'>
              <Label>Company</Label>
              <CompanyDropdown
                value={companyId}
                onChange={(e) => setCompanyId(e)}
              />
            </Col>
          </Row>
          <Row className='mb-2'>
            <Col lg='4' md='6' sm='12'>
              <Label>Expense Category</Label>
              <ExpenseCategoryDropdown
                value={expenseCategory}
                onChange={setExpenseCategory}
              />
            </Col>
            <Col lg='4' md='6' sm='12'>
              <Label>Non-Expense Category</Label>
              <NonExpenseCategoryDropdown
                value={nonExpenseCategory}
                onChange={setNonExpenseCategory}
              />
            </Col>
            {nonExpenseCategory === 0 && (
              <Col lg='4' md='6'>
                <Label>AP Charge To</Label>
                <Input
                  defaultValue={apChargeTo}
                  placeholder='AP Charge To'
                  onChange={(e) => setApChargeTo(e.target.value)}
                />
              </Col>
            )}
          </Row>
          <Row className='mb-2'>
            <Col lg='4' md='6' sm='12'>
              <Label>Item Code</Label>
              <ItemCodeDropdown
                label='Item Code'
                value={itemCode}
                onChange={setItemCode}
              />
            </Col>
            <Col lg='4' md='12'>
              <Label>Supplier</Label>
              <SupplierDropdown
                value={supplierId}
                onChange={(e) => setSupplierId(e)}
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
                defaultValue={particulars}
                placeholder='Particulars'
                onChange={(e) => setParticulars(e.target.value)}
              />
            </Col>
          </Row>
          <hr />
          <Row className='mb-2'>
            <Col lg='4' md='6' sm='12'>
              <Label>Vatable Amount</Label>
              <Input
                type='number'
                defaultValue={vatableAmount}
                placeholder='Amount'
                onChange={(e) => setVatableAmount(Number(e.target.value))}
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
                defaultValue={nonVatableAmount}
                placeholder='Amount'
                onChange={(e) => setNonVatableAmount(Number(e.target.value))}
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
                    setEwtId();
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
                  <EWTDropdown value={ewtId} onChange={setEwtId} />
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
                value={bankAccountId}
                onChange={(e) => {
                  setBankAccountId(e);
                }}
              />
            </Col>
            <Col lg='4' md='6'>
              <Label>Check Number</Label>
              <Input
                defaultValue={checkNumber}
                placeholder='Check Number'
                onChange={(e) => setCheckNumber(e.target.value)}
              />
            </Col>
            <Col lg='4' md='6'>
              <Label>Check Date</Label>
              <Input
                type='date'
                defaultValue={checkDate}
                onChange={(e) => setCheckDate(e.target.value)}
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
