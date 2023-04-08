import React, { useState, useEffect } from 'react';
// import axios from '../../../Axios';
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

import { updateDisbursement, getDisbursement } from 'api/disbursement';
import { getEWT } from 'api/ewt';
import { getSupplier } from 'api/supplier';
import ItemCodeDropdown from 'components/Dropdown/ItemCodeDropdown';
import BankAccountDropdown from 'components/Dropdown/BankAccountDropdown';
import computeDisbursement from 'helper/computeDisbursement';

const Update = ({ id, isOpen, toggle, notify }) => {
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

  const handleUpdate = async (status = 1) => {
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

    let result;
    try {
      result = await updateDisbursement(id, data);
    } catch (error) {
      setAlert({
        color: 'danger',
        message: `Error encountered while updating Disbursement: ${error}`,
        visible: true
      });
      return;
    }

    if (result.success === false) {
      setAlert({
        color: 'danger',
        message: `Error encountered while updating Disbursement: ${result.message}`,
        visible: true
      });
      return;
    }

    notify(
      'success',
      'Successfully updated disbursement.',
      'tim-icons icon-check-2'
    );
    toggle();
  };

  useEffect(() => {
    const fetchSupplier = async () => {
      let result;
      try {
        result = await getSupplier(supplierId);
      } catch (error) {
        setAlert({
          color: 'danger',
          message: `Error encountered while fetching supplier: ${error}`,
          visible: true
        });
        return;
      }

      setCheckPayee(result.checkPayee);
    };

    if (supplierId) {
      fetchSupplier();
    }
  }, [supplierId]);

  useEffect(() => {
    const computeResult = computeDisbursement(
      nonVatableAmount,
      vatableAmount,
      ewt.ewtTaxRate
    );

    setVat(computeResult.vat);
    setGross(computeResult.gross);
    setEwtAmount(computeResult.ewt);
    setNet(computeResult.net);
  }, [ewt.ewtTaxRate, nonVatableAmount, vatableAmount]);

  useEffect(() => {
    const fetchDisbursement = async () => {
      let result;
      try {
        result = await getDisbursement(id);
      } catch (error) {
        setAlert({
          color: 'danger',
          message: `Error encountered while fetching Disbursement: ${error}`,
          visible: true
        });
        return;
      }

      setCompanyId(result.companyId);
      setDisbursementDate(result.disbursementDate);
      setExpenseCategory(result.expenseCategory);
      setNonExpenseCategory(result.nonExpenseCategory);
      setApChargeTo(result.apChargeTo);
      setSupplierId(result.supplierId);
      setParticulars(result.particulars);
      setItemCode(result.itemCodeId);
      setVatableAmount(result.vatableAmount);
      setNonVatableAmount(result.nonVatableAmount);
      setHasEwt(!!result.ewtId);
      setEwtId(result.ewtId);
      setBankAccountId(result.bankAccountId);
      setCheckNumber(result.checkNumber);
      setCheckDate(result.checkDate);
    };
    fetchDisbursement();
  }, [id]);

  const handleNonExpenseCategory = (value) => {
    setNonExpenseCategory(value);
    if (value === 0) {
      setApChargeTo(null);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='xl'>
      <ModalHeader toggle={toggle}>Update Disbursement</ModalHeader>
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
              onChange={handleNonExpenseCategory}
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
              value={vatableAmount}
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
              value={nonVatableAmount}
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
        <Button
          color='primary'
          onClick={() => handleUpdate(0)}
          className='mr-2'>
          Draft
        </Button>
        <Button color='info' onClick={() => handleUpdate(1)} className='mr-2'>
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
