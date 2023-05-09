import express from 'express';

import getDbPool from '../db/getDbPool';

import getCheckTable from '../db/check/getCheckTable';
import getCheckFormat from '../db/check/getCheckFormat';
import addCheck from '../db/check/addCheck';
import updateCheck from '../db/check/updateCheck';
import deleteCheck from '../db/check/deleteCheck';
import getCheckFormatDisbursementId from '../db/check/getCheckFormatDisbursementId';

const router = express.Router();
const dbPool = getDbPool();

router.get('/table', async (req, res) => {
  await getCheckTable(dbPool, res, req);
});
router.get('/:id', async (req, res) => {
  await getCheckFormat(dbPool, res, req);
});
router.get('/disbursement/:id', async (req, res) => {
  await getCheckFormatDisbursementId(dbPool, res, req);
});
router.post('/', async (req, res) => {
  await addCheck(dbPool, res, req);
});
router.put('/:id', async (req, res) => {
  await updateCheck(dbPool, res, req);
});
router.delete('/:id', async (req, res) => {
  await deleteCheck(dbPool, res, req);
});

export default router;
