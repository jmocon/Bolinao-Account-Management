import { Badge } from 'reactstrap';
import { getDisbursementStatus } from 'helper/disbursements/getDisbursementStatus';

const DisbursementStatusPill = ({ status, ...rest }) => {
  const values = getDisbursementStatus(status);

  return <Badge color={values.color} {...rest}>{values.title}</Badge>;
};

export default DisbursementStatusPill;
