const getDisbursements = (dbPool, res, req) => {
  const query = `SELECT * FROM disbursements`;

  dbPool.query(query, (err, result) => {
    if (err) {
      throw err;
    }

    res.send(JSON.stringify(result));
  });
};

export default getDisbursements;
