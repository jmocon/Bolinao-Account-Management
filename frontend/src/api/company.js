import axios from './axios';

const DEFAULT_ROUTE = '/company';

const mapData = (company) => {
  const newCompany = { ...company, companyId: company.id };
  delete newCompany.id;
  return newCompany;
};

export const getCompany = async (id) => {
  let response;
  try {
    response = await axios.get(`${DEFAULT_ROUTE}/${id}`);
  } catch (error) {
    throw new Error(`Error occurred while getting company: ${error}`);
  }

  return mapData(response.data.data[0]);
};

export const getCompanies = async () => {
  let response;
  try {
    response = await axios.get(DEFAULT_ROUTE);
  } catch (error) {
    throw new Error(`Error occurred while getting companies: ${error}`);
  }

  const { data, success } = response.data;

  if (!success) {
    throw new Error(
      `Error occurred while getting companies: ${response.data.message}`
    );
  }

  return data.map(mapData);
};

export const addCompany = async (data) => {
  let response;
  try {
    response = await axios.post(DEFAULT_ROUTE, data);
  } catch (error) {
    throw new Error(`Error occurred while adding company: ${error}`);
  }

  return response.data;
};

export const updateCompany = async (id, data) => {
  let response;
  try {
    response = await axios.put(`${DEFAULT_ROUTE}/${id}`, data);
  } catch (error) {
    throw new Error(`Error occurred while updating company: ${error}`);
  }

  return response.data;
};

export const deleteCompany = async (id) => {
  let response;
  try {
    response = await axios.delete(`${DEFAULT_ROUTE}/${id}`);
  } catch (error) {
    throw new Error(`Error occurred while deleting Company: ${error}`);
  }

  return response.data;
};
