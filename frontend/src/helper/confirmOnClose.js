const confirmOnClose = (isDirty) => {
  if (isDirty) {
    return window.confirm(
      'There have been changes made. Are you sure you want to close the window?'
    );
  }
  return true;
};

export default confirmOnClose;
