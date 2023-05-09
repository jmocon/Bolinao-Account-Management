import express from 'express';

import getDbPool from '../db/getDbPool';

import getEWT from '../db/ewt/getEWT';
import getEWTs from '../db/ewt/getEWTs';
import addEWT from '../db/ewt/addEWT';
import updateEWT from '../db/ewt/updateEWT';
import deleteEWT from '../db/ewt/deleteEWT';

const router = express.Router();
const dbPool = getDbPool();

router.get('/:id', async (req, res) => {
  await getEWT(dbPool, res, req);
});
router.get('/', async (req, res) => {
  await getEWTs(dbPool, res, req);
});
router.post('/', async (req, res) => {
  await addEWT(dbPool, res, req);
});
router.put('/:id', async (req, res) => {
  await updateEWT(dbPool, res, req);
});
router.delete('/:id', async (req, res) => {
  await deleteEWT(dbPool, res, req);
});

export default router;
