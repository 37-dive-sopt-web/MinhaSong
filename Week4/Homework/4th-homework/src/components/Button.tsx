import React, { type ReactNode } from 'react';
import { cn } from '../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = ({
  children,
  type = "button",
  className,
  disabled = false,
  ...props
}: ButtonProps) => {
  const baseStyle = 'flex-1 p-3 rounded-lg text-white font-bold transition duration-200 ease-in-out';
  const activeStyle = 'bg-primary-500 hover:bg-primary-600';
  const disabledStyle = 'bg-primary-200 cursor-not-allowed';

  return (
    <button
      type={type}
      className={cn(baseStyle, !disabled ? activeStyle : disabledStyle, className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;