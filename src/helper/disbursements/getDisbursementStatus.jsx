const DISBURSEMENT_STATUS_DRAFT = {
  value: 0,
  title: 'Draft',
  color: 'secondary'
};
const DISBURSEMENT_STATUS_PENDING = {
  value: 1,
  title: 'Pending',
  color: 'primary'
};
const DISBURSEMENT_STATUS_FOR_CORRECTION = {
  value: 2,
  title: 'For Correction',
  color: 'warning'
};
const DISBURSEMENT_STATUS_APPROVED = {
  value: 3,
  title: 'Approved',
  color: 'success'
};
const DISBURSEMENT_STATUS_PRINT = {
  value: 4,
  title: 'Printed',
  color: 'info'
};
const DISBURSEMENT_STATUS_CLEARED = {
  value: 5,
  title: 'Cleared',
  color: 'dark'
};
const DISBURSEMENT_STATUS_CANCELLED = {
  value: 6,
  title: 'Cancelled',
  color: 'light'
};
const DISBURSEMENT_STATUS_UNDEFINED = {
  value: undefined,
  title: 'Undefined',
  color: 'danger'
};

export const getDisbursementStatus = (value) => {
  switch (value) {
    case DISBURSEMENT_STATUS_DRAFT.value:
      return DISBURSEMENT_STATUS_DRAFT;
    case DISBURSEMENT_STATUS_PENDING.value:
      return DISBURSEMENT_STATUS_PENDING;
    case DISBURSEMENT_STATUS_FOR_CORRECTION.value:
      return DISBURSEMENT_STATUS_FOR_CORRECTION;
    case DISBURSEMENT_STATUS_APPROVED.value:
      return DISBURSEMENT_STATUS_APPROVED;
    case DISBURSEMENT_STATUS_PRINT.value:
      return DISBURSEMENT_STATUS_PRINT;
    case DISBURSEMENT_STATUS_CLEARED.value:
      return DISBURSEMENT_STATUS_CLEARED;
    case DISBURSEMENT_STATUS_CANCELLED.value:
      return DISBURSEMENT_STATUS_CANCELLED;

    default:
      return DISBURSEMENT_STATUS_UNDEFINED;
  }
};

export const getDisbursementStatusByTitle = (title) => {
  switch (title) {
    case DISBURSEMENT_STATUS_DRAFT.title:
      return DISBURSEMENT_STATUS_DRAFT;
    case DISBURSEMENT_STATUS_PENDING.title:
      return DISBURSEMENT_STATUS_PENDING;
    case DISBURSEMENT_STATUS_FOR_CORRECTION.title:
      return DISBURSEMENT_STATUS_FOR_CORRECTION;
    case DISBURSEMENT_STATUS_APPROVED.title:
      return DISBURSEMENT_STATUS_APPROVED;
    case DISBURSEMENT_STATUS_PRINT.title:
      return DISBURSEMENT_STATUS_PRINT;
    case DISBURSEMENT_STATUS_CLEARED.title:
      return DISBURSEMENT_STATUS_CLEARED;
    case DISBURSEMENT_STATUS_CANCELLED.title:
      return DISBURSEMENT_STATUS_CANCELLED;

    default:
      return DISBURSEMENT_STATUS_UNDEFINED;
  }
};

export default getDisbursementStatus;
