import disbursementStatus from 'constants/disbursementStatus';
import { Button } from 'reactstrap';

const ActionButtons = ({ id, status, handleModal }) => {
  return (
    <>
      <Button
        size='sm'
        color='info'
        title='View'
        className='btn-icon mr-1'
        onClick={() => handleModal('view', id)}>
        <i className='tim-icons icon-zoom-split'></i>
      </Button>
      {(status === disbursementStatus.draft ||
        status === disbursementStatus.forCorrection) && (
        <>
          <Button
            size='sm'
            color='success'
            title='Edit'
            className='btn-icon mr-1'
            onClick={() => handleModal('update', id)}>
            <i className='tim-icons icon-pencil'></i>
          </Button>
          <Button
            size='sm'
            color='danger'
            title='Delete'
            className='btn-icon mr-1'
            onClick={() => handleModal('delete', id)}>
            <i className='tim-icons icon-simple-remove'></i>
          </Button>
        </>
      )}
    </>
  );
};

export default ActionButtons;
