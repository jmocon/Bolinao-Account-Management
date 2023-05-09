import express from 'express';

import getDbPool from '../db/getDbPool';

import getVoucherDetails from '../db/voucher/getVoucherDetails';
import addVoucher from '../db/voucher/addVoucher';

const router = express.Router();
const dbPool = getDbPool();

router.get('/:id', async (req, res) => {
  await getVoucherDetails(dbPool, res, req);
});
router.post('/', async (req, res) => {
  await addVoucher(dbPool, res, req);
});

export default router;
