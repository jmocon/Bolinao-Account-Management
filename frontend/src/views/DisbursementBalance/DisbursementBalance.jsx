import React, { useEffect, useRef, useState } from 'react';
import {
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

import BankAccountDropdown from 'components/Dropdown/BankAccountDropdown';
import numberToCurrency from 'helper/numberToCurrency';
import { getDisbursementBalance } from 'api/disbursement';
import computeDisbursement from 'helper/computeDisbursement';

const DisbursementBalance = () => {
  const notifyRef = useRef(null);
  const [filter, setFilter] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let runningBalance = 0;
      let result;
      try {
        result = await getDisbursementBalance(filter);
      } catch (error) {
        handleNotify('danger', error, 'tim-icons icon-simple-remove');
        return;
      }

      const rows = result.map((row) => {
        
        const { net } = computeDisbursement(
          row.nonVatableAmount,
          row.vatableAmount,
          row.ewtTaxRate
        );
        runningBalance = runningBalance + net;
        return { ...row,net, runningBalance };
      });

      setData(rows);
    };

    if (filter.startDate && filter.startDate && filter.bankAccountId) {
      fetchData();
    }
  }, [filter]);

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

  const handleFilter = (type, value) => {
    setFilter((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <div className='content'>
      <NotificationAlert ref={notifyRef} />
      <Card>
        <CardHeader>
          <Row>
            <Col>
              <CardTitle tag='h4'>Disbursement Balance</CardTitle>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row className='mb-4'>
            <Col>
              <Label>Start Date</Label>
              <Input
                type='date'
                onChange={(e) => handleFilter('startDate', e.target.value)}
              />
            </Col>
            <Col>
              <Label>End Date</Label>
              <Input
                type='date'
                onChange={(e) => handleFilter('endDate', e.target.value)}
              />
            </Col>
            <Col>
              <Label>Bank Account</Label>
              <BankAccountDropdown
                onChange={(value) => handleFilter('bankAccountId', value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Table>
                <thead>
                  <tr>
                    <td>Date</td>
                    <td>Amount</td>
                    <td>Running Balance</td>
                  </tr>
                </thead>
                <tbody>
                  {data.length === 0 && (
                    <tr>
                      <td colSpan={3} className='text-center'>
                        No rows to show
                      </td>
                    </tr>
                  )}
                  {data.map((row) => (
                    <tr key={row.disbursementId}>
                      <td>{row.disbursementDate}</td>
                      <td>{numberToCurrency(row.net)}</td>
                      <td>{numberToCurrency(row.runningBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default DisbursementBalance;
