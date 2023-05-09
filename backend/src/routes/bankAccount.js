import express from 'express';

import getDbPool from '../db/getDbPool';

import getBankAccount from '../db/bankAccount/getBankAccount';
import getBankAccountTable from '../db/bankAccount/getBankAccountTable';
import getBankAccounts from '../db/bankAccount/getBankAccounts';
import addBankAccount from '../db/bankAccount/addBankAccount';
import updateBankAccount from '../db/bankAccount/updateBankAccount';
import deleteBankAccount from '../db/bankAccount/deleteBankAccount';

const router = express.Router();
const dbPool = getDbPool();

router.get('/table', async (req, res) => {
  await getBankAccountTable(dbPool, res, req);
});
router.get('/:id', async (req, res) => {
  await getBankAccount(dbPool, res, req);
});
router.get('/', async (req, res) => {
  await getBankAccounts(dbPool, res, req);
});
router.post('/', async (req, res) => {
  await addBankAccount(dbPool, res, req);
});
router.put('/:id', async (req, res) => {
  await updateBankAccount(dbPool, res, req);
});
router.delete('/:id', async (req, res) => {
  await deleteBankAccount(dbPool, res, req);
});

export default router;
