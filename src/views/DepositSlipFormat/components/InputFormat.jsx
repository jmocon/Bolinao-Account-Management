import { Input, InputGroup, InputGroupText } from 'reactstrap';

const InputFormat = ({
  label,
  value,
  name,
  type = 'number',
  format,
  onChange
}) => {
  return (
    <InputGroup>
      <InputGroupText>{label}</InputGroupText>
      <Input
        type={type}
        value={value || ''}
        placeholder={label}
        onChange={(e) => onChange(name, format, e.target.value)}
      />
    </InputGroup>
  );
};

export default InputFormat;
