const dbQueryError = (res, err, query = undefined) => {
  const message = err?.sqlMessage || err;
  console.error({ message, query });
  res.send(
    JSON.stringify({
      success: false,
      message: 'Internal error occurred. CODE: DB001',
      error: message
    })
  );
};

export default dbQueryError;
