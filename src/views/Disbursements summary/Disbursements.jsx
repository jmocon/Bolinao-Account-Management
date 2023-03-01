import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table
} from 'reactstrap';

import numberToCurrency from 'helper/numberToCurrency';

import sampleExpenses from 'helper/sampleData/sampleExpenses';
import { sampleAccount } from 'helper/sampleData/sampleAccounts';
import { sampleSupplier } from 'helper/sampleData/sampleSuppliers';

const Disbursements = () => {
  return (
    <div className='content'>
      <Row>
        <Col md='12'>
          <Card>
            <CardHeader>
              <Row>
                <Col>
                  <CardTitle tag='h4'>Disbursement</CardTitle>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <td>Expense Id</td>
                    <td>Account</td>
                    <td>Voucher No.</td>
                    <td>Voucher Date</td>
                    <td>Payee</td>
                    <td>Particulars</td>
                    <td>Tax Base</td>
                    <td>Vat</td>
                    <td>Gross Amount</td>
                    <td>EWT Code</td>
                    <td>EWT Rate</td>
                    <td>EWT Amount</td>
                    <td>Net Amount</td>
                    <td>Mode of Payment</td>
                    <td>Bank</td>
                    <td>Check</td>
                    <td>Check Date</td>
                  </tr>
                </thead>
                <tbody>
                  {sampleExpenses(10).map((expense) => {
                    const account = sampleAccount();
                    const supplier = sampleSupplier();

                    const vat = expense.vatableAmount ? expense.nonVatableAmount * 0.12 : 0;
                    const gross = expense.nonVatableAmount - vat;
                    const ewt = (expense.nonVatableAmount * expense.taxRate) / 100;
                    const net = gross - ewt;

                    return (
                      <tr>
                        <td>{expense.expenseId}</td>
                        <td>{account.owner}</td>
                        <td>{expense.voucherId}</td>
                        <td className='text-nowrap'>Mon Dec 19 2022</td>
                        <td>{supplier.name}</td>
                        <td style={{minWidth: '400px'}}>{expense.particulars}</td>
                        <td className='text-nowrap text-right'>
                          {numberToCurrency(expense.nonVatableAmount)}
                        </td>
                        <td className='text-nowrap text-right'>
                          {numberToCurrency(vat)}
                        </td>
                        <td className='text-nowrap text-right'>
                          {numberToCurrency(gross)}
                        </td>
                        <td>{expense.atc}</td>
                        <td className='text-nowrap text-right'>
                          {expense.taxRate} %
                        </td>
                        <td className='text-nowrap text-right'>
                          {numberToCurrency(ewt)}
                        </td>
                        <td className='text-nowrap text-right'>
                          {numberToCurrency(net)}
                        </td>
                        <td>{expense.modeOfPayment}</td>
                        <td className='text-nowrap'>{expense.bank}</td>
                        <td>{expense.checkNumber}</td>
                        <td className='text-nowrap'>
                          {expense.checkDate.toDateString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Disbursements;
