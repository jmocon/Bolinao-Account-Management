import { useEffect, useState } from 'react';
import { Col, Input, Label, Row } from 'reactstrap';

import EWTDropdown from 'components/Dropdown/EWTDropdown';
import CompanyDropdown from 'components/Dropdown/CompanyDropdown';
import ItemCodeDropdown from 'components/Dropdown/ItemCodeDropdown';
import SupplierDropdown from 'components/Dropdown/SupplierDropdown';
import BankAccountDropdown from 'components/Dropdown/BankAccountDropdown';
import ExpenseCategoryDropdown from 'components/Dropdown/Disbursement/ExpenseCategoryDropdown';
import NonExpenseCategoryDropdown from 'components/Dropdown/Disbursement/NonExpenseCategoryDropdown';

import { getEWT } from 'api/ewt';
import { getSupplier } from 'api/supplier';
import numberToCurrency from 'helper/numberToCurrency';
import computeDisbursement from 'helper/computeDisbursement';

const DisbursementForm = ({ inputs, handleInput, setAlert }) => {
  const [checkPayee, setCheckPayee] = useState();
  const [ewt, setEwt] = useState({});
  const [hasEwt, setHasEwt] = useState(false);

  const [vat, setVat] = useState(0);
  const [gross, setGross] = useState(0);
  const [ewtAmount, setEwtAmount] = useState(0);
  const [net, setNet] = useState(0);

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
  }, [inputs?.supplierId, setAlert]);

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

  /* Request Update: 36
   * Expense Category: if chosen option was N/A;
   * Non-Expense Category: enable all options;
   * Item Code: automatic N/A; disable editing
   */
  const handleExpenseCategory = (value) => {
    handleInput('expenseCategory', value);
    if (value !== 3) {
      handleInput('nonExpenseCategory', 3);
    }
  };

  return (
    <>
      <Row className='mb-2'>
        <Col lg='4' md='6' sm='12'>
          <Label>Month Posting</Label>
          <Input
            type='date'
            value={inputs?.disbursementDate}
            onChange={(e) => handleInput('disbursementDate', e.target.value)}
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
            onChange={handleExpenseCategory}
          />
        </Col>
        <Col lg='4' md='6' sm='12'>
          <Label>Non-Expense Category</Label>
          <NonExpenseCategoryDropdown
            isDisabled={inputs?.expenseCategory !== 3}
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
    </>
  );
};

export default DisbursementForm;
