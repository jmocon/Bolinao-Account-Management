import dbQueryError from '../../error/dbQueryError';
import dbQuery from '../../helper/dbQuery';

const updateDepositSlipFormat = async (dbPool, res, req) => {
  if (!req?.params?.id) {
    res.send(
      JSON.stringify({ success: false, message: 'Bank id is not present' })
    );
    return;
  }

  const data = req.body;

  const queryFormat = `
  UPDATE deposit_slip_format
  SET
    bank_id = ${data.bankId},
    name = "${data.name}"
  WHERE id = ${req.params.id}
  `;

  let formatResult;
  try {
    formatResult = await dbQuery(dbPool, queryFormat);
  } catch (error) {
    dbQueryError(res, error, queryFormat);
  }

  const layoutPromise = Object.entries(data.position).map(
    ([type, checkFormat]) => {
      const queryLayout = `
    UPDATE deposit_slip_layout
    SET
      x = ${checkFormat.x},
      y = ${checkFormat.y},
      margin = ${checkFormat.margin},
      letter_spacing = ${checkFormat.letterSpacing},
      font_size = ${checkFormat.fontSize},
      width = ${checkFormat.width}
    WHERE deposit_slip_format_id = "${req.params.id}" 
    AND type = "${type}"
    `;

      return dbQuery(dbPool, queryLayout);
    }
  );

  let layoutResult;
  try {
    layoutResult = await Promise.all(layoutPromise);
  } catch (error) {
    dbQueryError(res, error, queryCheckFormat);
  }

  res.send(
    JSON.stringify({
      success: true,
      formatResult,
      layoutResult
    })
  );
};

export default updateDepositSlipFormat;
