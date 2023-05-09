import express from 'express';

import getDbPool from '../db/getDbPool';

import getExpense from '../db/expenses/getExpense';
import getExpenses from '../db/expenses/getExpenses';
import getExpenseTable from '../db/expenses/getExpenseTable';
import getExpenseDetails from '../db/expenses/getExpenseDetails';
import addExpense from '../db/expenses/addExpense';
import updateExpense from '../db/expenses/updateExpense';
import updateExpenseStatus from '../db/expenses/updateExpenseStatus';
import deleteExpense from '../db/expenses/deleteExpense';

const router = express.Router();
const dbPool = getDbPool();

router.get('/table', async (req, res) => {
  await getExpenseTable(dbPool, res, req);
});
router.get('/details/:id', async (req, res) => {
  await getExpenseDetails(dbPool, res, req);
});
router.get('/:id', async (req, res) => {
  await getExpense(dbPool, res, req);
});
router.get('/', async (req, res) => {
  await getExpenses(dbPool, res, req);
});
router.post('/', async (req, res) => {
  await addExpense(dbPool, res, req);
});
router.put('/:id', async (req, res) => {
  await updateExpense(dbPool, res, req);
});
router.put('/:id/:status', async (req, res) => {
  await updateExpenseStatus(dbPool, res, req);
});
router.delete('/:id', async (req, res) => {
  await deleteExpense(dbPool, res, req);
});

export default router;
