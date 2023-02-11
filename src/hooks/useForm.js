import { useState, useCallback } from "react";

export default function useForm(inputlValues ) {
  const [values, setValues] = useState(inputlValues);
  const [errors, setErrors] = useState({});
  const [isValid, setValid] = useState(false);

  const onChange = (event) => {
    const { value, name, validationMessage } = event.target;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validationMessage });
    setValid(event.target.closest("form").checkValidity());
  };

  const resetForm = useCallback((newValues) => {
    setValues({...inputlValues, ...newValues});
    setErrors({});
    setValid(false);
  }, []);

  return { values, errors, isValid, onChange, resetForm };
} 