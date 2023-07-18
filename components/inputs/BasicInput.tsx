import Tag from "@/components/Tag";
import { useState } from "react";
import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
  label: string;
  name: string;
  rule: RegisterOptions | undefined;
  resize?: boolean;
  errors: FieldErrors;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
}

export default function Input<T extends FieldValues>({
  label,
  name,
  rule,
  resize,
  register,
  errors,
  disabled,
}: InputProps<T>) {
  return (
    <div className="w-full mb-2">
      <label
        htmlFor="title"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      {resize ? (
        <textarea
          {...register(name, rule)}
          name={name}
          className={`form_input ${resize ? "resize-y" : ""}`}
          placeholder={label}
        />
      ) : (
        <>
          <input
            {...register(name, rule)}
            name={name}
            type="text"
            className="form_input"
            placeholder={label}
            disabled={disabled}
          />
        </>
      )}
      {errors?.[name] && (
        <p className="text-xs text-red-500 mt-1">
          {errors[name]!.message!.toString()}
        </p>
      )}
    </div>
  );
}
