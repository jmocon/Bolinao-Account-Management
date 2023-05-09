import express from 'express';

import getDbPool from '../db/getDbPool';

import getSupplier from '../db/supplier/getSupplier';
import getSuppliers from '../db/supplier/getSuppliers';
import addSupplier from '../db/supplier/addSupplier';
import updateSupplier from '../db/supplier/updateSupplier';
import deleteSupplier from '../db/supplier/deleteSupplier';

const router = express.Router();
const dbPool = getDbPool();

router.get('/:id', async (req, res) => {
  await getSupplier(dbPool, res, req);
});
router.get('/', async (req, res) => {
  await getSuppliers(dbPool, res, req);
});
router.post('/', async (req, res) => {
  await addSupplier(dbPool, res, req);
});
router.put('/:id', async (req, res) => {
  await updateSupplier(dbPool, res, req);
});
router.delete('/:id', async (req, res) => {
  await deleteSupplier(dbPool, res, req);
});

export default router;
