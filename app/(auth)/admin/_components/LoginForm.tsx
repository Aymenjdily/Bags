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

const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: zodResolver(CreateNewUserSchema),
  });

  const OnSubmit = handleSubmit( async (data) => {
    try {
      setIsSubmitting(true)
      const response = await axios.post("/api/user/login", data)
      const token = response.data
      if(response.status === 201){
        reset()
        setSuccess(true)
        localStorage.setItem("bags", token)
        router.push('/dashboard')
      }
    } catch (error) {
      setIsSubmitting(false)
      setError('Login failed, try again')
    }
  })

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
            <h1 className="text-black font-bold text-xl">Login</h1>
            <p className="text-gray-500">Log in using your Account !</p>
          </Flex>
          <Flex direction={"column"} gap="4">
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
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
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
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            </Flex>
            <Flex>
              <button
                disabled={isSubmitting}
                type="submit"
                className="btn text-white bg-black"
              >
                Login{" "}
                {isSubmitting && (
                  <span className="loading loading-spinner loading-xs"></span>
                )}
              </button>
            </Flex>
            {success && (
              <Text color="green">Login successfull !</Text>
            )}
          </Flex>
        </Flex>
      </Flex>
    </form>
  );
};

export default LoginForm;
