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
import { getIESummary } from 'api/disbursement';
import numberToCurrency from 'helper/numberToCurrency';
import { Link } from 'react-router-dom';
import computeDisbursement from 'helper/computeDisbursement';

const IESummary = () => {
  const notifyRef = useRef(null);
  const [companyId, setCompanyId] = useState();
  const [month, setMonth] = useState('');
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = { companyId, month };

      let result;
      try {
        result = await getIESummary(data);
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

  let totalNet = 0;

  const calculated = summary.map((item) => {
    const { net } = computeDisbursement(
      item.nonVatableAmount,
      item.vatableAmount,
      item.ewtRate
    );

    totalNet = totalNet + net;

    return { ...item, net };
  });

  return (
    <div className='content'>
      <NotificationAlert ref={notifyRef} />
      <Card>
        <CardHeader>
          <Row>
            <Col>
              <CardTitle tag='h4'>IE Summary</CardTitle>
            </Col>
            <Col className='text-right'>
              <Link
                to={
                  !companyId || !month
                    ? '#'
                    : `/ieSummary/${companyId}/${month}`
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
                    <th>Item Code</th>
                    <th>Particulars</th>
                    <th>Net Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {calculated.map((row) => (
                    <tr>
                      <td>{row.itemCodeName}</td>
                      <td>{row.particulars}</td>
                      <td>{numberToCurrency(row.net)}</td>
                    </tr>
                  ))}
                </tbody>
                <thead>
                  <tr>
                    <td>Total</td>
                    <td></td>
                    <td>{numberToCurrency(totalNet)}</td>
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

export default IESummary;
