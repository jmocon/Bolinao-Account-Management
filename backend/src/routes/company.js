import express from 'express';

import getDbPool from '../db/getDbPool';

import getCompany from '../db/company/getCompany';
import getCompanies from '../db/company/getCompanies';
import addCompany from '../db/company/addCompany';
import updateCompany from '../db/company/updateCompany';
import deleteCompany from '../db/company/deleteCompany';

const router = express.Router();
const dbPool = getDbPool();

router.get('/:id', async (req, res) => {
  await getCompany(dbPool, res, req);
});
router.get('/', async (req, res) => {
  await getCompanies(dbPool, res, req);
});
router.post('/', async (req, res) => {
  await addCompany(dbPool, res, req);
});
router.put('/:id', async (req, res) => {
  await updateCompany(dbPool, res, req);
});
router.delete('/:id', async (req, res) => {
  await deleteCompany(dbPool, res, req);
});

export default router;
