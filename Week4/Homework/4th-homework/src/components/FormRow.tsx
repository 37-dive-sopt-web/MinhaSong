import React, { useState } from 'react';
import { Input } from '../components/index';
import { Eye, EyeOff } from 'lucide-react';

interface FormRowProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FormRow = ({
  label,
  id,
  type,
  ...props
}: FormRowProps) => {
  const [showPw, setShowPw] = useState<boolean>(false);
  const effectiveType = type === 'password' ? ( showPw ? 'text' : 'password' ) : type;

  return (
    <div className="flex flex-col items-start gap-1">
      <label htmlFor={id} className="label">{label}</label>
      <div className="relative w-full">
        <Input id={id} type={effectiveType} {...props} />
        { type === "password" && (
            showPw
              ? <EyeOff size={20} className="absolute top-1/4 right-4" onClick={() => { setShowPw((prev) => !prev); }} />
              : <Eye size={20} className="absolute top-1/4 right-4" onClick={() => { setShowPw((prev) => !prev); }} />
        )}
      </div>
    </div>
  );
};

export default FormRow;