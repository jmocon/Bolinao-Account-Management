import express from 'express';

import getDbPool from '../db/getDbPool';

import getDepositSlip from '../db/depositSlip/getDepositSlip';
import getDepositSlips from '../db/depositSlip/getDepositSlips';
import addDepositSlip from '../db/depositSlip/addDepositSlip';
import updateDepositSlip from '../db/depositSlip/updateDepositSlip';
import deleteDepositSlip from '../db/depositSlip/deleteDepositSlip';
import updateDepositSlipPrintDate from '../db/depositSlip/updateDepositSlipPrintDate';

const router = express.Router();
const dbPool = getDbPool();

router.get('/:id', async (req, res) => {
  await getDepositSlip(dbPool, res, req);
});
router.get('/', async (req, res) => {
  await getDepositSlips(dbPool, res, req);
});
router.post('/', async (req, res) => {
  await addDepositSlip(dbPool, res, req);
});
router.put('/print/:id', async (req, res) => {
  await updateDepositSlipPrintDate(dbPool, res, req);
});
router.put('/:id', async (req, res) => {
  await updateDepositSlip(dbPool, res, req);
});
router.delete('/:id', async (req, res) => {
  await deleteDepositSlip(dbPool, res, req);
});

export default router;
