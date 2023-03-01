import axios from './axios';

const DEFAULT_ROUTE = '/bankAccount';

const mapData = (bankAccount) => ({
  bankAccountId: bankAccount.id,
  name: bankAccount.name,
  bankId: bankAccount.bank_id,
  bankName: bankAccount.bank_name,
  accountNumber: bankAccount.account_number
});

export const getBankAccount = async (id) => {
  let response;
  try {
    response = await axios.get(`${DEFAULT_ROUTE}/${id}`);
  } catch (error) {
    throw new Error(`Error occurred while getting bank account: ${error}`);
  }

  return mapData(response.data.data[0]);
};

export const getBankAccounts = async () => {
  let response;
  try {
    response = await axios.get(DEFAULT_ROUTE);
  } catch (error) {
    throw new Error(
      `Error occurred while getting bank accounts: ${error.message}`
    );
  }

  const { data, success } = response.data;

  if (!success) {
    throw new Error(
      `Error occurred on bank accounts: ${response.data.message}`
    );
  }

  return data.map(mapData);
};

export const getBankAccountTable = async () => {
  let response;
  try {
    response = await axios.get(`${DEFAULT_ROUTE}/table`);
  } catch (error) {
    throw new Error(
      `Error occurred while getting bank account table: ${error.message}`
    );
  }

  const { data, success } = response.data;

  if (!success) {
    throw new Error(
      `Error occurred on bank accounts: ${response.data.message}`
    );
  }

  return data.map((bank) => ({
    bankAccountId: bank.id,
    name: bank.name,
    bankName: bank.bank_name,
    accountNumber: bank.account_number
  }));
};

export const addBankAccount = async (data) => {
  let response;
  try {
    response = await axios.post(DEFAULT_ROUTE, data);
  } catch (error) {
    throw new Error(`Error occurred while adding bank account: ${error}`);
  }

  return response.data;
};

export const updateBankAccount = async (id, data) => {
  let response;
  try {
    response = await axios.put(`${DEFAULT_ROUTE}/${id}`, data);
  } catch (error) {
    throw new Error(`Error occurred while updating bank account: ${error}`);
  }

  return response.data;
};

export const deleteBankAccount = async (id) => {
  let response;
  try {
    response = await axios.delete(`${DEFAULT_ROUTE}/${id}`);
  } catch (error) {
    throw new Error(`Error occurred while deleting bank account: ${error}`);
  }

  return response.data;
};
