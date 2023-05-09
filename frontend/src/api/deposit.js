import axios from './axios';

const DEFAULT_ROUTE = '/deposit';

export const mapDeposit = (deposit) => ({
  ...deposit,
  depositId: deposit.id,
  bankAccountId: deposit.bank_account_id,
  payee: deposit.payee,
  particular: deposit.particular,
  depositDate: deposit.deposit_date && deposit.deposit_date.substring(0, 10),
  bankId: deposit.bank_id,
  modeOfPayment: deposit.mode_of_payment,
  amount: deposit.amount,
  checkNumber: deposit.check_number,
  checkDate: deposit.check_date && deposit.check_date.substring(0, 10),
  clearedDate: deposit.cleared_date && deposit.cleared_date.substring(0, 10)
});

export const getDeposit = async (id) => {
  let response;
  try {
    response = await axios.get(`${DEFAULT_ROUTE}/${id}`);
  } catch (error) {
    throw new Error(`Error occurred while getting deposit: ${error}`);
  }

  return mapDeposit(response.data.data[0]);
};

export const getDeposits = async () => {
  let response;
  try {
    response = await axios.get(DEFAULT_ROUTE);
  } catch (error) {
    throw new Error(`Error occurred while getting deposits: ${error}`);
  }

  const { data, success } = response.data;

  if (!success) {
    throw new Error(
      `Error occurred while getting deposits: ${response.data.message}`
    );
  }

  return data.map(mapDeposit);
};

export const getDepositTable = async () => {
  let response;
  try {
    response = await axios.get(`${DEFAULT_ROUTE}/table`);
  } catch (error) {
    throw new Error(`Error occurred while getting deposits: ${error}`);
  }

  const { data, success } = response.data;

  if (!success) {
    throw new Error(
      `Error occurred while getting deposits: ${response.data.message}`
    );
  }

  return data;
};

export const getOpenDeposits = async () => {
  let response;
  try {
    response = await axios.get(`${DEFAULT_ROUTE}/open`);
  } catch (error) {
    throw new Error(`Error occurred while getting open deposits: ${error}`);
  }

  const { data, success } = response.data;

  if (!success) {
    throw new Error(
      `Error occurred while getting open deposits: ${response.data.message}`
    );
  }

  return data;
};

export const addDeposit = async (data) => {
  let response;
  try {
    response = await axios.post(DEFAULT_ROUTE, data);
  } catch (error) {
    throw new Error(`Error occurred while adding deposit: ${error}`);
  }

  return response.data;
};

export const updateDeposit = async (id, data) => {
  let response;
  try {
    response = await axios.put(`${DEFAULT_ROUTE}/${id}`, data);
  } catch (error) {
    throw new Error(`Error occurred while updating deposit: ${error}`);
  }

  return response.data;
};

export const clearDeposit = async (id, data) => {
  let response;
  try {
    response = await axios.put(`${DEFAULT_ROUTE}/clear/${id}`, data);
  } catch (error) {
    throw new Error(`Error occurred while clearing deposit: ${error}`);
  }

  return response.data;
};

export const deleteDeposit = async (id) => {
  let response;
  try {
    response = await axios.delete(`${DEFAULT_ROUTE}/${id}`);
  } catch (error) {
    throw new Error(`Error occurred while deleting Deposit: ${error}`);
  }

  return response.data;
};
