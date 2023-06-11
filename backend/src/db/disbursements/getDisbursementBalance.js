import dbQuery from '../../helper/dbQuery';
import useResponse from '../../helper/useResponse';

const getDisbursementBalance = async (dbPool, res, req) => {
  const bankAccountId = req.params?.bankAccountId;
  const startDate = req.params?.startDate;
  const endDate = req.params?.endDate;

  const response = useResponse(res);

  if (!bankAccountId) {
    response.error('Bank id is not present');
    return;
  }

  if (!startDate) {
    response.error('Start date is not present');
    return;
  }

  if (!endDate) {
    response.error('End date is not present');
    return;
  }

  const query = `
  SELECT *
  FROM disbursements
  WHERE bank_account_id = ${bankAccountId}
  AND cleared_date IS NULL
  AND status NOT IN (0,2,6,7)
  AND disbursement_date >= "${startDate}"
  AND disbursement_date <= "${endDate}"
  `;

  let result;
  try {
    result = await dbQuery(dbPool, query);
  } catch (error) {
    response.dbError(error, query);
    return;
  }

  response.success(result, 'Successfully fetched disbursement balance.');
};

export default getDisbursementBalance;
