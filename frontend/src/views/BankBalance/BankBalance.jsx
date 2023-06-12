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

import { getBankReconciliation } from 'api/disbursement';
import BankAccountDropdown from 'components/Dropdown/BankAccountDropdown';
import computeDisbursement from 'helper/computeDisbursement';
import numberToCurrency from 'helper/numberToCurrency';

const BankBalance = () => {
  const notifyRef = useRef(null);
  const [filter, setFilter] = useState({});
  const [data, setData] = useState({});
  const [total, setTotal] = useState({ deposit: 0, withdrawal: 0 });

  useEffect(() => {
    const fetchData = async () => {
      let deposit = 0;
      let withdrawal = 0;
      let runningBalance = 0;
      let result;
      try {
        result = await getBankReconciliation(filter);
      } catch (error) {
        handleNotify('danger', error, 'tim-icons icon-simple-remove');
        return;
      }

      const formattedDeposit = result.deposit.reduce((agg, curr) => {
        const tempAgg = { ...agg };
        if (!tempAgg[curr.clearedDate]) {
          tempAgg[curr.clearedDate] = { deposit: 0, withdrawal: 0 };
        }

        tempAgg[curr.clearedDate].deposit =
          tempAgg[curr.clearedDate].deposit + curr.amount;
        deposit = deposit + curr.amount;

        return tempAgg;
      }, {});

      const formatted = result.disbursement.sort((a,b) => {
        if ( a.clearedDate < b.clearedDate ){
          return -1;
        }
        if ( a.clearedDate > b.clearedDate ){
          return 1;
        }
        return 0;
      }).reduce((agg, curr) => {
        const tempAgg = { ...agg };

        const { net } = computeDisbursement(
          curr.nonVatableAmount,
          curr.vatableAmount,
          curr.ewtTaxRate
        );

        if (!tempAgg[curr.clearedDate]) {
          tempAgg[curr.clearedDate] = { deposit: 0, withdrawal: 0, runningBalance: 0 };
        }

        tempAgg[curr.clearedDate].withdrawal =
          tempAgg[curr.clearedDate].withdrawal + net;
        withdrawal = withdrawal + net;

        runningBalance += tempAgg[curr.clearedDate].deposit
        runningBalance -= tempAgg[curr.clearedDate].withdrawal
        tempAgg[curr.clearedDate].runningBalance = runningBalance

        return tempAgg;
      }, formattedDeposit);

      setData(formatted);
      setTotal({ deposit, withdrawal });
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
              <CardTitle tag='h4'>Bank Balance</CardTitle>
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
                    <td>Deposit</td>
                    <td>Withdrawal</td>
                    <td>Running Balance</td>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(data).map(([date, value]) => (
                    <tr key={date}>
                      <td>{date}</td>
                      <td>{numberToCurrency(value.deposit)}</td>
                      <td>{numberToCurrency(value.withdrawal)}</td>
                      <td>{numberToCurrency(value.runningBalance)}</td>
                    </tr>
                  ))}
                </tbody>
                <thead>
                  <tr>
                    <td>Total</td>
                    <td>{numberToCurrency(total.deposit)}</td>
                    <td>{numberToCurrency(total.withdrawal)}</td>
                    <td></td>
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

export default BankBalance;
