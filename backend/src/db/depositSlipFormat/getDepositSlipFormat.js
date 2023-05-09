import dbQueryError from '../../error/dbQueryError';
import dbQuery from '../../helper/dbQuery';

const getDepositSlipFormat = async (dbPool, res, req) => {
  if (!req?.params?.id) {
    res.send(
      JSON.stringify({ success: false, message: 'Deposit Slip Format id is not present' })
    );
    return;
  }

  const queryFormat = `
    SELECT
      b.id as bankId,
      b.name as bankName,
      d.name as name
    FROM deposit_slip_format d
    INNER JOIN bank b
      ON d.bank_id = b.id
    WHERE d.id = ${req.params.id}`;

  let formatResult;
  try {
    formatResult = await dbQuery(dbPool, queryFormat);
  } catch (error) {
    dbQueryError(res, error, queryFormat);
  }

  const queryLayout = `
  SELECT
    d.type,
    d.x,
    d.y,
    d.font_size as fontSize,
    d.letter_spacing as letterSpacing,
    d.width,
    d.margin
  FROM deposit_slip_layout d
  WHERE d.deposit_slip_format_id = ${req.params.id}`;

  let layoutResult;
  try {
    layoutResult = await dbQuery(dbPool, queryLayout);
  } catch (error) {
    dbQueryError(res, error, queryFormat);
  }

  const data = {
    format: formatResult,
    layout: layoutResult
  };

  res.send(JSON.stringify({ success: true, data }));
};

export default getDepositSlipFormat;
