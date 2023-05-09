import dbQueryError from '../../error/dbQueryError';
import dbQuery from '../../helper/dbQuery';

const addCheck = async (dbPool, res, req) => {
  const data = req.body;
  const queryCheck = `
  INSERT INTO \`check\`
  (
    bank_id,
    name
  ) VALUES (
    ${data.bankId},
    "${data.name}"
  )`;

  let checkResult;
  try {
    checkResult = await dbQuery(dbPool, queryCheck);
  } catch (error) {
    dbQueryError(res, error, queryCheck);
  }

  for await (const position of Object.entries(data.position)) {
    const [key, value] = position;
    const queryCheckFormat = `
    INSERT INTO check_format
    (
      check_id,
      type,
      x,
      y
    ) VALUES (
      ${checkResult.insertId},
      "${key}",
      "${value.x}",
      "${value.y}"
    )`;

    let checkFormatResult;
    try {
      checkFormatResult = await dbQuery(dbPool, queryCheckFormat);
    } catch (error) {
      dbQueryError(res, error, queryCheckFormat);
    }
  }

  res.send(JSON.stringify({ success: true, checkResult }));
};

export default addCheck;
