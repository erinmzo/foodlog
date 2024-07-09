import React from "react";

interface InputFieldProps {
  name: string;
  required?: boolean;
  value: string;
  password?: boolean;
  onChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function InputField({
  name,
  required,
  value,
  onChangeValue,
  password,
}: InputFieldProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="w-[127px]">
        <label className=" text-[16px] font-bold" htmlFor="">
          {name}
        </label>
        {required && <span className="text-[#FF0000]">*</span>}
      </div>
      {password ? (
        <input
          className="w-[184px] py-[13px] px-[14px] border-[1px] border-[#D2D2D2] rounded-[10px]"
          type="password"
          value={value}
          onChange={(e) => onChangeValue(e)}
        />
      ) : (
        <input
          className="w-[184px] py-[13px] px-[14px] border-[1px] border-[#D2D2D2] rounded-[10px]"
          type="text"
          value={value}
          onChange={(e) => onChangeValue(e)}
        />
      )}
    </div>
  );
}

export default InputField;
