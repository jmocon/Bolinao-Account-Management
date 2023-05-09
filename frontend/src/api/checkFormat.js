import axios from './axios';

const DEFAULT_ROUTE = '/check';

const mapData = (checkFormat) => ({
  checkFormatId: checkFormat.id,
  name: checkFormat.name,
  abbr: checkFormat.abbr
});

export const getCheckFormat = async (id) => {
  let response;
  try {
    response = await axios.get(`${DEFAULT_ROUTE}/${id}`);
  } catch (error) {
    throw new Error(`Error occurred while getting check format: ${error}`);
  }

  return response.data.data;
};

export const getCheckFormatByDisbursementId = async (id) => {
  let response;
  try {
    response = await axios.get(`${DEFAULT_ROUTE}/disbursement/${id}`);
  } catch (error) {
    throw new Error(`Error occurred while getting check format by disbursement id: ${error}`);
  }

  return response.data.data;
};

export const getCheckFormats = async () => {
  let response;
  try {
    response = await axios.get(DEFAULT_ROUTE);
  } catch (error) {
    throw new Error(`Error occurred while getting check formats: ${error}`);
  }

  const { data, success } = response.data;

  if (!success) {
    throw new Error(
      `Error occurred while getting check formats: ${response.data.message}`
    );
  }

  return data.map(mapData);
};

export const getCheckTable = async () => {
  let response;
  try {
    response = await axios.get(`${DEFAULT_ROUTE}/table`);
  } catch (error) {
    throw new Error(`Error occurred while getting check table: ${error}`);
  }

  const { data, success } = response.data;

  if (!success) {
    throw new Error(
      `Error occurred while getting check: ${response.data.message}`
    );
  }

  return data;
};

export const getCheckFormatDetails = async () => {
  let response;
  try {
    response = await axios.get(`${DEFAULT_ROUTE}/table`);
  } catch (error) {
    throw new Error(`Error occurred while getting check table: ${error}`);
  }

  const { data, success } = response.data;

  if (!success) {
    throw new Error(
      `Error occurred while getting check: ${response.data.message}`
    );
  }

  return data;
};

export const addCheckFormat = async (data) => {
  let response;
  try {
    response = await axios.post(DEFAULT_ROUTE, data);
  } catch (error) {
    throw new Error(`Error occurred while adding check format: ${error}`);
  }

  return response.data;
};

export const updateCheckFormat = async (id, data) => {
  let response;
  try {
    response = await axios.put(`${DEFAULT_ROUTE}/${id}`, data);
  } catch (error) {
    throw new Error(`Error occurred while updating check format: ${error}`);
  }

  return response.data;
};

export const deleteCheckFormat = async (id) => {
  let response;
  try {
    response = await axios.delete(`${DEFAULT_ROUTE}/${id}`);
  } catch (error) {
    throw new Error(`Error occurred while deleting check format: ${error}`);
  }

  return response.data;
};
