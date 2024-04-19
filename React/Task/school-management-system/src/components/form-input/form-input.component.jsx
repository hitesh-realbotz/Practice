import { FormInputLabel, Input, Group } from './form-input.styles';

const FormInput = ({ label, ...otherProps }) => {
  
  const isDOB = otherProps.name.toLowerCase() === 'dob';
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel shrink={otherProps.value.length} isDOB={isDOB}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
