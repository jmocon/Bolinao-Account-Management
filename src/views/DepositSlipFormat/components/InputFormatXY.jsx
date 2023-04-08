import { Input, InputGroup, InputGroupText } from 'reactstrap';

const InputFormatXY = ({ value, name, type = 'number', onChange }) => {
  return (
    <InputGroup>
      <InputGroupText>X</InputGroupText>
      <Input
        type={type}
        value={value?.x || ''}
        placeholder='Left'
        onChange={(e) => onChange(name, 'x', e.target.value)}
      />
      <InputGroupText>Y</InputGroupText>
      <Input
        type={type}
        value={value?.y || ''}
        placeholder='Top'
        onChange={(e) => onChange(name, 'y', e.target.value)}
      />
    </InputGroup>
  );
};

export default InputFormatXY;
