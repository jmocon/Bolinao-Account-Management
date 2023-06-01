import passGenerator from 'generate-password';

import dbQueryError from '../../error/dbQueryError';
import dbQuery from '../../helper/dbQuery';
import { encrypt } from '../../helper/encryptor';
import {  stringInput } from '../../helper/emptyToNull';

const resetPassword = async (dbPool, res, req) => {
  if (!req?.params?.id) {
    res.send(
      JSON.stringify({ success: false, message: 'User id is not present' })
    );
    return;
  }

  const resetPassword = passGenerator.generate({
    length: 10,
    numbers: true
  });
  const password = encrypt(resetPassword);

  const query = `
  UPDATE users
  SET reset_password=${stringInput(password)}
  WHERE id = ${req.params.id}
  `;

  let result;
  try {
    result = await dbQuery(dbPool, query);
  } catch (error) {
    dbQueryError(res, error, query);
    return;
  }

  res.send(JSON.stringify({ success: true, result, password: resetPassword }));
};

export default resetPassword;
