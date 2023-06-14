import { updateDepositSlipPrintDate } from 'api/depositSlip';
import DepositSlipFormatDropdown from 'components/Dropdown/DepositSlipFormatDropdown';
import { useState } from 'react';
import {
  Alert,
  Button,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table
} from 'reactstrap';

const Print = ({ depositSlipId, notify }) => {
  const [inputs, setInputs] = useState({});
  // Notification
  const [alert, setAlert] = useState({
    color: 'primary',
    message: '',
    visible: false
  });
  const onDismiss = () =>
    setAlert({
      color: 'primary',
      message: '',
      visible: false
    });

  // Modal
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    onDismiss();
    setIsOpen((currState) => !currState);
  };

  const handlePrint = async () => {
    try {
      await updateDepositSlipPrintDate(depositSlipId);
    } catch (error) {
      setAlert({
        color: 'danger',
        message: error,
        visible: false
      });

      return;
    }
    const params = Object.entries(inputs).reduce(
      (agg, [key, value]) => `${agg}${key}=${value}&`,
      ''
    );

    window.open(`/depositSlip/${depositSlipId}?${params}`, '_blank');
  };

  const handleInput = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Button color='info' className='mr-2' onClick={toggleModal}>
        Print Deposit Slip
      </Button>
      <Modal isOpen={isOpen} toggle={toggleModal} size='xl'>
        <ModalHeader toggle={toggleModal}>Print Deposit Slip</ModalHeader>
        <ModalBody>
          <Alert color={alert.color} isOpen={alert.visible} toggle={onDismiss}>
            {alert.message}
          </Alert>
          <Row>
            <Col>
              <Label>Cash</Label>
              <Row>
                <Col>
                  <Table>
                    <tbody>
                      <tr>
                        <td>Domination</td>
                        <td>Pieces</td>
                      </tr>
                      <tr>
                        <td className='p-1 text-center'>1000</td>
                        <td className='p-1'>
                          <Input
                            type='number'
                            bsSize='sm'
                            value={inputs['1000'] || ''}
                            onChange={(e) =>
                              handleInput('1000', e.target.value)
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className='p-1 text-center'>500</td>
                        <td className='p-1'>
                          <Input
                            type='number'
                            bsSize='sm'
                            value={inputs['500'] || ''}
                            onChange={(e) => handleInput('500', e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className='p-1 text-center'>200</td>
                        <td className='p-1'>
                          <Input
                            type='number'
                            bsSize='sm'
                            value={inputs['200'] || ''}
                            onChange={(e) => handleInput('200', e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className='p-1 text-center'>100</td>
                        <td className='p-1'>
                          <Input
                            type='number'
                            bsSize='sm'
                            value={inputs['100'] || ''}
                            onChange={(e) => handleInput('100', e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className='p-1 text-center'>50</td>
                        <td className='p-1'>
                          <Input
                            type='number'
                            bsSize='sm'
                            value={inputs['50'] || ''}
                            onChange={(e) => handleInput('50', e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className='p-1 text-center'>20</td>
                        <td className='p-1'>
                          <Input
                            type='number'
                            bsSize='sm'
                            value={inputs['20'] || ''}
                            onChange={(e) => handleInput('20', e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className='p-1 text-center'>coins</td>
                        <td className='p-1'>
                          <Input
                            type='number'
                            bsSize='sm'
                            value={inputs['coins'] || ''}
                            onChange={(e) =>
                              handleInput('coins', e.target.value)
                            }
                          />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Col>
            <Col>
              <Label>Deposit Slip Format</Label>
              <DepositSlipFormatDropdown
                label='Deposit Slip Format'
                value={inputs['depositSlipFormatId']}
                onChange={(value) => handleInput('depositSlipFormatId', value)}
              />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter className='p-4 justify-content-end'>
          <Button color='info' onClick={handlePrint} className='mr-2'>
            Print
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Print;
