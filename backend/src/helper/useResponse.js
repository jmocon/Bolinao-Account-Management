import useLogger from './useLogger';

const useResponse = (res) => {
  const logger = useLogger();

  const success = (data = {}, message = 'Successfully processed.') => {
    logger.success(message);
    res.send(JSON.stringify({ success: true, data, message }));
  };

  const error = (message = 'Encountered an error.') => {
    logger.error(message);
    res.send(JSON.stringify({ success: false, message }));
  };

  const dbError = (error, query) => {
    const message = error?.sqlMessage || error;
    logger.error(message);
    logger.error(query);
    res.send(JSON.stringify({ success: false, message }));
  };

  return { success, error, dbError };
};

export default useResponse;
