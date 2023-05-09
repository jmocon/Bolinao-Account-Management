import { Badge } from 'reactstrap';
import getExpenseStatus from 'helper/expenses/getExpenseStatus';

const ExpenseStatusPill = ({status, className=''}) => {
  const values = getExpenseStatus(status);

  return <Badge color={values.color} className={className}>{values.title}</Badge>;
};

export default ExpenseStatusPill;
