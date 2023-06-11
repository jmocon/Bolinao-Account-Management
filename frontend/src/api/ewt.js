import axios from './axios';

const DEFAULT_ROUTE = '/ewt';

const mapData = (ewt) => ({
  ewtId: ewt.id,
  taxType: ewt.tax_type,
  description: ewt.description,
  taxRate: ewt.tax_rate,
  atc: ewt.atc // Alphanumeric Tax Code
});

export const getEWT = async (id) => {
  let response;
  try {
    response = await axios.get(`${DEFAULT_ROUTE}/${id}`);
  } catch (error) {
    throw new Error(`Error occurred while getting ewt: ${error}`);
  }

  return mapData(response.data.data[0]);
};

export const getEWTs = async () => {
  let response;
  try {
    response = await axios.get(DEFAULT_ROUTE);
  } catch (error) {
    throw new Error(`Error occurred while getting ewts: ${error}`);
  }

  const { data, success } = response.data;

  if (!success) {
    throw new Error(`Error occurred while getting ewts: ${response.data.message}`)
  }
  
  return data.map(mapData);

};

export const addEWT = async (data) => {
  let response;
  try {
    response = await axios.post(DEFAULT_ROUTE, data);
  } catch (error) {
    throw new Error(`Error occurred while adding ewt: ${error}`);
  }

  return response.data;
};

export const updateEWT = async (id,data) => {
  let response;
  try {
    response = await axios.put(`${DEFAULT_ROUTE}/${id}`, data);
  } catch (error) {
    throw new Error(`Error occurred while updating ewt: ${error}`);
  }

  return response.data;
};

export const deleteEWT = async (id) => {
  let response;
  try {
    response = await axios.delete(`${DEFAULT_ROUTE}/${id}`);
  } catch (error) {
    throw new Error(`Error occurred while deleting EWT: ${error}`);
  }

  return response.data;
};
