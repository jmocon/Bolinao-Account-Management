import dbQueryError from '../../error/dbQueryError';
import dbQuery from '../../helper/dbQuery';
import { numberInput, stringInput } from '../../helper/emptyToNull';

const updateEWT = async (dbPool, res, req) => {
  if (!req?.params?.id) {
    res.send(
      JSON.stringify({ success: false, message: 'EWT id is not present' })
    );
    return;
  }

  const data = req.body;
  const query = `
  UPDATE ewt
  SET
    tax_type = ${stringInput(data.taxType)},
    description = ${stringInput(data.description)},
    tax_rate = ${numberInput(data.taxRate)},
    atc = ${stringInput(data.atc)}
  WHERE id = "${req.params.id}"
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

export default updateEWT;
