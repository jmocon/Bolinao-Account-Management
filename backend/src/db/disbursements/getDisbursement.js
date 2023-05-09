const getDisbursement = async (dbPool, res, req) => {
  const query = `
    SELECT * FROM disbursements
    WHERE id = ${req.params.id}
  `;

  dbPool.query(query, (err, result) => {
    if (err) {
      throw err;
    }

    res.send(JSON.stringify(result));
  });
};

export default getDisbursement;
