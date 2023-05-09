import express from 'express';

import getDbPool from '../db/getDbPool';

import getDepositSlipFormat from '../db/depositSlipFormat/getDepositSlipFormat';
import getDepositSlipFormats from '../db/depositSlipFormat/getDepositSlipFormats';
import addDepositSlipFormat from '../db/depositSlipFormat/addDepositSlipFormat';
import deleteDepositSlip from '../db/depositSlipFormat/deleteDepositSlip';
import updateDepositSlipFormat from '../db/depositSlipFormat/updateDepositSlipFormat';

const router = express.Router();
const dbPool = getDbPool();

router.get('/:id', async (req, res) => {
  await getDepositSlipFormat(dbPool, res, req);
});
router.get('/', async (req, res) => {
  await getDepositSlipFormats(dbPool, res, req);
});
router.post('/', async (req, res) => {
  await addDepositSlipFormat(dbPool, res, req);
});
router.put('/:id', async (req, res) => {
  await updateDepositSlipFormat(dbPool, res, req);
});
router.delete('/:id', async (req, res) => {
  await deleteDepositSlip(dbPool, res, req);
});

export default router;
