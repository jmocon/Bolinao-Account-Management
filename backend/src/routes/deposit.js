import express from 'express';

import getDbPool from '../db/getDbPool';

import getDepositTable from '../db/deposit/getDepositTable';
import getDeposit from '../db/deposit/getDeposit';
import getDeposits from '../db/deposit/getDeposits';
import addDeposit from '../db/deposit/addDeposit';
import updateDeposit from '../db/deposit/updateDeposit';
import clearDeposit from '../db/deposit/clearDeposit';
import deleteDeposit from '../db/deposit/deleteDeposit';
import getOpenDeposits from '../db/deposit/getOpenDeposits';

const router = express.Router();
const dbPool = getDbPool();

router.get('/table', async (req, res) => {
  await getDepositTable(dbPool, res, req);
});
router.get('/open', async (req, res) => {
  await getOpenDeposits(dbPool, res, req);
});
router.get('/:id', async (req, res) => {
  await getDeposit(dbPool, res, req);
});
router.get('/', async (req, res) => {
  await getDeposits(dbPool, res, req);
});
router.post('/', async (req, res) => {
  await addDeposit(dbPool, res, req);
});
router.put('/clear/:id', async (req, res) => {
  await clearDeposit(dbPool, res, req);
});
router.put('/:id', async (req, res) => {
  await updateDeposit(dbPool, res, req);
});
router.delete('/:id', async (req, res) => {
  await deleteDeposit(dbPool, res, req);
});

export default router;
