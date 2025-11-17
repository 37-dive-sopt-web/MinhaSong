import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

// [TODO] padding, border, rounded-lg, 컬러 등 토큰화..
const Input = ({
  type="text",
  placeholder,
  ...props
}: InputProps) => {
  return (
    <input
      className="w-full p-2.5 border rounded-lg border-gray-300 focus:border-primary-500"
      type={type}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default Input;