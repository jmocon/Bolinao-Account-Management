import dbQueryError from '../../error/dbQueryError';
import dbQuery from '../../helper/dbQuery';
import { encrypt } from '../../helper/encryptor';
import { numberInput, stringInput } from '../../helper/emptyToNull';

const updateUser = async (dbPool, res, req) => {
  if (!req?.params?.id) {
    res.send(
      JSON.stringify({ success: false, message: 'User id is not present' })
    );
    return;
  }

  const data = req.body;
  const password = encrypt(data.password);

  const query = `
  UPDATE users
  SET
    role_id=${numberInput(data.roleId)},
    first_name=${stringInput(data.firstName)},
    middle_name=${stringInput(data.middleName)},
    last_name=${stringInput(data.lastName)},
    suffix_name=${stringInput(data.suffixName)},
    birth_date=${stringInput(data.birthDate)},
    gender=${numberInput(data.gender)},
    contact_number=${stringInput(data.contactNumber)},
    home_address=${stringInput(data.homeAddress)},
    email_address=${stringInput(data.emailAddress)},
    username=${stringInput(data.username)}
  WHERE id = ${req.params.id}
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

export default updateUser;
