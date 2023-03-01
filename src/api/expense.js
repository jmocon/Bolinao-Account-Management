import axios from './axios';

const EXPENSE_ROUTE = '/expenses';

const mapData = (expense) => ({
  expenseId: expense.id,
  accountId: expense.account_id,
  expenseDate: expense.expense_date,
  category: expense.category,
  voucherId: expense.voucher_id,
  supplierId: expense.supplier_id,
  particulars: expense.particulars,
  vatableAmount: expense.vatable_amount,
  nonVatableAmount: expense.non_vatable_amount,
  ewtId: expense.ewt_id,
  modeOfPayment: expense.mode_of_payment,
  supplierAccountId: expense.supplier_account_id,
  checkNumber: expense.check_number,
  checkDate: expense.check_date,
  checkStatus: expense.check_status,
  status: expense.status
});

export const addExpense = async (expense) => {
  let response;
  try {
    response = await axios.post(EXPENSE_ROUTE, expense);
  } catch (error) {
    console.log(`Error occurred while adding expense: ${error}`);
  }

  return response;
};

export const getExpense = async (id) => {
  let response;
  try {
    response = await axios.get(`${EXPENSE_ROUTE}/${id}`);
  } catch (error) {
    console.log(`Error occurred while getting expense: ${error}`);
  }

  const expense = mapData(response.data[0]);

  return expense;
};

export const getExpenses = async () => {
  let response;
  try {
    response = await axios.get(EXPENSE_ROUTE);
  } catch (error) {
    console.log(`Error occurred while getting expenses: ${error}`);
  }

  const expenses = response.data.map(mapData);

  return expenses;
};

export const deleteExpense = async (id) => {
  let response;
  try {
    response = await axios.delete(`${EXPENSE_ROUTE}/${id}`);
  } catch (error) {
    console.log(`Error occurred while getting expense: ${error}`);
  }

  const expense = mapData(response.data[0]);

  return expense;
};
