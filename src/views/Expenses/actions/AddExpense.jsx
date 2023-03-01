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

import AccountDropdown from 'components/Dropdown/AccountDropdown';
import SupplierDropdown from 'components/Dropdown/SupplierDropdown';
import EWTDropdown from 'components/Dropdown/EWTDropdown';
import SupplierBankDropdown from 'components/Dropdown/SupplierAccountDropdown';
import ExpenseCategoryDropdown from 'components/Dropdown/Disbursement/ExpenseCategoryDropdown';
import ModeOfPaymentDropdown from 'components/Dropdown/Disbursement/ModeOfPaymentDropdown';
import CheckStatusDropdown from 'components/Dropdown/Disbursement/CheckStatusDropdown';

import numberToCurrency from 'helper/numberToCurrency';

import { addExpense } from 'api/expense';

import { sampleEWT } from 'helper/sampleData/sampleEWTs';

const AddExpense = () => {
  // Modal Control
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen((currState) => !currState);

  const [accountId, setAccountId] = useState();
  const [expenseDate, setExpenseDate] = useState();
  const [category, setCategory] = useState();
  const [voucherId, setVoucherId] = useState();
  const [supplierId, setSupplierId] = useState();
  const [particulars, setParticulars] = useState();
  const [vatableAmount, setHasVat] = useState(false);
  const [nonVatableAmount, setTaxBase] = useState(0);
  const [hasEwt, setHasEwt] = useState(false);
  const [ewtId, setEwtId] = useState();
  const [modeOfPayment, setModeOfPayment] = useState();
  const [supplierAccountId, setSupplierAccountId] = useState();
  const [checkNumber, setCheckNumber] = useState();
  const [checkDate, setCheckDate] = useState();
  const [checkStatus, setCheckStatus] = useState();

  const [ewt, setEwt] = useState({});
  useEffect(() => {
    if (hasEwt && ewtId) {
      setEwt(sampleEWT());
      return;
    }

    setEwt({ taxRate: 0 });
  }, [ewtId, hasEwt]);

  // Checks if valid or not
  // const [submitted, setSubmitted] = useState(false);
  // Notification
  const [notif, setNotif] = useState({
    color: 'primary',
    message: '',
    visible: false
  });
  const onDismiss = () =>
    setNotif({
      color: 'primary',
      message: '',
      visible: false
    });

  // const CheckContent = () => {
  //   var error = false;
  //   // if (!firstName) {
  //   //   error = true;
  //   // }
  //   // if (!emailAddress) {
  //   //   error = true;
  //   // }
  //   // if (!username) {
  //   //   error = true;
  //   // }
  //   // setSubmitted(true);
  //   return error;
  // };

  // const handleNotif = (color, message, title = '') => {
  //   var msg = message;
  //   if (title) {
  //     msg = (
  //       <span>
  //         <b>{title} - </b> {msg}
  //       </span>
  //     );
  //   }
  //   setNotif({ color: color, message: msg, visible: true });
  // };

  const handleAdd = async (status = 1) => {
    // if (CheckContent()) {
    //   handleNotif(
    //     'danger',
    //     'Kindly fill-up required details.',
    //     'Incomplete Details'
    //   );
    // } else {
    // }

    
    const data = {
      accountId: accountId?.value,
      expenseDate,
      category: category?.value,
      voucherId: voucherId?.value,
      supplierId: supplierId?.value,
      particulars,
      vatableAmount,
      nonVatableAmount,
      hasEwt,
      ewtId: ewtId?.value || 0,
      modeOfPayment: modeOfPayment?.value || 0,
      supplierAccountId: supplierAccountId?.value || 0,
      checkNumber: checkNumber || '',
      checkDate: checkDate || '',
      checkStatus: checkStatus?.value || 0,
      status
    }
    
    let result;
    try {
      result = await  addExpense(data);
    } catch (error) {
      console.log(error);
    }
    console.log(result);

  };

  return (
    <>
      <Button
        color='info'
        size='sm'
        title='View'
        onClick={() => toggleModal('add')}
        className='animation-on-hover'>
        <i className='fa fa-plus'></i> New Check Disbursement
      </Button>
      <Modal isOpen={isOpen} toggle={toggleModal} size='xl'>
        <ModalHeader toggle={toggleModal}>New Check Disbursement</ModalHeader>
        <ModalBody>
          <Alert color={notif.color} isOpen={notif.visible} toggle={onDismiss}>
            {notif.message}
          </Alert>

          <Row className='mb-2'>
            <Col>
              <Label>Date</Label>
              <Input
                type='date'
                defaultValue={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
              />
            </Col>
            <Col>
              <Label>Category</Label>
              <ExpenseCategoryDropdown
                value={category}
                onChange={(e) => setCategory(e)}
              />
            </Col>
          </Row>

          <Row className='mb-2'>
            <Col lg='4' md='12'>
              <Label>Account</Label>
              <AccountDropdown
                value={accountId}
                onChange={(e) => setAccountId(e)}
              />
            </Col>
            <Col lg='4' md='12'>
              <Label>Voucher</Label>
              <AccountDropdown
                value={voucherId}
                onChange={(e) => setVoucherId(e)}
              />
            </Col>
            <Col lg='4' md='12'>
              <Label>Supplier</Label>
              <SupplierDropdown
                value={supplierId}
                onChange={(e) => setSupplierId(e)}
              />
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
            <Col lg='4' md='12'>
              <Label>Amount</Label>
              <Input
                type='number'
                defaultValue={nonVatableAmount}
                placeholder='Amount'
                onChange={(e) => setTaxBase(e.target.value)}
              />
            </Col>
          </Row>
          <Row className='mb-2'>
            <Col lg='2' md='6'>
              <Label>VAT</Label>
              <p>
                <Input
                  type='checkbox'
                  onChange={(e) => setHasVat(e.target.checked)}
                  style={{
                    marginLeft: '0px',
                    marginRight: '5px',
                    marginTop: '10px',
                    position: 'relative'
                  }}
                />{' '}
                with VAT
              </p>
            </Col>
            {vatableAmount && (
              <Col lg='2' md='6'>
                <Label>Tax Amount</Label>
                <div>{numberToCurrency(vatableAmount ? nonVatableAmount * 0.12 : 0)}</div>
              </Col>
            )}
          </Row>
          <Row className='mb-2'>
            <Col lg='2' md='6'>
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
                <Col lg='4' md='6'>
                  <Label>Code</Label>
                  <EWTDropdown value={ewtId} onChange={(e) => setEwtId(e)} />
                </Col>
                <Col lg='2' md='6'>
                  <Label>Rate</Label>
                  <p>{ewt.taxRate} %</p>
                </Col>
                <Col lg='2' md='6'>
                  <Label>EWT Amount</Label>
                  <div>
                    {numberToCurrency(
                      hasEwt ? (nonVatableAmount * ewt.taxRate) / 100 : 0
                    )}
                  </div>
                </Col>
              </>
            )}
          </Row>
          <hr />
          <Row className='mb-2'>
            <Col lg='4' md='6'>
              <Label>Mode of Payment</Label>
              <ModeOfPaymentDropdown
                value={modeOfPayment}
                onChange={(e) => setModeOfPayment(e)}
              />
            </Col>
            {modeOfPayment && modeOfPayment.value !== '1' && (
              <Col lg='4' md='12'>
                <Label>Supplier Account</Label>
                <SupplierBankDropdown
                  value={supplierAccountId}
                  onChange={(e) => setSupplierAccountId(e)}
                />
              </Col>
            )}
          </Row>

          {modeOfPayment && modeOfPayment.value === '0' && (
            <Row className='mb-2'>
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
              <Col lg='4' md='6'>
                <Label>Check Status</Label>
                <CheckStatusDropdown
                  value={checkStatus}
                  onChange={(e) => setCheckStatus(e)}
                />
              </Col>
            </Row>
          )}
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

export default AddExpense;
