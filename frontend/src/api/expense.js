import axios from './axios';

const DEFAULT_ROUTE = '/expenses';

const mapData = (expense) => ({
  expenseId: expense.id,
  companyId: expense.company_id,
  expenseDate: expense.expense_date.substr(0, 10),
  expenseCategory: expense.expense_category,
  supplierId: expense.supplier_id,
  particulars: expense.particulars,
  invoiceDate: expense.invoice_date.substr(0, 10),
  invoiceNumber: expense.invoice_number,
  itemCode: expense.item_code,
  vatableAmount: expense.vatable_amount,
  nonVatableAmount: expense.non_vatable_amount,
  ewtId: expense.ewt_id,
  modeOfPayment: expense.mode_of_payment,
  remarks: expense.remarks,
  status: expense.status,
  createdBy: expense.created_by,
  approvedBy: expense.approved_by
});

export const getExpense = async (id) => {
  let response;
  try {
    response = await axios.get(`${DEFAULT_ROUTE}/${id}`);
  } catch (error) {
    throw new Error(`Error occurred while getting expense: ${error}`);
  }

  const expense = mapData(response.data[0]);

  return expense;
};

export const getExpenseDetails = async (id) => {
  let response;
  try {
    response = await axios.get(`${DEFAULT_ROUTE}/details/${id}`);
  } catch (error) {
    throw new Error(`Error occurred while getting expense: ${error}`);
  }

  const expense = response.data[0];

  return expense;
};

export const getExpenses = async () => {
  let response;
  try {
    response = await axios.get(DEFAULT_ROUTE);
  } catch (error) {
    throw new Error(`Error occurred while getting expenses: ${error}`);
  }

  const expenses = response.data;

  return expenses;
};

export const getExpenseTable = async () => {
  let response;
  try {
    response = await axios.get(`${DEFAULT_ROUTE}/table`);
  } catch (error) {
    throw new Error(`Error occurred while getting expense table: ${error}`);
  }

  return response.data.data;
};

export const addExpense = async (expense) => {
  let response;
  try {
    response = await axios.post(DEFAULT_ROUTE, expense);
  } catch (error) {
    throw new Error(`Error occurred while adding expense: ${error}`);
  }

  return response;
};

export const updateExpense = async (id, expense) => {
  let response;
  try {
    response = await axios.put(`${DEFAULT_ROUTE}/${id}`, expense);
  } catch (error) {
    throw new Error(`Error occurred while adding expense: ${error}`);
  }

  return response.data;
};

export const updateStatus = async (id, status) => {
  let response;
  try {
    response = await axios.put(`${DEFAULT_ROUTE}/${id}/${status}`);
  } catch (error) {
    throw new Error(`Error occurred while updating expense status: ${error}`);
  }

  return response.data;
};

export const deleteExpense = async (id) => {
  let response;
  try {
    response = await axios.delete(`${DEFAULT_ROUTE}/${id}`);
  } catch (error) {
    throw new Error(`Error occurred while getting expense: ${error}`);
  }

  return response.data;
};
