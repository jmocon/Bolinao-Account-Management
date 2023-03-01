import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button
} from 'reactstrap';
import { faker } from '@faker-js/faker';

import DataTable from 'components/DataTable/DataTable';

function Suppliers() {
  const banks = ['BDO', 'BPI', 'ChinaBank', 'MetroBank'];

  const sampleData = banks.map((bank) => {
    const bankFormatId = faker.datatype.number({ min: 100, max: 1000 });

    return [
      bankFormatId,
      bank,
      <>
        <Button
          size='sm'
          color='info'
          title='View'
          className='btn-icon mr-1'
          onClick={() => handleModal('view', bankFormatId)}>
          <i className='tim-icons icon-zoom-split'></i>
        </Button>
        <Button
          size='sm'
          color='success'
          title='Edit'
          className='btn-icon mr-1'
          onClick={() => handleModal('update', bankFormatId)}>
          <i className='tim-icons icon-pencil'></i>
        </Button>
        <Button
          size='sm'
          color='danger'
          title='Delete'
          className='btn-icon mr-1'
          onClick={() => handleModal('delete', bankFormatId)}>
          <i className='tim-icons icon-simple-remove'></i>
        </Button>
      </>
    ];
  });
  const [rows, setRows] = useState(sampleData);
  const columns = [
    'Check Format Id',
    'Name',
    'Actions'
  ];

  const handleModal = () => {
  };

  return (
    <>
      <div className='content'>
        <Row>
          <Col md='12'>
            <Card>
              <CardHeader>
                <Row>
                  <Col>
                    <CardTitle tag='h4'>Check Formats</CardTitle>
                  </Col>
                  <Col className='text-right'>
                    <Button
                      color='info'
                      size='sm'
                      title='View'
                      onClick={() => handleModal('add')}
                      className='animation-on-hover'>
                      <i className='fa fa-plus'></i> Add New Check Format
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <DataTable
                  title='Users'
                  columns={columns}
                  rows={rows}
                  withAction
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Suppliers;
