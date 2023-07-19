import axios from './axios';

const DEFAULT_ROUTE = '/user';

const mapData = (user) => ({
  userId: user.id,
  roleId: user.role_id,
  firstName: user.first_name,
  middleName: user.middle_name,
  lastName: user.last_name,
  suffixName: user.suffix_name,
  birthDate: (user.birth_date || '').substring(0, 10),
  gender: user.gender,
  contactNumber: user.contact_number,
  homeAddress: user.home_address,
  emailAddress: user.email_address,
  username: user.username,
  resetPassword: user.reset_password,
  dateCreated: user.date_created.substring(0, 10),
  isArchived: user.is_archived
});

export const getUser = async (id) => {
  let response;
  try {
    response = await axios.get(`${DEFAULT_ROUTE}/${id}`);
  } catch (error) {
    throw new Error(`Error occurred while getting user: ${error}`);
  }

  return mapData(response.data.user);
};

export const getUsers = async () => {
  let response;
  try {
    response = await axios.get(DEFAULT_ROUTE);
  } catch (error) {
    throw new Error(`Error occurred while getting users: ${error}`);
  }

  const { users, success } = response.data;

  if (!success) {
    throw new Error(
      `Error occurred while getting users: ${response.data.message}`
    );
  }

  return users.map(mapData);
};

export const addUser = async (data) => {
  let response;
  try {
    response = await axios.post(DEFAULT_ROUTE, data);
  } catch (error) {
    throw new Error(`Error occurred while adding user: ${error}`);
  }

  return response.data;
};

export const login = async (data) => {
  let response;
  try {
    response = await axios.post(`${DEFAULT_ROUTE}/login`, data);
  } catch (error) {
    if (error?.response?.data) {
      throw error?.response?.data;
    }
    throw new Error(`Error occurred while logging in: ${error}`);
  }

  return response.data;
};

export const updateUser = async (id, data) => {
  let response;
  try {
    response = await axios.put(`${DEFAULT_ROUTE}/${id}`, data);
  } catch (error) {
    throw new Error(`Error occurred while updating user: ${error}`);
  }

  return response.data;
};

export const resetPassword = async (id, data) => {
  let response;
  try {
    response = await axios.put(`${DEFAULT_ROUTE}/resetpassword/${id}`, data);
  } catch (error) {
    throw new Error(`Error occurred while updating user: ${error}`);
  }

  return response.data;
};

export const updatePassword = async (id, data) => {
  let response;
  try {
    response = await axios.put(`${DEFAULT_ROUTE}/updatePassword/${id}`, data);
  } catch (error) {
    throw new Error(`Error occurred while updating user: ${error}`);
  }

  return response.data;
};

export const deleteUser = async (id) => {
  let response;
  try {
    response = await axios.delete(`${DEFAULT_ROUTE}/${id}`);
  } catch (error) {
    throw new Error(`Error occurred while deleting User: ${error}`);
  }

  return response.data;
};
