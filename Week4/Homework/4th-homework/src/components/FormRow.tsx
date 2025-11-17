import React, { useState } from 'react';
import { Input } from '../components/index';
import { Eye, EyeOff } from 'lucide-react';

// [TODO] interface로 바꿔?
type FormRowProps = {
  id: string;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

// [TODO] gap 토큰화
// [TODO] 아래처럼 하면 type이 자동으로 뽑혀나오는 건지 아님 Omit 그런 거 해야하는건지..
const FormRow = ({
  id,
  label,
  type,
  ...rest
}: FormRowProps) => {
  const [showPw, setShowPw] = useState<boolean>(false);
  // [TODO] inputType의 타입 지정 or 상수화해서 타입 정의
  const [inputType, setInputType] = useState<string | undefined>(type);

  const handleClickEye = () => {
    setShowPw((prev) => !prev);
    setInputType(!showPw ? 'text' : 'password');
  };

  return (
    <div className="flex flex-col items-start gap-1">
      <label htmlFor={id} className="label">{label}</label>
      <div className="relative w-full">
        <Input id={id} type={inputType} {...rest} />
        { type === "password" && (
            showPw
              ? <EyeOff size={20} className="absolute top-1/4 right-4" onClick={handleClickEye} />
              : <Eye size={20} className="absolute top-1/4 right-4" onClick={handleClickEye} />
        )}
      </div>
    </div>
  );
};

export default FormRow;