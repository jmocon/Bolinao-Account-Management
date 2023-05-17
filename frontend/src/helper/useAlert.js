import defaultAlert from 'constants/defaultAlert';
import { useCallback } from 'react';

const useAlert = (setAlert) => {
  const dismiss = () => setAlert(defaultAlert);
  const danger = useCallback(
    (message) => setAlert({ color: 'danger', message, visible: true }),
    [setAlert]
  );

  return {
    dismiss,
    danger
  };
};

export default useAlert;
