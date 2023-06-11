import axios from './axios';

const DEFAULT_ROUTE = '/voucher';

const mapData = (voucher) => ({
  voucherId: voucher.id,
  name: voucher.name,
  abbr: voucher.abbr,
});

export const getVoucherDetail = async (id) => {
  let response;
  try {
    response = await axios.get(`${DEFAULT_ROUTE}/${id}`);
  } catch (error) {
    throw new Error(`Error occurred while getting voucher: ${error}`);
  }

  return response.data.data[0];
};

export const getVouchers = async () => {
  let response;
  try {
    response = await axios.get(DEFAULT_ROUTE);
  } catch (error) {
    throw new Error(`Error occurred while getting vouchers: ${error}`);
  }

  const { data, success } = response.data;

  if (!success) {
    throw new Error(`Error occurred while getting vouchers: ${response.data.message}`)
  }
  
  return data.map(mapData);

};

export const addVoucher = async (data) => {
  let response;
  try {
    response = await axios.post(DEFAULT_ROUTE, data);
  } catch (error) {
    throw new Error(`Error occurred while adding voucher: ${error}`);
  }

  return response.data;
};

// export const updateVoucher = async (id,data) => {
//   let response;
//   try {
//     response = await axios.put(`${DEFAULT_ROUTE}/${id}`, data);
//   } catch (error) {
//     throw new Error(`Error occurred while updating voucher: ${error}`);
//   }

//   return response.data;
// };

// export const deleteVoucher = async (id) => {
//   let response;
//   try {
//     response = await axios.delete(`${DEFAULT_ROUTE}/${id}`);
//   } catch (error) {
//     throw new Error(`Error occurred while deleting Voucher: ${error}`);
//   }

//   return response.data;
// };
