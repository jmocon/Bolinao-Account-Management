import dbQuery from '../../helper/dbQuery';
import useResponse from '../../helper/useResponse';

const deleteDeposit = async (dbPool, res, req) => {
  const response = useResponse(res);

  if (!req?.params?.id) {
    response.error('Deposit id is not present');
    return;
  }

  const query = `DELETE FROM deposit WHERE id = ${req.params.id}`;

  let result;
  try {
    result = await dbQuery(dbPool, query);
  } catch (error) {
    response.dbError(error, query);
    return;
  }

  response.success(result, 'Successfully deleted deposit.');
};

export default deleteDeposit;
