import axios from './axios';
import { mapDeposit } from './deposit';

const DEFAULT_ROUTE = '/depositSlip';

const mapDepositSlip = (ds) => ({
  depositSlipId: ds.id,
  depositSlipCode: `DS${String(ds.id).padStart(5,'0')}`,
  dateCreated: ds.date_created.substring(0, 10),
  datePrinted: ds.date_printed && ds.date_printed.substring(0, 10),
});

export const getDepositSlip = async (id) => {
  let response;
  try {
    response = await axios.get(`${DEFAULT_ROUTE}/${id}`);
  } catch (error) {
    throw new Error(`Error occurred while getting deposit: ${error}`);
  }

  const data = {
    depositSlip: mapDepositSlip(response.data.data.depositSlip),
    deposits: response.data.data.deposits.map((deposit) => mapDeposit(deposit))
  };

  return data;
};

export const getDepositSlips = async () => {
  let response;
  try {
    response = await axios.get(DEFAULT_ROUTE);
  } catch (error) {
    throw new Error(`Error occurred while getting deposit slips: ${error}`);
  }

  const { data, success } = response.data;

  if (!success) {
    throw new Error(
      `Error occurred while getting deposit slips: ${response.data.message}`
    );
  }

  return data.map(mapDepositSlip);
};

// export const getDepositTable = async () => {
//   let response;
//   try {
//     response = await axios.get(`${DEFAULT_ROUTE}/table`);
//   } catch (error) {
//     throw new Error(`Error occurred while getting deposits: ${error}`);
//   }

//   const { data, success } = response.data;

//   if (!success) {
//     throw new Error(
//       `Error occurred while getting deposits: ${response.data.message}`
//     );
//   }

//   return data;
// };

export const addDepositSlip = async (data) => {
  let response;
  try {
    response = await axios.post(DEFAULT_ROUTE, data);
  } catch (error) {
    throw new Error(`Error occurred while adding deposit slip: ${error}`);
  }

  return response.data;
};

// export const updateDeposit = async (id, data) => {
//   let response;
//   try {
//     response = await axios.put(`${DEFAULT_ROUTE}/${id}`, data);
//   } catch (error) {
//     throw new Error(`Error occurred while updating deposit: ${error}`);
//   }

//   return response.data;
// };

// export const clearDeposit = async (id, data) => {
//   let response;
//   try {
//     response = await axios.put(`${DEFAULT_ROUTE}/clear/${id}`, data);
//   } catch (error) {
//     throw new Error(`Error occurred while clearing deposit: ${error}`);
//   }

//   return response.data;
// };

export const deleteDepositSlip = async (id) => {
  let response;
  try {
    response = await axios.delete(`${DEFAULT_ROUTE}/${id}`);
  } catch (error) {
    throw new Error(`Error occurred while deleting Deposit slip: ${error}`);
  }

  return response.data;
};
