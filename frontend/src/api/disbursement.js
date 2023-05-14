import disbursementStatus from 'constants/disbursementStatus';
import axios from './axios';

const DEFAULT_ROUTE = '/disbursements';

const mapData = (disbursement) => ({
  disbursementId: disbursement.id,
  companyId: disbursement.company_id,
  disbursementDate: disbursement.disbursement_date.substring(0, 10),
  expenseCategory: disbursement.expense_category,
  nonExpenseCategory: disbursement.non_expense_category,
  supplierId: disbursement.supplier_id,
  particulars: disbursement.particulars,
  itemCodeId: disbursement.item_code,
  vatableAmount: disbursement.vatable_amount,
  nonVatableAmount: disbursement.non_vatable_amount,
  ewtId: disbursement.ewt_id,
  apChargeTo: disbursement.ap_charge_to,
  bankAccountId: disbursement.bank_account_id,
  checkNumber: disbursement.check_number,
  checkDate: disbursement.check_date.substring(0, 10),
  clearedDate: disbursement.cleared_date,
  status: disbursement.status
});

export const getDisbursement = async (id) => {
  let response;
  try {
    response = await axios.get(`${DEFAULT_ROUTE}/${id}`);
  } catch (error) {
    throw new Error(`Error occurred while getting disbursement: ${error}`);
  }

  const disbursement = mapData(response.data[0]);

  return disbursement;
};

export const getBankReconciliation = async ({
  bankAccountId,
  startDate,
  endDate
}) => {
  let response;
  try {
    response = await axios.get(
      `${DEFAULT_ROUTE}/bankReconciliation/${bankAccountId}/${startDate}/${endDate}`
    );
  } catch (error) {
    throw new Error(
      `Error occurred while getting bank reconciliation: ${error}`
    );
  }

  return response.data;
};

export const getDisbursementDetails = async (id) => {
  let response;
  try {
    response = await axios.get(`${DEFAULT_ROUTE}/details/${id}`);
  } catch (error) {
    throw new Error(`Error occurred while getting disbursement: ${error}`);
  }

  const disbursement = response.data[0];

  return disbursement;
};

export const getBIR2307 = async (id) => {
  let response;
  try {
    response = await axios.get(`${DEFAULT_ROUTE}/bir2307/${id}`);
  } catch (error) {
    throw new Error(`Error occurred while getting bir2307: ${error}`);
  }

  const disbursement = response.data[0];

  return disbursement;
};

export const getDisbursements = async () => {
  let response;
  try {
    response = await axios.get(DEFAULT_ROUTE);
  } catch (error) {
    throw new Error(`Error occurred while getting disbursements: ${error}`);
  }

  const disbursements = response.data;

  return disbursements;
};

export const getDisbursementTable = async () => {
  let response;
  try {
    response = await axios.get(`${DEFAULT_ROUTE}/table`);
  } catch (error) {
    throw new Error(
      `Error occurred while getting disbursement table: ${error}`
    );
  }

  const disbursements = response.data;

  return disbursements;
};

export const getDESummary = async (params) => {
  let response;
  try {
    response = await axios.get(`${DEFAULT_ROUTE}/deSummary`, { params });
  } catch (error) {
    throw new Error(`Error occurred while getting DE Summary: ${error}`);
  }

  const disbursements = response.data;

  return disbursements;
};

export const getIESummary = async (params) => {
  let response;
  try {
    response = await axios.get(`${DEFAULT_ROUTE}/ieSummary`, { params });
  } catch (error) {
    throw new Error(`Error occurred while getting IE Summary: ${error}`);
  }

  const disbursements = response.data;

  return disbursements;
};

export const getEWTSummary = async (params) => {
  let response;
  try {
    response = await axios.get(`${DEFAULT_ROUTE}/ewtSummary`, { params });
  } catch (error) {
    throw new Error(`Error occurred while getting EWT Summary: ${error}`);
  }

  const disbursements = response.data;

  return disbursements;
};

export const addDisbursement = async (disbursement) => {
  let response;
  try {
    response = await axios.post(DEFAULT_ROUTE, disbursement);
  } catch (error) {
    throw new Error(`Error occurred while adding disbursement: ${error}`);
  }

  return response;
};

export const updateDisbursement = async (id, disbursement) => {
  let response;
  try {
    response = await axios.put(`${DEFAULT_ROUTE}/${id}`, disbursement);
  } catch (error) {
    throw new Error(`Error occurred while adding disbursement: ${error}`);
  }

  return response.data;
};

export const updateStatus = async (id, status) => {
  let response;
  try {
    response = await axios.put(`${DEFAULT_ROUTE}/${id}/${status}`);
  } catch (error) {
    throw new Error(
      `Error occurred while updating disbursement status: ${error}`
    );
  }

  return response.data;
};

export const clearDisbursement = async (id, clearedDate) => {
  let response;
  try {
    response = await axios.put(
      `${DEFAULT_ROUTE}/${id}/${disbursementStatus.cleared}`,
      { clearedDate }
    );
  } catch (error) {
    throw new Error(`Error occurred while clearing disbursement: ${error}`);
  }

  return response.data;
};

export const cancelledDisbursement = async (id) => {
  let response;
  try {
    response = await axios.put(`${DEFAULT_ROUTE}/${id}/cancelled`);
  } catch (error) {
    throw new Error(`Error occurred while cancelling disbursement: ${error}`);
  }

  return response.data;
};

export const deleteDisbursement = async (id) => {
  let response;
  try {
    response = await axios.delete(`${DEFAULT_ROUTE}/${id}`);
  } catch (error) {
    throw new Error(`Error occurred while getting disbursement: ${error}`);
  }

  return response.data;
};
