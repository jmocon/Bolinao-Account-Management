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
import { getEWTSummary } from 'api/disbursement';
import numberToCurrency from 'helper/numberToCurrency';
import { Link } from 'react-router-dom';
import computeDisbursement from 'helper/computeDisbursement';

const EWTReport = () => {
  const notifyRef = useRef(null);
  const [companyId, setCompanyId] = useState();
  const [month, setMonth] = useState('');
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = { companyId, month };

      let result;
      try {
        result = await getEWTSummary(data);
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

  let totalEWT = 0;

  const calculated = summary.map((item) => {
    const { ewt } = computeDisbursement(0, item.vatableAmount, item.ewtRate);

    totalEWT = ewt;

    return { ...item, ewt };
  });

  return (
    <div className='content'>
      <NotificationAlert ref={notifyRef} />
      <Card>
        <CardHeader>
          <Row>
            <Col>
              <CardTitle tag='h4'>EWT Report</CardTitle>
            </Col>
            <Col className='text-right'>
              <Link
                to={
                  !companyId || !month
                    ? '#'
                    : `/ewtSummary/${companyId}/${month}`
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
                    <th>Payee</th>
                    <th>Particulars</th>
                    <th>EWT Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {calculated.map((row) => {
                    return (
                      <tr>
                        <td>{row.supplierName}</td>
                        <td>{row.particulars}</td>
                        <td>{numberToCurrency(row.ewt)}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <thead>
                  <tr>
                    <td>Total</td>
                    <td></td>
                    <td>{numberToCurrency(totalEWT)}</td>
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

export default EWTReport;
