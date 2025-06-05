import React, { InputHTMLAttributes } from "react";
import { FieldError, UseFormRegister, FieldValues, Path } from "react-hook-form";

type InputFieldProps<T extends FieldValues> = {
  label: string;
  type?: string;
  register: UseFormRegister<T>;
  name: keyof T;
  defaultValue?: string;
  errors?: FieldError;
  placeholder?: string;
  required?: boolean;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
};

const InputField = <T extends FieldValues>({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  errors,
  placeholder,
  required,
  inputProps,
}: InputFieldProps<T>) => {
  return (
    <div className="flex flex-col gap-2 w-full md:w-1/3 ">
      <label className="text-xs text-p500">{label}</label>
      <input
        type={type}
        {...register(name as Path<T>)}
        {...inputProps}
        className="ring-[1.5px] ring-p300 p-2 rounded-md text-sm w-full bg-p900 text-p50"
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
      />
      {errors?.message && <p className="text-xs text-red-500">{errors.message}</p>}
    </div>
  );
};

export default InputField;
