import dbQueryError from '../../error/dbQueryError';
import dbQuery from '../../helper/dbQuery';
import { numberInput, stringInput } from '../../helper/emptyToNull';

const addEWT = async (dbPool, res, req) => {
  const data = req.body;
  const query = `
  INSERT INTO ewt
  (
    tax_type,
    description,
    tax_rate,
    atc
    ) VALUES (
    ${stringInput(data.taxType)},
    ${stringInput(data.description)},
    ${numberInput(data.taxRate)},
    ${stringInput(data.atc)}
  )`;

  let result;
  try {
    result = await dbQuery(dbPool, query);
  } catch (error) {
    dbQueryError(res, error, query);
    return;
  }

  res.send(JSON.stringify({ success: true, result }));
};

export default addEWT;
