import React from "react";

interface InputFieldProps {
  name: string;
  required?: boolean;
  value: string;
  type: string;
  minLength: number;
  maxLength: number;
  onChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function InputField({
  name,
  required,
  value,
  onChangeValue,
  type,
  minLength,
  maxLength,
}: InputFieldProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="w-[127px]">
        <label className=" text-[16px] font-bold" htmlFor="">
          {name}
        </label>
        {required && <span className="text-[#FF0000]">*</span>}
      </div>
      <input
        className="w-[184px] py-[12px] px-[14px] border border-[#D2D2D2] rounded-[10px]"
        type={type}
        value={value}
        minLength={minLength}
        maxLength={maxLength}
        onChange={(e) => onChangeValue(e)}
      />
    </div>
  );
}

export default InputField;
