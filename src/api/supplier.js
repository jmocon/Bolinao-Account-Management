import axios from './axios';

const DEFAULT_ROUTE = '/supplier';

const mapData = (supplier) => ({
  supplierId: supplier.id,
  name: supplier.name,
  address: supplier.address,
  tin: supplier.tin,
  contactNumber: supplier.contact_number,
  checkPayee: supplier.check_payee,
  bankId: supplier.bank_id,
  accountNumber: supplier.account_number
});

export const getSupplier = async (id) => {
  let response;
  try {
    response = await axios.get(`${DEFAULT_ROUTE}/${id}`);
  } catch (error) {
    console.log(`Error occurred while getting supplier: ${error}`);
  }

  return mapData(response.data.data[0]);
};

export const getSuppliers = async () => {
  let response;
  try {
    response = await axios.get(DEFAULT_ROUTE);
  } catch (error) {
    console.log(`Error occurred while getting suppliers: ${error}`);
  }

  const { data, success } = response.data;

  if (!success) {
    throw new Error(
      `Error occurred while getting suppliers: ${response.data.message}`
    );
  }

  return data.map(mapData);
};

export const addSupplier = async (data) => {
  let response;
  try {
    response = await axios.post(DEFAULT_ROUTE, data);
  } catch (error) {
    console.log(`Error occurred while adding supplier: ${error}`);
  }

  return response.data;
};

export const updateSupplier = async (id, data) => {
  let response;
  try {
    response = await axios.put(`${DEFAULT_ROUTE}/${id}`, data);
  } catch (error) {
    console.log(`Error occurred while updating supplier: ${error}`);
  }

  return response.data;
};

export const deleteSupplier = async (id) => {
  let response;
  try {
    response = await axios.delete(`${DEFAULT_ROUTE}/${id}`);
  } catch (error) {
    console.log(`Error occurred while deleting Supplier: ${error}`);
  }

  return response.data;
};
