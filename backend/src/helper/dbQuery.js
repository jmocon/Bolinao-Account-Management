const dbQuery = (dbPool, query) =>
  new Promise((resolve, reject) => {
    dbPool.query(query, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });

export default dbQuery;
