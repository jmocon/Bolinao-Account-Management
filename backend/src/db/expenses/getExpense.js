const getExpense = async (dbPool, res, req) => {
  const query = `
    SELECT * FROM expenses
    WHERE id = ${req.params.id}
  `;

  dbPool.query(query, (err, result) => {
    if (err) {
      throw err;
    }

    res.send(JSON.stringify(result));
  });
};

export default getExpense;
