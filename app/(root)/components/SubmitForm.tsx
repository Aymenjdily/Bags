"use client";

import { Flex, Select, TextField } from "@radix-ui/themes";
import { Cart } from ".";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import z from "zod";
import ErrorMessage from "@/app/components/shared/ErrorMessage";
import { useState } from "react";
import { CreateOrderSchema } from "@/app/Validations";
import { MoroccoCities } from "@/constants";
import { useCart } from "@/context/CartContext";

type OrderForm = z.infer<typeof CreateOrderSchema>;

const SubmitForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [city, setCity] = useState("");
  const [success, setSuccess] = useState(false);
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const productsIds = cartItems.map((product) => product.id);
  const total = getTotalPrice();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderForm>({
    resolver: zodResolver(CreateOrderSchema),
  });

  const OnSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/order", {
        ...data,
        city: city,
        total: total,
        productsId: productsIds
      });
      if(response.status === 201){
        reset()
        setSuccess(true)
        clearCart()
        router.push('/')
        router.refresh()
        setIsSubmitting(false)
      }
    } catch (error) {
        setIsSubmitting(false)
    }
  });

  return (
    <Flex className="bg-gray-50 rounded-2xl border w-full" p="6">
      <Flex direction={"column"} gap="6" py="9" className="w-full">
        {/* <Flex align={"center"} justify={"end"} gap="3">
                <h1 className='text-xl font-bold'>View the Cart</h1>
                <Cart />
            </Flex> */}
        <Flex direction={"column"} align={"center"} justify={"center"} gap="5">
          <h1 className="text-lg font-bold">Client informations</h1>
          <form onSubmit={OnSubmit}>
            <Flex
              gap="3"
              direction={"column"}
              className="bg-gray-100 rounded-2xl"
              p="6"
            >
              <Flex gap="5" direction="column">
                <Flex direction={"column"} gap="2">
                  <label htmlFor="" className="text-sm font-semibold">
                    Name
                  </label>
                  <TextField.Root className="md:w-[300px] w-full" size="3">
                    <TextField.Input
                      placeholder="John"
                      {...register("firstName")}
                    />
                  </TextField.Root>
                  <ErrorMessage>
                    {errors.firstName?.message}
                  </ErrorMessage>
                </Flex>
                <Flex direction={"column"} gap="2">
                  <label htmlFor="" className="text-sm font-semibold">
                    Famuly Name
                  </label>
                  <TextField.Root className="md:w-[300px] w-full" size="3">
                    <TextField.Input
                      placeholder="Snow"
                      {...register("secondName")}
                    />
                  </TextField.Root>
                  <ErrorMessage>
                    {errors.secondName?.message}
                  </ErrorMessage>
                </Flex>
              </Flex>
              <Flex gap="5" direction="column">
                <Flex direction={"column"} gap="2">
                  <label htmlFor="" className="text-sm font-semibold">
                    Email
                  </label>
                  <TextField.Root className="md:w-[300px] w-full" size="3">
                    <TextField.Input
                      placeholder="John@gmail.com"
                      {...register("email")}
                    />
                  </TextField.Root>
                  <ErrorMessage>
                    {errors.email?.message}
                  </ErrorMessage>
                </Flex>
                <Flex direction={"column"} gap="2">
                  <label htmlFor="" className="text-sm font-semibold">
                    Phone
                  </label>
                  <TextField.Root className="md:w-[300px] w-full" size="3">
                    <TextField.Input {...register("phone")} />
                  </TextField.Root>
                  <ErrorMessage>
                    {errors.phone?.message}
                  </ErrorMessage>
                </Flex>
              </Flex>
              <Flex gap="5" direction="column">
                <Flex direction={"column"} gap="2">
                  <label htmlFor="" className="text-sm font-semibold">
                    City
                  </label>
                  <Select.Root
                    onValueChange={(value) => setCity(value)}
                    size={"3"}
                  >
                    <Select.Trigger />
                    <Select.Content position="popper" color="gray">
                      {MoroccoCities.map((item) => (
                        <Select.Item value={item.ville} key={item.id}>
                          {item.ville}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </Flex>
                <Flex direction={"column"} gap="2">
                  <label htmlFor="" className="text-sm font-semibold">
                    Address
                  </label>
                  <TextField.Root className="md:w-[300px] w-full" size="3">
                    <TextField.Input {...register("address")} />
                  </TextField.Root>
                  <ErrorMessage>
                    {errors.address?.message}
                  </ErrorMessage>
                </Flex>
              </Flex>
              {
                success && (
                    <Flex className="text-green-500 font-bold">
                        Successfully, We appreciate your Trust !
                    </Flex>
                )
              }
            </Flex>
            <Flex my="5" align={"center"} justify={"center"}>
              <button type="submit" className="btn bg-greenColor text-black border-none outline-none btn-ghost">
                Order Now{" "}
                {isSubmitting && (
                  <span className="loading loading-spinner loading-xs"></span>
                )}
              </button>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SubmitForm;
