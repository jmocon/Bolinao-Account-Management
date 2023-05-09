import axios from './axios';

const DEFAULT_ROUTE = '/depositSlipFormat';

export const getDepositSlipFormat = async (id) => {
  let response;
  try {
    response = await axios.get(`${DEFAULT_ROUTE}/${id}`);
  } catch (error) {
    throw new Error(
      `Error occurred while getting deposit slip format: ${error}`
    );
  }

  return response.data.data;
};

export const getDepositSlipFormats = async () => {
  let response;
  try {
    response = await axios.get(DEFAULT_ROUTE);
  } catch (error) {
    throw new Error(
      `Error occurred while getting deposit slip format: ${error}`
    );
  }

  const { data, success } = response.data;

  if (!success) {
    throw new Error(
      `Error occurred while getting deposit slip format: ${response.data.message}`
    );
  }

  return data;
};

export const addDepositSlipFormat = async (data) => {
  let response;
  try {
    response = await axios.post(DEFAULT_ROUTE, data);
  } catch (error) {
    throw new Error(
      `Error occurred while adding deposit slip format: ${error}`
    );
  }

  return response.data;
};

export const updateDepositSlipFormat = async (id, data) => {
  let response;
  try {
    response = await axios.put(`${DEFAULT_ROUTE}/${id}`, data);
  } catch (error) {
    throw new Error(
      `Error occurred while updating deposit slip format: ${error}`
    );
  }

  return response.data;
};

export const updateDepositSlipFormatPrint = async (id, data) => {
  let response;
  try {
    response = await axios.put(`${DEFAULT_ROUTE}/print/${id}`, data);
  } catch (error) {
    throw new Error(
      `Error occurred while updating deposit slip format: ${error}`
    );
  }

  return response.data;
};

export const deleteDepositSlipFormat = async (id) => {
  let response;
  try {
    response = await axios.delete(`${DEFAULT_ROUTE}/${id}`);
  } catch (error) {
    throw new Error(
      `Error occurred while deleting deposit slip format: ${error}`
    );
  }

  return response.data;
};
