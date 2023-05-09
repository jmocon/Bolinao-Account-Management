import dbQueryError from '../../error/dbQueryError';
import dbQuery from '../../helper/dbQuery';

const updateCheck = async (dbPool, res, req) => {
  if (!req?.params?.id) {
    res.send(
      JSON.stringify({ success: false, message: 'Bank id is not present' })
    );
    return;
  }

  const data = req.body;

  const queryCheck = `
  UPDATE \`check\`
  SET
    bank_id = ${data.bankId},
    name = "${data.name}"
  WHERE id = ${req.params.id}
  `;

  let checkResult;
  try {
    checkResult = await dbQuery(dbPool, queryCheck);
  } catch (error) {
    dbQueryError(res, error, queryCheck);
  }

  const checkFormatPromise = Object.entries(data.position).map(([type,checkFormat]) => {
    const queryCheckFormat = `
    UPDATE check_format
    SET
      x = ${checkFormat.x},
      y = ${checkFormat.y}
    WHERE check_id = "${req.params.id}" 
    AND type = "${type}"
    `;

    return dbQuery(dbPool, queryCheckFormat);
  });

  let checkFormatResult;
  try {
    checkFormatResult = await Promise.all(checkFormatPromise);
  } catch (error) {
    dbQueryError(res, error, queryCheckFormat);
  }

  res.send(JSON.stringify({ success: true, checkResult, checkFormatResult }));
};

export default updateCheck;
