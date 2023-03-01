import { Badge } from 'reactstrap';
import {getExpenseStatusByTitle} from 'helper/expenses/getExpenseStatus';

const getExpenseStatusPill = ({status}) => {
  const values = getExpenseStatusByTitle(status);

  return <Badge color={values.color}>{values.title}</Badge>;
};

export default getExpenseStatusPill;
