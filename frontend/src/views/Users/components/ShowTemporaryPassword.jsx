import React from 'react';
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label
} from 'reactstrap';

const ShowTemporaryPassword = ({ isOpen, toggle, password }) => (
  <Modal isOpen={isOpen} toggle={toggle} size='lg'>
    <ModalHeader toggle={toggle}>Temporary password</ModalHeader>
    <ModalBody>
      <Row>
        <Col>
          <h3>This will be the temporary password for the account</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Label>Temporary Password</Label>
          <span className='form-control'>{password}</span>
        </Col>
      </Row>
    </ModalBody>
    <ModalFooter className='p-4 justify-content-end'>
      <Button color='default' onClick={toggle}>
        Close
      </Button>
    </ModalFooter>
  </Modal>
);

export default ShowTemporaryPassword;
