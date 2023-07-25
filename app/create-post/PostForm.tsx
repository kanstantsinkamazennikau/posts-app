"use client";
import { createPostFormFields } from "@/app/create-post/createPostFormFields";
import Button from "@/components/Button";
import Input from "@/components/inputs/BasicInput";
import TagsInput from "@/components/inputs/TagsInput";
import axios from "axios";
import { User } from "next-auth";
import { useState } from "react";
import {
  FieldValues,
  RegisterOptions,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "react-toastify";

export interface CreatePostForm {
  title: string;
  content: string;
  tags?: string[];
}

export interface PostFormProps {
  currentUser: User;
}

export default function PostForm({ currentUser }: PostFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [tagsArray, setTagsArray] = useState<string[]>([]);

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FieldValues>({
    shouldUnregister: false,
    defaultValues: {
      title: "",
      content: "",
      tags: "",
    },
  });

  const inputsRules: { [key in keyof CreatePostForm]?: RegisterOptions } = {
    title: {
      required: "Title is required",
    },
    content: {
      required: "Content is required",
    },
    tags: {
      maxLength: { value: 50, message: "Too many characters for the one tag" },
    },
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      await axios.post("/api/user-posts", {
        ...data,
        tags: tagsArray,
        userId: currentUser.id,
      });
      setTagsArray([]);
      reset();
      toast.success("Posted");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-56px)]">
      <form className="w-9/12 mt-4 max-w-4xl">
        <h3 className="font-medium uppercase text-center">Create Your Post</h3>
        {createPostFormFields.map(({ name, label, resize, tags }) =>
          !tags ? (
            <Input
              rule={inputsRules[name as keyof CreatePostForm]}
              name={name}
              label={label}
              key={name}
              register={register}
              resize={resize}
              errors={errors}
              disabled={isLoading}
            />
          ) : (
            <TagsInput
              rule={inputsRules[name as keyof CreatePostForm]}
              name={name}
              label={label}
              key={name}
              register={register}
              errors={errors}
              disabled={isLoading}
              tagsArray={tagsArray}
              setTagsArray={setTagsArray}
            />
          ),
        )}
        <Button onClick={handleSubmit(onSubmit)} label="Publish post"></Button>
      </form>
    </div>
  );
}
