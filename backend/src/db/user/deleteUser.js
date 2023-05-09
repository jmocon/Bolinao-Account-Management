import dbQueryError from '../../error/dbQueryError';
import dbQuery from '../../helper/dbQuery';

const deleteUser = async (dbPool, res, req) => {
  const query = `DELETE FROM users WHERE id = ${req.params.id}`;

  let result;
  try {
    result = await dbQuery(dbPool, query);
  } catch (error) {
    dbQueryError(res, error, query);
    return;
  }

  res.send(JSON.stringify({ success: true, result }));
};

export default deleteUser;
