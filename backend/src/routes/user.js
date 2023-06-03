import express from 'express';

import getDbPool from '../db/getDbPool';

import getUser from '../db/user/getUser';
import getUsers from '../db/user/getUsers';
import addUser from '../db/user/addUser';
import updateUser from '../db/user/updateUser';
import deleteUser from '../db/user/deleteUser';
import resetPassword from '../db/user/resetPassword';
import updatePassword from '../db/user/updatePassword';
import login from '../db/user/login';

const router = express.Router();
const dbPool = getDbPool();

router.get('/:id', async (req, res) => {
  await getUser(dbPool, res, req);
});
router.get('/', async (req, res) => {
  await getUsers(dbPool, res, req);
});
router.post('/', async (req, res) => {
  await addUser(dbPool, res, req);
});
router.post('/login', async (req, res) => {
  await login(dbPool, res, req);
});
router.put('/updatePassword/:id', async (req, res) => {
  await updatePassword(dbPool, res, req);
});
router.put('/resetpassword/:id', async (req, res) => {
  await resetPassword(dbPool, res, req);
});
router.put('/:id', async (req, res) => {
  await updateUser(dbPool, res, req);
});
router.delete('/:id', async (req, res) => {
  await deleteUser(dbPool, res, req);
});

export default router;
