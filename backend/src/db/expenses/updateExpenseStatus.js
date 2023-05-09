import expenseStatus from '../../constants/expenseStatus';

const updateExpenseStatus = async (dbPool, res, req) => {
  const { id, status } = req.params;
  let query = `
    UPDATE expenses
    SET status = ${status}
  `;

  switch (Number(status)) {
    case expenseStatus.approved:
      query += `, approved_by = ${id} `;
      break;
    case expenseStatus.cleared:
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

export default updateExpenseStatus;
