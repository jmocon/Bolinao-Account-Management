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

import {
  clearDisbursement,
  getDisbursementDetails,
  updateStatus
} from 'api/disbursement';
import { addVoucher } from 'api/voucher';
import numberToCurrency from 'helper/numberToCurrency';
import disStatus from 'constants/disbursementStatus';
import expenseCategories from 'constants/expenseCategories';
import nonExpenseCategories from 'constants/nonExpenseCategories';
import DisbursementStatusPill from 'components/Pills/DisbursementStatusPill';
import computeDisbursement from 'helper/computeDisbursement';
import ClearedDate from '../components/ClearedDate';
import useAlert from 'helper/useAlert';
import defaultAlert from 'constants/defaultAlert';
import getLoggedUser from 'helper/getLoggedUser';
import roles from 'constants/roles';

const View = ({ id, isOpen, toggle }) => {
  const [alert, setAlert] = useState(defaultAlert);
  const alertFn = useAlert(setAlert);

  const [dis, setDis] = useState({});
  const [vat, setVat] = useState(0);
  const [gross, setGross] = useState(0);
  const [ewtAmount, setEwtAmount] = useState(0);
  const [net, setNet] = useState(0);
  const [roleId, setRoleId] = useState(0);

  useEffect(() => {
    const { roleId } = getLoggedUser();
    setRoleId(roleId);
  }, []);

  const [clearDateModal, setClearDateModal] = useState(false);

  useEffect(() => {
    const fetchDisbursement = async () => {
      let result;
      try {
        result = await getDisbursementDetails(id);
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
      setDis(result);
    };
    fetchDisbursement();
  }, [id]);

  const handleStatus = async (status) => {
    let response;
    switch (status) {
      case disStatus.print:
        try {
          response = await addVoucher({ disbursementId: id });
        } catch (error) {
          alertFn.danger(error);
        }
        if (response.success) {
          handlePrintVoucher(response.data.insertId);
        }
        break;
      case disStatus.check:
        response = await updateStatus(id, status);
        handlePrintCheck();
        break;
      default:
        response = await updateStatus(id, status);
        break;
    }

    if (!response.success) {
      alertFn.danger(response.message);
      return;
    }
    toggle();
  };

  const handlePrintVoucher = (voucherId) => {
    window.open(`/voucher/${voucherId}`, '_blank');
  };

  const handlePrintCheck = () => {
    window.open(`/check/${dis.disbursementId}`, '_blank');
  };

  const handlePrintBir2307 = () => {
    window.open(`/bir2307/${dis.disbursementId}`, '_blank');
  };

  const handleClearedDate = async (clearedDate) => {
    let response;
    try {
      response = await clearDisbursement(id, clearedDate);
    } catch (error) {
      alertFn.danger(`Error encountered while clearing Disbursement: ${error}`);
      return;
    }

    if (!response.success) {
      alertFn.danger(
        `Error encountered while setting cleared date: ${response.message}`
      );
    }

    setClearDateModal(false);
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='xl'>
      <ModalHeader toggle={toggle}>
        View Disbursement
        <DisbursementStatusPill status={dis.status} className='ml-3' />
      </ModalHeader>
      <ModalBody>
        <Alert
          color={alert.color}
          isOpen={alert.visible}
          toggle={alertFn.dismiss}>
          {alert.message}
        </Alert>

        <Row className='mb-2'>
          <Col lg='4' md='6' sm='12'>
            <Label>Month Posting</Label>
            <span className='form-control'>{dis.disbursementDate}</span>
          </Col>
          <Col lg='4' md='6' sm='12'>
            <Label>Company</Label>
            <span className='form-control'>{dis.companyName}</span>
          </Col>
          <Col lg='4' md='6' sm='12'>
            <Label>Id</Label>
            <span className='form-control'>{id}</span>
          </Col>
        </Row>
        <Row className='mb-2'>
          <Col lg='4' md='6' sm='12'>
            <Label>Expense Category</Label>
            <span className='form-control'>
              {expenseCategories[dis.expenseCategory]}
            </span>
          </Col>
          <Col lg='4' md='6' sm='12'>
            <Label>Non-Expense Category</Label>
            <span className='form-control'>
              {nonExpenseCategories[dis.nonExpenseCategory]}
            </span>
          </Col>
          {dis.nonExpenseCategory === 0 && (
            <Col lg='4' md='6'>
              <Label>AR Charge To</Label>
              <span className='form-control'>
                {nonExpenseCategories[dis.apChargeTo]}
              </span>
            </Col>
          )}
        </Row>
        <Row className='mb-2'>
          <Col lg='4' md='6' sm='12'>
            <Label>Item Code</Label>
            <span className='form-control'>{dis.itemCode || 'NA'}</span>
          </Col>
          <Col lg='4' md='12'>
            <Label>Supplier</Label>
            <span className='form-control'>{dis.supplierName}</span>
          </Col>
          <Col lg='4' md='6' sm='12'>
            <Label>Check Payee</Label>
            <span className='form-control'>{dis.checkPayee}</span>
          </Col>
        </Row>
        <Row className='mb-2'>
          <Col>
            <Label>Particulars</Label>
            <span className='form-control'>{dis.particulars}</span>
          </Col>
        </Row>
        <hr />
        <Row className='mb-2'>
          <Col lg='4' md='6' sm='12'>
            <Label>Vatable Amount</Label>
            <span className='form-control'>{dis.vatableAmount}</span>
          </Col>
          <Col lg='4' md='6' sm='12'>
            <Label>VAT</Label>
            <span className='form-control'>{numberToCurrency(vat)}</span>
          </Col>
        </Row>
        <Row className='mb-2'>
          <Col lg='4' md='6' sm='12'>
            <Label>Non-Vatable Amount</Label>
            <span className='form-control'>{dis.nonVatableAmount}</span>
          </Col>
          <Col lg='4' md='6' sm='12'>
            <Label>Gross Amount</Label>
            <span className='form-control'>{numberToCurrency(gross)}</span>
          </Col>
        </Row>
        <Row className='mb-2'>
          {!dis.ewtCode ? (
            <Col>No EWT</Col>
          ) : (
            <>
              <Col lg='4' md='6' sm='6'>
                <Label>EWT Code</Label>
                <span className='form-control'>{dis.ewtCode}</span>
              </Col>
              <Col lg='4' md='6' sm='12'>
                <Label>EWT Rate</Label>
                <span className='form-control'>{dis.ewtTaxRate} %</span>
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
            <span className='form-control'>{dis.bankAccountName}</span>
          </Col>
        </Row>
        <Row className='mb-2'>
          <Col lg='4' md='6'>
            <Label>Check Number</Label>
            <span className='form-control'>{dis.checkNumber}</span>
          </Col>
          <Col lg='4' md='6'>
            <Label>Check Date</Label>
            <span className='form-control'>{dis.checkDate}</span>
          </Col>
          {dis.clearedDate && (
            <Col lg='4' md='6'>
              <Label>Cleared Date</Label>
              <span className='form-control'>{dis.clearedDate}</span>
            </Col>
          )}
        </Row>
      </ModalBody>
      <ModalFooter className='p-4 justify-content-end'>
        {[roles.APPROVER].includes(roleId) &&
          [disStatus.forApproval].includes(dis.status) && (
            <Button
              color='warning'
              className='mr-2'
              onClick={() => handleStatus(disStatus.forCorrection)}>
              For Correction
            </Button>
          )}

        {[roles.APPROVER].includes(roleId) &&
          [disStatus.forApproval].includes(dis.status) && (
            <Button
              color='success'
              className='mr-2'
              onClick={() => handleStatus(disStatus.approved)}>
              Approve
            </Button>
          )}

        {[roles.APPROVER, roles.MAKER, roles.ENCODER].includes(roleId) &&
          [disStatus.approved].includes(dis.status) && (
            <Button
              color='info'
              className='mr-2'
              onClick={() => handleStatus(disStatus.print)}>
              Print Voucher
            </Button>
          )}

        {[roles.APPROVER, roles.MAKER, roles.ENCODER].includes(roleId) &&
          [disStatus.cleared, disStatus.print, disStatus.check].includes(
            dis.status
          ) && (
            <Button
              color='info'
              className='mr-2'
              onClick={() => handlePrintVoucher(dis.voucherId)}>
              Re-print Voucher
            </Button>
          )}

        {[roles.APPROVER, roles.MAKER, roles.ENCODER].includes(roleId) &&
          [
            disStatus.approved,
            disStatus.print,
            disStatus.check,
            disStatus.cleared
          ].includes(dis.status) && (
            <Button color='info' className='mr-2' onClick={handlePrintBir2307}>
              Print BIR 2307
            </Button>
          )}

        {[roles.APPROVER, roles.MAKER, roles.ENCODER].includes(roleId) &&
          [disStatus.print].includes(dis.status) && (
            <Button
              color='info'
              className='mr-2'
              onClick={() => handleStatus(disStatus.check)}>
              Print Check
            </Button>
          )}

        {[roles.APPROVER, roles.MAKER].includes(roleId) &&
          [disStatus.check].includes(dis.status) && (
            <ClearedDate
              onClear={handleClearedDate}
              modalState={clearDateModal}
              setModalState={setClearDateModal}
            />
          )}

        {[roles.APPROVER, roles.MAKER].includes(roleId) &&
          ![
            disStatus.cleared,
            disStatus.approved,
            disStatus.cancelled,
            disStatus.draft
          ].includes(dis.status) && (
            <Button
              color='danger'
              className='mr-4'
              onClick={() => handleStatus(disStatus.cancelled)}>
              Cancelled
            </Button>
          )}
      </ModalFooter>
    </Modal>
  );
};

export default View;
