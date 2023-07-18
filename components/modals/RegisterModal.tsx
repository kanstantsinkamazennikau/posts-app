"use client";

import Button from "@/components/Button";
import Input from "@/components/inputs/BasicInput";
import Modal from "@/components/modals/Modal";
import useLoginModal from "@/store/useLoginModal";
import useRegisterModal from "@/store/useRegisterModal";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useState } from "react";
import {
  FieldValues,
  RegisterOptions,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

interface RegisterModalForm {
  email: string;
  password: string;
  name: string;
}

export const registerModalFormFields = [
  { name: "name", label: "Name" },
  { name: "email", label: "Email" },
  { name: "password", label: "Password" },
];

export default function RegisterModal() {
  const [isLoading, setIsLoading] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const inputsRules: { [key in keyof RegisterModalForm]?: RegisterOptions } = {
    email: {
      required: "Email is required",
    },
    password: {
      required: "Password is required",
    },
    name: {
      required: "Name is required",
    },
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      await axios.post("/api/register", data);
      registerModal.setClose();
      loginModal.setOpen();
      toast.success("Registered");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error);
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    } finally {
      setIsLoading(false);
    }
  };

  const secondaryAction = () => {
    registerModal.setClose();
    loginModal.setOpen();
  };

  const modalBody = (
    <div className="flex flex-col gap-3">
      {registerModalFormFields.map(({ name, label }) => (
        <Input
          rule={inputsRules[name as keyof RegisterModalForm]}
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
        label="Sign up with Google account"
      />
    </div>
  );

  return (
    <Modal
      body={modalBody}
      onClose={registerModal.setClose}
      isOpen={registerModal.isOpen}
      onSubmit={handleSubmit(onSubmit)}
      title="Register"
      actionLabel="Register"
      disabled={isLoading}
      footer={modalFooter}
      secondaryAction={secondaryAction}
      secondaryActionLabel="Already have an account?"
    />
  );
}
