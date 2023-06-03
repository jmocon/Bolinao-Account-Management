import passGenerator from 'generate-password';

import dbQueryError from '../../error/dbQueryError';
import dbQuery from '../../helper/dbQuery';
import { encrypt } from '../../helper/encryptor';
import { numberInput, stringInput } from '../../helper/emptyToNull';

const login = async (dbPool, res, req) => {
  const data = req.body;
  const inputPassword = encrypt(data.password);

  const query = `
  SELECT 
    id,
    username,
    role_id,
    password,
    reset_password
  FROM users
  WHERE username = ${stringInput(data.username)}`;

  let result;
  try {
    result = await dbQuery(dbPool, query);
  } catch (error) {
    dbQueryError(res, error, query);
    return;
  }

  const { password, reset_password } = result[0];
  if (inputPassword !== password) {
    if (inputPassword !== reset_password) {
      res.send(
        JSON.stringify({
          success: false,
          message: 'Authentication failed'
        })
      );
      return;
    }
    res.send(
      JSON.stringify({
        success: true,
        result: result[0],
        temporary: true
      })
    );
    return;
  }
  res.send(
    JSON.stringify({
      success: true,
      userId: result[0].id,
      username: result[0].username,
      roleId: result[0].role_id
    })
  );
};

export default login;
