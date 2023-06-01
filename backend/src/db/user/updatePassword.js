import passGenerator from 'generate-password';

import dbQueryError from '../../error/dbQueryError';
import dbQuery from '../../helper/dbQuery';
import { encrypt, decrypt } from '../../helper/encryptor';
import { stringInput } from '../../helper/emptyToNull';

const updatePassword = async (dbPool, res, req) => {
  const data = req.body;
  if (!req?.params?.id) {
    res.send(
      JSON.stringify({ success: false, message: 'User id is not present' })
    );
    return;
  }

  const userId = req?.params?.id;

  const queryPassword = `SELECT password FROM users WHERE id = ${userId}`;

  let resultPassword;
  try {
    resultPassword = await dbQuery(dbPool, queryPassword);
  } catch (error) {
    dbQueryError(res, error, queryPassword);
    return;
  }

  const oldPassword = resultPassword[0].password;
  if (oldPassword !== encrypt(data.oldPassword)) {
    res.send(
      JSON.stringify({ success: false, message: 'Old Password incorrect.' })
    );

    return
  }

  const password = encrypt(data.newPassword);

  const query = `
  UPDATE users
  SET password=${stringInput(password)},
  reset_password=NULL
  WHERE id = ${userId}
  `;

  let result;
  try {
    result = await dbQuery(dbPool, query);
  } catch (error) {
    dbQueryError(res, error, query);
    return;
  }

  res.send(JSON.stringify({ success: true, result }));
};

export default updatePassword;
