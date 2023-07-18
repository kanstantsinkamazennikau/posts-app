"use client";

import Input from "@/components/inputs/BasicInput";
import Modal from "@/components/modals/Modal";
import useLoginModal from "@/store/useLoginModal";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useState } from "react";
import {
  FieldValues,
  RegisterOptions,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "react-toastify";
import Button from "@/components/Button";

interface LoginModalForm {
  email: string;
  password: string;
}

export const loginModalFormFields = [
  { name: "email", label: "Email" },
  { name: "password", label: "Password" },
];

export default function LoginModal() {
  const [isLoading, setIsLoading] = useState(false);
  const loginModal = useLoginModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const inputsRules: { [key in keyof LoginModalForm]?: RegisterOptions } = {
    email: {
      required: "Email is required",
    },
    password: {
      required: "Password is required",
    },
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const signInCallback = await signIn("credentials", { ...data });
    toast.success("Logged in");
    setIsLoading(false);
  };

  const modalBody = (
    <div className="flex flex-col gap-3">
      {loginModalFormFields.map(({ name, label }) => (
        <Input
          rule={inputsRules[name as keyof LoginModalForm]}
          name={name}
          label={label}
          key={name}
          register={register}
          errors={errors}
          disabled={isLoading}
        />
      ))}
    </div>
  );

  const modalFooter = (
    <div className="flex flex-col gap-3">
      <Button
        onClick={() => signIn("google")}
        icon={FcGoogle}
        label="Sign in with Google account"
      />
    </div>
  );

  return (
    <Modal
      body={modalBody}
      onClose={loginModal.setClose}
      isOpen={loginModal.isOpen}
      onSubmit={handleSubmit(onSubmit)}
      title="Register"
      actionLabel="Register"
      disabled={isLoading}
      footer={modalFooter}
    />
  );
}
