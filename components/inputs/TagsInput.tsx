import Tag from "@/components/Tag";
import { Dispatch, SetStateAction } from "react";
import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { toast } from "react-toastify";

interface InputProps {
  label: string;
  name: string;
  rule: RegisterOptions | undefined;
  errors: FieldErrors<FieldValues>;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
  tagsArray: string[];
  setTagsArray: Dispatch<SetStateAction<string[]>>;
}

export default function TagsInput({
  label,
  name,
  rule,
  register,
  errors,
  disabled,
  setTagsArray,
  tagsArray,
}: InputProps) {
  const onKeyUp = (e: any) => {
    if (e.key === ",") {
      const tag: string = e.target.value.trim().split(",")[0];
      e.target.value = "";
      if (tag === "") {
        return;
      }

      setTagsArray((prevState) => {
        if (prevState.includes(tag)) {
          toast.warn(`Tag "${tag}" already exists`);
          return [...prevState];
        }
        return [...prevState, tag];
      });
    }
  };

  return (
    <div className="w-full mb-2">
      <label
        htmlFor="title"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        {...register(name, {
          ...rule,
        })}
        type="text"
        className="form_input"
        placeholder={label}
        disabled={disabled}
        onKeyUp={onKeyUp}
      />
      {!!tagsArray.length && (
        <div className="flex flex-row flex-wrap">
          {tagsArray.map((tag) => (
            <Tag
              value={tag}
              key={tag}
              onDelete={() => {
                setTagsArray((prevState) => [
                  ...prevState.filter((stateTag) => tag !== stateTag),
                ]);
              }}
            />
          ))}
        </div>
      )}

      {errors?.[name] && (
        <p className="text-xs text-red-500 mt-1">
          {errors[name]?.message!.toString()}
        </p>
      )}
    </div>
  );
}
