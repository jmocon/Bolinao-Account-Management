import moment from 'moment';

const useLogger = () => {
  const date = moment().format();

  const info = (msg) => {
    console.log(`${date} INFO: ${msg}`);
  };
  const success = (msg) => {
    console.log(`${date} SUCCESS: ${msg}`);
  };
  const error = (msg) => {
    console.log(`${date} ERROR: ${msg}`);
  };

  return { info, success, error };
};

export default useLogger;
