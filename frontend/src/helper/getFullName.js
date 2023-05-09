const getFullName = ({
  firstName = '',
  middleName = '',
  lastName = '',
  suffixName = ''
}) => {
  const newMiddleName = middleName ? `${middleName[0]}.` : `${middleName} `;

  return `${firstName} ${newMiddleName} ${lastName} ${suffixName}`;
};


export default getFullName;