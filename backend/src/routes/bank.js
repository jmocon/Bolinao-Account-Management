import express from 'express';

import getDbPool from '../db/getDbPool';

import getBank from '../db/bank/getBank';
import getBanks from '../db/bank/getBanks';
import addBank from '../db/bank/addBank';
import updateBank from '../db/bank/updateBank';
import deleteBank from '../db/bank/deleteBank';

const router = express.Router();
const dbPool = getDbPool();

router.get('/:id', async (req, res) => {
  await getBank(dbPool, res, req);
});
router.get('/', async (req, res) => {
  await getBanks(dbPool, res, req);
});
router.post('/', async (req, res) => {
  await addBank(dbPool, res, req);
});
router.put('/:id', async (req, res) => {
  await updateBank(dbPool, res, req);
});
router.delete('/:id', async (req, res) => {
  await deleteBank(dbPool, res, req);
});

export default router;
