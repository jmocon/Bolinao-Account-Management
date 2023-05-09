import dbQuery from '../../helper/dbQuery';

const updateStatusQuery = async (dbPool, id, status) => {
  let query = `
    UPDATE disbursements
    SET status = ${status}
    WHERE id = ${id}`;

  let result;
  try {
    result = await dbQuery(dbPool, query);
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

export default updateStatusQuery;
