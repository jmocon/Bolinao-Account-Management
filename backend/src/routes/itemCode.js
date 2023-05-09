import express from 'express';

import getDbPool from '../db/getDbPool';

import getItemCode from '../db/itemCode/getItemCode';
import getItemCodes from '../db/itemCode/getItemCodes';
import addItemCode from '../db/itemCode/addItemCode';
import updateItemCode from '../db/itemCode/updateItemCode';
import deleteItemCode from '../db/itemCode/deleteItemCode';

const router = express.Router();
const dbPool = getDbPool();

router.get('/:id', async (req, res) => {
  await getItemCode(dbPool, res, req);
});
router.get('/', async (req, res) => {
  await getItemCodes(dbPool, res, req);
});
router.post('/', async (req, res) => {
  await addItemCode(dbPool, res, req);
});
router.put('/:id', async (req, res) => {
  await updateItemCode(dbPool, res, req);
});
router.delete('/:id', async (req, res) => {
  await deleteItemCode(dbPool, res, req);
});

export default router;
