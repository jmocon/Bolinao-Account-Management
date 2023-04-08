import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Input,
  Label,
  Row,
  Table
} from 'reactstrap';
import NotificationAlert from 'react-notification-alert';

import CompanyDropdown from 'components/Dropdown/CompanyDropdown';
import { getDESummary } from 'api/disbursement';
import numberToCurrency from 'helper/numberToCurrency';
import { Link } from 'react-router-dom';
import computeDisbursement from 'helper/computeDisbursement';

const DESummary = () => {
  const notifyRef = useRef(null);
  const [companyId, setCompanyId] = useState();
  const [month, setMonth] = useState('');
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = { companyId, month };

      let result;
      try {
        result = await getDESummary(data);
      } catch (error) {
        handleNotify('danger', error, 'tim-icons icon-simple-remove');
        return;
      }

      setSummary(result);
    };

    if (companyId && month) {
      fetchData();
    }
  }, [companyId, month]);

  const handleNotify = (type, message, icon = 'tim-icons icon-bell-55') => {
    const options = {
      place: 'bc',
      message,
      type,
      icon,
      autoDismiss: 5
    };
    notifyRef.current.notificationAlert(options);
  };

  const totals = {
    vatableAmount: 0,
    nonVatableAmount: 0,
    vat: 0,
    gross: 0
  };

  const calculated = summary.map((item) => {
    const { vat, gross } = computeDisbursement(
      item.nonVatableAmount,
      item.vatableAmount
    );

    totals.vatableAmount = totals.vatableAmount + item.vatableAmount;
    totals.nonVatableAmount = totals.nonVatableAmount + item.nonVatableAmount;
    totals.vat = totals.vat + vat;
    totals.gross = totals.gross + gross;

    return { ...item, vat, gross };
  });

  return (
    <div className='content'>
      <NotificationAlert ref={notifyRef} />
      <Card>
        <CardHeader>
          <Row>
            <Col>
              <CardTitle tag='h4'>DE Summary</CardTitle>
            </Col>
            <Col className='text-right'>
              <Link
                to={
                  !companyId || !month
                    ? '#'
                    : `/deSummary/${companyId}/${month}`
                }
                target='_blank'>
                <Button
                  color='info'
                  size='sm'
                  title='Print'
                  className='animation-on-hover'
                  disabled={!companyId || !month}>
                  <i className='fa fa-print'></i> Print
                </Button>
              </Link>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md={3}>
              <Label>Company</Label>
              <CompanyDropdown
                value={companyId}
                onChange={(e) => setCompanyId(e)}
              />
            </Col>
            <Col md={3}>
              <Label>Month</Label>
              <Input
                type='month'
                value={month}
                placeholder='Month'
                onChange={(e) => setMonth(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Table>
                <thead>
                  <tr>
                    <th>Supplier</th>
                    <th>Address</th>
                    <th>TIN</th>
                    <th>Item Code</th>
                    <th>Vatable</th>
                    <th>Non-Vatable</th>
                    <th>Vat</th>
                    <th>Gross</th>
                  </tr>
                </thead>
                <tbody>
                  {calculated.map((row) => (
                      <tr key={row.disbursementId}>
                        <td>{row.supplierName}</td>
                        <td>{row.supplierAddress}</td>
                        <td>{row.supplierTIN}</td>
                        <td>{row.itemCodeName}</td>
                        <td>{numberToCurrency(row.vatableAmount)}</td>
                        <td>{numberToCurrency(row.nonVatableAmount)}</td>
                        <td>{numberToCurrency(row.vat)}</td>
                        <td>{numberToCurrency(row.gross)}</td>
                      </tr>
                    ))}
                </tbody>
                <thead>
                  <tr>
                    <td>Total</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{numberToCurrency(totals.vatableAmount)}</td>
                    <td>{numberToCurrency(totals.nonVatableAmount)}</td>
                    <td>{numberToCurrency(totals.vat)}</td>
                    <td>{numberToCurrency(totals.gross)}</td>
                  </tr>
                </thead>
              </Table>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default DESummary;
