import express from 'express';

import getDbPool from '../db/getDbPool';

import getDisbursement from '../db/disbursements/getDisbursement';
import getDisbursements from '../db/disbursements/getDisbursements';
import getDisbursementTable from '../db/disbursements/getDisbursementTable';
import getDisbursementDetails from '../db/disbursements/getDisbursementDetails';
import getBIR2307 from '../db/disbursements/getBir2307';
import addDisbursement from '../db/disbursements/addDisbursement';
import updateDisbursement from '../db/disbursements/updateDisbursement';
import updateDisbursementStatus from '../db/disbursements/updateDisbursementStatus';
import deleteDisbursement from '../db/disbursements/deleteDisbursement';
import getDESummary from '../db/disbursements/getDESummary';
import getIESummary from '../db/disbursements/getIESummary';
import getEWTSummary from '../db/disbursements/getEWTSummary';
import getBankReconciliation from '../db/disbursements/getBankReconciliation';
import getDisbursementBalance from '../db/disbursements/getDisbursementBalance';

const router = express.Router();
const dbPool = getDbPool();

router.get('/balance/:bankAccountId/:startDate/:endDate', async (req, res) => {
  await getDisbursementBalance(dbPool, res, req);
});
router.get(
  '/bankReconciliation/:bankAccountId/:startDate/:endDate',
  async (req, res) => {
    await getBankReconciliation(dbPool, res, req);
  }
);
router.get('/deSummary', async (req, res) => {
  await getDESummary(dbPool, res, req);
});
router.get('/ieSummary', async (req, res) => {
  await getIESummary(dbPool, res, req);
});
router.get('/ewtSummary', async (req, res) => {
  await getEWTSummary(dbPool, res, req);
});
router.get('/table', async (req, res) => {
  await getDisbursementTable(dbPool, res, req);
});
router.get('/details/:id', async (req, res) => {
  await getDisbursementDetails(dbPool, res, req);
});
router.get('/bir2307/:id', async (req, res) => {
  await getBIR2307(dbPool, res, req);
});
router.get('/:id', async (req, res) => {
  await getDisbursement(dbPool, res, req);
});
router.get('/', async (req, res) => {
  await getDisbursements(dbPool, res, req);
});
router.post('/', async (req, res) => {
  await addDisbursement(dbPool, res, req);
});
router.put('/:id', async (req, res) => {
  await updateDisbursement(dbPool, res, req);
});
router.put('/:id/:status', async (req, res) => {
  await updateDisbursementStatus(dbPool, res, req);
});
router.delete('/:id', async (req, res) => {
  await deleteDisbursement(dbPool, res, req);
});

export default router;
