import React, { useEffect, useState } from 'react';
import { Alert } from 'reactstrap';

export const onAlertDismiss = () => ({
  color: 'success',
  message: '',
  isOpen: false
});

const AlertMessage = (message = '', isOpen = false, color = 'success') => {
  const [alertDetail, setAlertDetail] = useState({
    color,
    message,
    isOpen
  });

  useEffect(() => {
    setAlertDetail({ color, message, isOpen });
  }, [color, message, isOpen]);

  return (
    <Alert
      color={alertDetail.color}
      isOpen={alertDetail.visible}
      toggle={() => setAlertDetail(onAlertDismiss())}>
      {alertDetail.message}
    </Alert>
  );
};

export default AlertMessage;
