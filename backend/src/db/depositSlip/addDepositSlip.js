import dbQueryError from '../../error/dbQueryError';
import dbQuery from '../../helper/dbQuery';

const addDepositSlip = async (dbPool, res, req) => {
  const data = req.body;
  const dsQuery = `INSERT INTO deposit_slips (date_created) VALUES (current_timestamp())`;

  let dsResult;
  try {
    dsResult = await dbQuery(dbPool, dsQuery);
  } catch (error) {
    dbQueryError(res, error, dsQuery);
  }

  for await (const id of data) {
    const dscQuery = `
    INSERT INTO deposit_slip_content(
      deposit_slips_id,
      deposit_id
    ) VALUES (
      ${dsResult.insertId},
      ${id}
    )`;

    let dscResult;
    try {
      dscResult = await dbQuery(dbPool, dscQuery);
    } catch (error) {
      dbQueryError(res, error, dscQuery);
      return;
    }
  }

  res.send(JSON.stringify({ success: true, data: dsResult }));
};

export default addDepositSlip;
