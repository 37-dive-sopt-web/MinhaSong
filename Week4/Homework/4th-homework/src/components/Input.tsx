import React from 'react';
import { cn } from '../utils/cn';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({
  type="text",
  className,
  placeholder,
  ...props
}: InputProps) => {
  return (
    <input
      type={type}
      className={cn('w-full p-2.5 border rounded-lg border-gray-300 focus:border-primary-500', className)}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default Input;