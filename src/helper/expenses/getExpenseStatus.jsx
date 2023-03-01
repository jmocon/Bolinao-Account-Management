const EXPENSE_STATUS_DRAFT = {
  value: 0,
  title: 'Draft',
  color: 'secondary'
};
const EXPENSE_STATUS_PENDING = {
  value: 1,
  title: 'Pending',
  color: 'primary'
};
const EXPENSE_STATUS_FOR_CORRECTION = {
  value: 2,
  title: 'For Correction',
  color: 'warning'
};
const EXPENSE_STATUS_APPROVED = {
  value: 3,
  title: 'Approved',
  color: 'success'
};
const EXPENSE_STATUS_CANCELLED = {
  value: 4,
  title: 'Cancelled',
  color: 'light'
};
const EXPENSE_STATUS_UNDEFINED = {
  value: undefined,
  title: 'Undefined',
  color: 'danger'
};

const getExpenseStatus = (value) => {
  switch (value) {
    case EXPENSE_STATUS_DRAFT.value:
      return EXPENSE_STATUS_DRAFT;
    case EXPENSE_STATUS_PENDING.value:
      return EXPENSE_STATUS_PENDING;
    case EXPENSE_STATUS_FOR_CORRECTION.value:
      return EXPENSE_STATUS_FOR_CORRECTION;
    case EXPENSE_STATUS_APPROVED.value:
      return EXPENSE_STATUS_APPROVED;
    case EXPENSE_STATUS_CANCELLED.value:
      return EXPENSE_STATUS_CANCELLED;

    default:
      return EXPENSE_STATUS_UNDEFINED;
  }
};

export const getExpenseStatusByTitle = (title) => {
  switch (title) {
    case EXPENSE_STATUS_DRAFT.title:
      return EXPENSE_STATUS_DRAFT;
    case EXPENSE_STATUS_PENDING.title:
      return EXPENSE_STATUS_PENDING;
    case EXPENSE_STATUS_FOR_CORRECTION.title:
      return EXPENSE_STATUS_FOR_CORRECTION;
    case EXPENSE_STATUS_APPROVED.title:
      return EXPENSE_STATUS_APPROVED;
    case EXPENSE_STATUS_CANCELLED.title:
      return EXPENSE_STATUS_CANCELLED;

    default:
      return EXPENSE_STATUS_UNDEFINED;
  }
};

export default getExpenseStatus;
