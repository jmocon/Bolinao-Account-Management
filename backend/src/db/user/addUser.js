import passGenerator from 'generate-password';

import dbQueryError from '../../error/dbQueryError';
import dbQuery from '../../helper/dbQuery';
import { encrypt } from '../../helper/encryptor';
import { numberInput, stringInput } from '../../helper/emptyToNull';

const addUser = async (dbPool, res, req) => {
  const data = req.body;
  const resetPassword = passGenerator.generate({
    length: 10,
    numbers: true
  });
  const password = encrypt(resetPassword);

  const query = `
  INSERT INTO users (
    role_id,
    first_name,
    middle_name,
    last_name,
    suffix_name,
    birth_date,
    gender,
    contact_number,
    home_address,
    email_address,
    username,
    reset_password
  ) VALUES (
    ${numberInput(data.roleId)},
    ${stringInput(data.firstName)},
    ${stringInput(data.middleName)},
    ${stringInput(data.lastName)},
    ${stringInput(data.suffixName)},
    ${stringInput(data.birthDate)},
    ${numberInput(data.gender)},
    ${stringInput(data.contactNumber)},
    ${stringInput(data.homeAddress)},
    ${stringInput(data.emailAddress)},
    ${stringInput(data.username)},
    ${stringInput(password)}
  )`;

  let result;
  try {
    result = await dbQuery(dbPool, query);
  } catch (error) {
    dbQueryError(res, error, query);
    return;
  }

  res.send(
    JSON.stringify({
      success: true,
      userResult: result,
      temporaryPassword: resetPassword
    })
  );
};

export default addUser;
