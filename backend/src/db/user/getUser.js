import dbQueryError from '../../error/dbQueryError';
import dbQuery from '../../helper/dbQuery';

const getUser = async (dbPool, res, req) => {
  if (!req?.params?.id) {
    res.send(
      JSON.stringify({ success: false, message: 'User id is not present' })
    );
    return;
  }

  const query = `
  SELECT u.*
  FROM users u
  WHERE u.id = ${req.params.id}`;

  let result;
  try {
    result = await dbQuery(dbPool, query);
  } catch (error) {
    dbQueryError(res, error, query);
    return;
  }

  res.send(JSON.stringify({ success: true, user: result[0] ?? [] }));
};

export default getUser;
