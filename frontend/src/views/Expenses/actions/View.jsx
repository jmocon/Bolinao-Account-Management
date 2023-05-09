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
  Alert
} from 'reactstrap';

import { updateStatus } from 'api/expense';
import numberToCurrency from 'helper/numberToCurrency';
import expenseStatus from 'constants/expenseStatus';
import expenseCategories from 'constants/expenseCategories';
import computeDisbursement from 'helper/computeDisbursement';
import { getExpenseDetails } from 'api/expense';
import modeOfPayments from 'constants/modeOfPayments';
import ExpenseStatusPill from 'components/Pills/ExpenseStatusPill';
import defaultAlert from 'constants/defaultAlert';


const View = ({ id, isOpen, toggle }) => {
  const [alert, setAlert] = useState(defaultAlert);
  const onDismiss = () => setAlert(defaultAlert);

  const [inputs, setInputs] = useState({});

  const [vat, setVat] = useState(0);
  const [gross, setGross] = useState(0);
  const [ewtAmount, setEwtAmount] = useState(0);
  const [net, setNet] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      let result;
      try {
        result = await getExpenseDetails(id);
      } catch (error) {
        setAlert({
          color: 'danger',
          message: `Error encountered while fetching Disbursement: ${error}`,
          visible: true
        });
        return;
      }

      const computeResult = computeDisbursement(
        result.nonVatableAmount,
        result.vatableAmount,
        result.ewtTaxRate
      );

      setVat(computeResult.vat);
      setGross(computeResult.gross);
      setEwtAmount(computeResult.ewt);
      setNet(computeResult.net);
      setInputs(result);
    };
    fetchData();
  }, [id]);

  const handleStatus = async (status) => {
    let response = await updateStatus(id, status);

    if (response.success) {
      toggle();
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='xl'>
      <ModalHeader toggle={toggle}>
        View Expense
        <ExpenseStatusPill status={inputs.status} className='ml-3' />
      </ModalHeader>
      <ModalBody>
        <Alert color={alert.color} isOpen={alert.visible} toggle={onDismiss}>
          {alert.message}
        </Alert>

        <Row className='mb-2'>
          <Col lg='4' md='6' sm='12'>
            <Label>Month Posting</Label>
            <span className='form-control'>{inputs.expenseDate}</span>
          </Col>
          <Col lg='4' md='6' sm='12'>
            <Label>Company</Label>
            <span className='form-control'>{inputs.companyName}</span>
          </Col>
          <Col lg='4' md='6' sm='12'>
            <Label>Expense Category</Label>
            <span className='form-control'>
              {expenseCategories[inputs.expenseCategoryId]}
            </span>
          </Col>
        </Row>
        <Row className='mb-2'>
          <Col lg='4' md='6' sm='12'>
            <Label>Item Code</Label>
            <span className='form-control'>{inputs.itemCode}</span>
          </Col>
          <Col lg='4' md='12'>
            <Label>Supplier</Label>
            <span className='form-control'>{inputs.supplierName}</span>
          </Col>
        </Row>
        <Row className='mb-2'>
          <Col>
            <Label>Particulars</Label>
            <span className='form-control'>{inputs.particulars}</span>
          </Col>
        </Row>
        <hr />
        <Row className='mb-2'>
          <Col lg='4' md='6' sm='12'>
            <Label>Vatable Amount</Label>
            <span className='form-control'>
              {numberToCurrency(inputs.vatableAmount)}
            </span>
          </Col>
          <Col lg='4' md='6' sm='12'>
            <Label>VAT</Label>
            <span className='form-control'>{numberToCurrency(vat)}</span>
          </Col>
        </Row>
        <Row className='mb-2'>
          <Col lg='4' md='6' sm='12'>
            <Label>Non-Vatable Amount</Label>
            <span className='form-control'>
              {numberToCurrency(inputs.nonVatableAmount)}
            </span>
          </Col>
          <Col lg='4' md='6' sm='12'>
            <Label>Gross Amount</Label>
            <span className='form-control'>{numberToCurrency(gross)}</span>
          </Col>
        </Row>
        <Row className='mb-2'>
          {!inputs.ewtCode ? (
            <Col>No EWT</Col>
          ) : (
            <>
              <Col lg='4' md='6' sm='6'>
                <Label>EWT Code</Label>
                <span className='form-control'>{inputs.ewtCode}</span>
              </Col>
              <Col lg='4' md='6' sm='12'>
                <Label>EWT Rate</Label>
                <span className='form-control'>{inputs.ewtTaxRate} %</span>
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
            <Label>Mode of Payment</Label>
            <span className='form-control'>
              {modeOfPayments[inputs.modeOfPayment]}
            </span>
          </Col>
        </Row>
        <Row className='mb-2'>
          <Col lg='4' md='6'>
            <Label>Invoice Date</Label>
            <span className='form-control'>{inputs.invoiceDate}</span>
          </Col>
          <Col lg='4' md='6'>
            <Label>Invoice Number</Label>
            <span className='form-control'>{inputs.invoiceNumber}</span>
          </Col>
        </Row>
        <Row className='mb-2'>
          <Col lg='4' md='6'>
            <Label>Remarks</Label>
            <span className='form-control'>{inputs.remarks}</span>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className='p-4 justify-content-end'>
        {(expenseStatus.forCorrection === inputs.status ||
          expenseStatus.draft === inputs.status) && (
          <Button
            color='info'
            className='mr-2'
            onClick={() => handleStatus(expenseStatus.forApproval)}>
            Save
          </Button>
        )}
        {expenseStatus.forApproval === inputs.status && (
          <>
            <Button
              color='warning'
              className='mr-2'
              onClick={() => handleStatus(expenseStatus.forCorrection)}>
              For Correction
            </Button>
            <Button
              color='success'
              className='mr-2'
              onClick={() => handleStatus(expenseStatus.approved)}>
              Approve
            </Button>
          </>
        )}
        {expenseStatus.cancelled !== inputs.status && (
          <Button
            color='danger'
            className='mr-4'
            onClick={() => handleStatus(expenseStatus.cancelled)}>
            Cancelled
          </Button>
        )}
        <Button color='default' onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default View;
