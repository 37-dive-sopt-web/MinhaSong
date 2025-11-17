import React from 'react';

type ButtonProps = {
  label: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  label,
  type="button",
  disabled=false,
  ...props
}: ButtonProps) => {
  return (
    <button
      // [TODO] className 덮어씌워지는 거 (공통 스타일은 따로 빼고 싶은디 덮어씌워질까봐)
      className={!disabled
        ? "flex-1 p-3 rounded-lg bg-primary-500 text-white font-bold transition duration-200 ease-in-out hover:bg-primary-600"
        : "flex-1 p-3 rounded-lg bg-primary-200 text-white font-bold transition duration-200 ease-in-out cursor-not-allowed"}
      type={type}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;