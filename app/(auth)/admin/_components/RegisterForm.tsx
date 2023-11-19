"use client";

import { CreateNewUserSchema } from "@/app/Validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Flex, Text, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

import z from "zod";
import ErrorMessage from "@/app/components/shared/ErrorMessage";
import Image from "next/image";

type UserForm = z.infer<typeof CreateNewUserSchema>;

const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: zodResolver(CreateNewUserSchema),
  });

  const OnSubmit = handleSubmit(async (data) => {
    const { password } = data

    if(confirmPassword !== password){
        return setError('Password Confirmation is not matching')
    } else {
        setError('')
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post('/api/user', data)
      if(response.status === 201){
        setSuccess(true)
        reset()
        router.push('/admin/login')
        setIsSubmitting(false)
      }
    } catch (error) {
      setError("Something wrong, try again !");
      setIsSubmitting(false);
    }
  });

  return (
    <form onSubmit={OnSubmit}>
      <Flex>
        <Flex>
          <Image
            src="/assets/bags.jpg"
            alt="bags"
            width={400}
            height={0}
            className="lg:flex hidden"
          />
        </Flex>
        <Flex
          direction={"column"}
          gap={"5"}
          className="bg-white border md:w-[500px] sm:w-[400px] w-full"
          p="6"
        >
          <Flex direction={"column"} gap="1">
            <h1 className="text-black font-bold text-xl">Register</h1>
            <p className="text-gray-500">Get your own Account !</p>
          </Flex>
          <Flex direction={"column"} gap="4">
            <Flex direction={"column"} gap="1">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <TextField.Root size="3">
                <TextField.Input
                  id="name"
                  type="text"
                  placeholder="Your name..."
                  {...register("name")}
                />
              </TextField.Root>
              <ErrorMessage>
                  {errors.name?.message}
              </ErrorMessage>
            </Flex>
            <Flex direction={"column"} gap="1">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <TextField.Root size="3">
                <TextField.Input
                  id="email"
                  placeholder="Example@email.com"
                  {...register("email")}
                />
              </TextField.Root>
              <ErrorMessage>
                  {errors.email?.message}
              </ErrorMessage>
            </Flex>
            <Flex direction={"column"} gap="1">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <TextField.Root size="3">
                <TextField.Input
                  id="password"
                  type="password"
                  placeholder="Password..."
                  {...register("password")}
                />
              </TextField.Root>
              <ErrorMessage>
                  {errors.password?.message}
              </ErrorMessage>
            </Flex>
            <Flex direction={"column"} gap="1">
              <label htmlFor="re-password" className="text-sm font-medium">
                Confirm Password
              </label>
              <TextField.Root size="3">
                <TextField.Input
                  type="password"
                  id="re-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </TextField.Root>
            </Flex>
            <Flex>
              <button
                disabled={isSubmitting}
                type="submit"
                className="btn text-white bg-black"
              >
                Register{" "}
                {isSubmitting && (
                  <span className="loading loading-spinner loading-xs"></span>
                )}
              </button>
            </Flex>
            {
              success && (
                <Text color="green">
                  Your account has been created ! 
                </Text>
              )
            }
          </Flex>
        </Flex>
      </Flex>
    </form>
  );
};

export default RegisterForm;
