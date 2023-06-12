import dbQuery from '../../helper/dbQuery';
import useResponse from '../../helper/useResponse';

const clearDeposit = async (dbPool, res, req) => {
  const response = useResponse(res);

  if (!req?.params?.id) {
    response.error('Deposit id is not present');
    return;
  }

  const data = req.body;

  const query = `
  UPDATE deposit
  SET cleared_date = "${data.clearedDate}"
  WHERE id = "${req.params.id}"
  `;

  let result;
  try {
    result = await dbQuery(dbPool, query);
  } catch (error) {
    response.dbError(error, query);
    return;
  }

  response.success(result, 'Successfully cleared deposit.');
};

export default clearDeposit;
