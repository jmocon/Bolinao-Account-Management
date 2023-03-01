import axios from './axios';

const DEFAULT_ROUTE = '/bank';

const mapData = (bank) => ({
  bankId: bank.id,
  name: bank.name,
  abbr: bank.abbr,
});

export const getBank = async (id) => {
  let response;
  try {
    response = await axios.get(`${DEFAULT_ROUTE}/${id}`);
  } catch (error) {
    console.log(`Error occurred while getting bank: ${error}`);
  }

  return mapData(response.data.data[0]);
};

export const getBanks = async () => {
  let response;
  try {
    response = await axios.get(DEFAULT_ROUTE);
  } catch (error) {
    console.log(`Error occurred while getting banks: ${error}`);
  }

  const { data, success } = response.data;

  if (!success) {
    throw new Error(`Error occurred while getting banks: ${response.data.message}`)
  }
  
  return data.map(mapData);

};

export const addBank = async (data) => {
  let response;
  try {
    response = await axios.post(DEFAULT_ROUTE, data);
  } catch (error) {
    console.log(`Error occurred while adding bank: ${error}`);
  }

  return response.data;
};

export const updateBank = async (id,data) => {
  let response;
  try {
    response = await axios.put(`${DEFAULT_ROUTE}/${id}`, data);
  } catch (error) {
    console.log(`Error occurred while updating bank: ${error}`);
  }

  return response.data;
};

export const deleteBank = async (id) => {
  let response;
  try {
    response = await axios.delete(`${DEFAULT_ROUTE}/${id}`);
  } catch (error) {
    console.log(`Error occurred while deleting Bank: ${error}`);
  }

  return response.data;
};
