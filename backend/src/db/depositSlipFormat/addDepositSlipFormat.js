import dbQueryError from '../../error/dbQueryError';
import dbQuery from '../../helper/dbQuery';
import { numberInput, stringInput } from '../../helper/emptyToNull';

const addDepositSlipFormat = async (dbPool, res, req) => {
  const data = req.body;
  const queryFormat = `
  INSERT INTO deposit_slip_format
  (
    bank_id,
    name
  ) VALUES (
    ${data.bankId},
    "${data.name}"
  )`;

  let formatResult;
  try {
    formatResult = await dbQuery(dbPool, queryFormat);
  } catch (error) {
    dbQueryError(res, error, queryFormat);
  }

  for await (const position of Object.entries(data.position)) {
    const [type, value] = position;
    const queryLayout = `
    INSERT INTO deposit_slip_layout
    (
      deposit_slip_format_id,
      type,
      x,
      y,
      margin,
      letter_spacing,
      font_size,
      width
    ) VALUES (
      ${formatResult.insertId},
      ${stringInput(type)},
      ${numberInput(value.x)},
      ${numberInput(value.y)},
      ${numberInput(value.margin)},
      ${numberInput(value.letterSpacing)},
      ${numberInput(value.fontSize)},
      ${numberInput(value.width)}
    )`;

    let layoutResult;
    try {
      layoutResult = await dbQuery(dbPool, queryLayout);
    } catch (error) {
      dbQueryError(res, error, queryLayout);
    }
  }

  res.send(JSON.stringify({ success: true, formatResult }));
};

export default addDepositSlipFormat;
