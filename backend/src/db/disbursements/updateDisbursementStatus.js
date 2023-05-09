import disbursementStatus from '../../constants/disbursementStatus.mjs';

const updateDisbursementStatus = async (dbPool, res, req) => {
  const { id, status } = req.params;
  let query = `
    UPDATE disbursements
    SET status = ${status}
  `;

  switch (Number(status)) {
    case disbursementStatus.approved:
      query += `, approved_by = ${id} `;
      break;
    case disbursementStatus.cleared:
      const data = req.body;
      query += `, cleared_date = "${data.clearedDate}" `;
      break;

    default:
      break;
  }

  query += `WHERE id = ${id}`;

  dbPool.query(query, (err, result) => {
    if (err) {
      throw err;
    }

    res.send(JSON.stringify({ success: true, data: result }));
  });
};

export default updateDisbursementStatus;
