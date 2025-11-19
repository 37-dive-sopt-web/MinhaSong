import { useState } from 'react';

export function useForm<T>(initialState: T) {
  const [form, setForm] = useState<T>(initialState);

  const handleChange = (key: keyof T, value: string) => {
    setForm((prev) => ({...prev, [key]: value}));
  };

  const resetForm = () => setForm(initialState);

  return { form, handleChange, resetForm, setForm };
}