import defaultAlert from 'constants/defaultAlert';

const useAlert = (setAlert) => {
  const dismiss = () => setAlert(defaultAlert);
  const danger = (message) =>
    setAlert({ color: 'danger', message, visible: true });

  return {
    dismiss,
    danger
  };
};

export default useAlert;
