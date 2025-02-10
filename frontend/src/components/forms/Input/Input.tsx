import { Form, InputGroup } from "react-bootstrap";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface InputProps<TFieldValues extends FieldValues> {
  type?: string;
  label: string;
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
  error: string;
}

const Input = <TFieldValues extends FieldValues>({
  type = "text",
  label,
  register,
  name,
  error,
}: InputProps<TFieldValues>) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <InputGroup hasValidation>
        <Form.Control
          size="lg"
          type={type}
          placeholder={label}
          {...register(name)}
          isInvalid={error ? true : false}
        />
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
};

export default Input;
