const deleteSupplier = (dbPool, res, req) => {
  const query = `DELETE FROM supplier WHERE id = ${req.params.id}`;

  dbPool.query(query, (err, result) => {
    if (err) {
      const message = err?.sqlMessage || err;
      console.error({ message, query });
      res.send(JSON.stringify({ success: false, message }));
    }

    res.send(JSON.stringify({ success: true, data: result }));
  });
};

export default deleteSupplier;