import disbursementStatus from 'constants/disbursementStatus';

const DISBURSEMENT_STATUS_DRAFT = {
  value: disbursementStatus.draft,
  title: 'Draft',
  color: 'draft'
};
const DISBURSEMENT_STATUS_PENDING = {
  value: disbursementStatus.forApproval,
  title: 'For Approval',
  color: 'warning'
};
const DISBURSEMENT_STATUS_FOR_CORRECTION = {
  value: disbursementStatus.forCorrection,
  title: 'For Correction',
  color: 'danger'
};
const DISBURSEMENT_STATUS_APPROVED = {
  value: disbursementStatus.approved,
  title: 'Approved',
  color: 'success'
};
const DISBURSEMENT_STATUS_PRINT = {
  value: disbursementStatus.print,
  title: 'Printed',
  color: 'primary'
};
const DISBURSEMENT_STATUS_CHECK = {
  value: disbursementStatus.check,
  title: 'Releasing',
  color: 'info'
};
const DISBURSEMENT_STATUS_CLEARED = {
  value: disbursementStatus.cleared,
  title: 'Cleared',
  color: 'yellow'
};
const DISBURSEMENT_STATUS_CANCELLED = {
  value: disbursementStatus.cancelled,
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
    case DISBURSEMENT_STATUS_CHECK.value:
      return DISBURSEMENT_STATUS_CHECK;
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
    case DISBURSEMENT_STATUS_CHECK.title:
      return DISBURSEMENT_STATUS_CHECK;
    case DISBURSEMENT_STATUS_CLEARED.title:
      return DISBURSEMENT_STATUS_CLEARED;
    case DISBURSEMENT_STATUS_CANCELLED.title:
      return DISBURSEMENT_STATUS_CANCELLED;

    default:
      return DISBURSEMENT_STATUS_UNDEFINED;
  }
};

export default getDisbursementStatus;
