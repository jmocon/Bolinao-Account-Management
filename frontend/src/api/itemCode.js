import axios from './axios';

const DEFAULT_ROUTE = '/itemCode';

const mapData = (itemCode) => ({
  itemCodeId: itemCode.id,
  name: itemCode.name
});

export const getItemCode = async (id) => {
  let response;
  try {
    response = await axios.get(`${DEFAULT_ROUTE}/${id}`);
  } catch (error) {
    throw new Error(`Error occurred while getting item code: ${error}`);
  }

  return mapData(response.data.data[0]);
};

export const getItemCodes = async () => {
  let response;
  try {
    response = await axios.get(DEFAULT_ROUTE);
  } catch (error) {
    throw new Error(
      `Error occurred while getting item codes: ${error.message}`
    );
  }

  const { data, success } = response.data;

  if (!success) {
    throw new Error(`Error occurred on item codes: ${response.data.message}`);
  }

  return data.map(mapData);
};

export const addItemCode = async (data) => {
  let response;
  try {
    response = await axios.post(DEFAULT_ROUTE, data);
  } catch (error) {
    throw new Error(`Error occurred while adding item code: ${error}`);
  }

  return response.data;
};

export const updateItemCode = async (id, data) => {
  let response;
  try {
    response = await axios.put(`${DEFAULT_ROUTE}/${id}`, data);
  } catch (error) {
    throw new Error(`Error occurred while updating item code: ${error}`);
  }

  return response.data;
};

export const deleteItemCode = async (id) => {
  let response;
  try {
    response = await axios.delete(`${DEFAULT_ROUTE}/${id}`);
  } catch (error) {
    throw new Error(`Error occurred while deleting item code: ${error}`);
  }

  return response.data;
};
