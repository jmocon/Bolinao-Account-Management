import defaultAlert from 'constants/defaultAlert';
import { useCallback } from 'react';

const useAlert = (setAlert) => {
  const dismiss = () => setAlert(defaultAlert);
  const success = useCallback(
    (message) => setAlert({ color: 'success', message, visible: true }),
    [setAlert]
  );
  const danger = useCallback(
    (message) => setAlert({ color: 'danger', message, visible: true }),
    [setAlert]
  );

  return {
    dismiss,
    success,
    danger
  };
};

export default useAlert;
