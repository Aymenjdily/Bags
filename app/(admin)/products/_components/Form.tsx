"use client";

import { Flex, TextArea, TextField, Text, Select } from "@radix-ui/themes";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import z from "zod";
import ErrorMessage from "@/app/components/shared/ErrorMessage";
import { CreateProductSchema } from "@/app/Validations";
import { BagsCategories } from "@/constants";
import { product } from "@prisma/client";

type ProductForm = z.infer<typeof CreateProductSchema>;

interface CloudinaryResult {
  secure_url: string;
}

type Props = {
  product?: product;
};

const ProductForm = ({ product }: Props) => {
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(CreateProductSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);

      if (product) {
        const response = await axios.patch(`/api/product/${product.id}`, {
          ...data,
          image: imageUrl || product.photo,
          category: category || product.category
        })
        if(response.status === 201){
          reset()
          setSuccess(true)
          router.push('/products')
          router.refresh()
        }
      } else {
        const response = await axios.post("/api/product", {
          ...data,
          image: imageUrl,
          category: category,
        });
        if (response.status === 201) {
          reset();
          setSuccess(true);
          router.push("/products");
          router.refresh();
        }
      }
    } catch (error) {
      setIsSubmitting(false);
      setError("Something Wrong, Try again !");
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Flex
        direction={"column"}
        gap="5"
        p="5"
        pb="9"
        className="bg-gray-50 max-w-xl rounded-2xl border"
      >
        <h1 className="font-bold text-xl text-redColor">
          {product ? "Update" : "Create"} Product
        </h1>
        <Flex direction={"column"} gap="2" className="">
          <Image
            src={imageUrl || product?.photo || "/assets/upload.png"}
            alt="upload"
            width={600}
            height={0}
            quality={100}
          />
          <CldUploadWidget
            uploadPreset="recruiters"
            onUpload={(Result, widget) => {
              if (Result.event !== "success") return;
              const url = Result.info as CloudinaryResult;
              setImageUrl(url.secure_url);
            }}
          >
            {({ open }) => (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  open();
                }}
                className="btn capitalize bg-lightBlue text-white"
              >
                Upload Image
              </button>
            )}
          </CldUploadWidget>
        </Flex>
        <Flex direction={"column"} gap="3" className="">
          <Flex direction={"column"} gap="2">
            <label htmlFor="name" className="text-sm font-medium">
              Product Name
            </label>
            <TextField.Root size="3">
              <TextField.Input
                defaultValue={product?.name}
                id="name"
                {...register("name")}
              />
            </TextField.Root>
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
          </Flex>
          <Flex direction={"column"} gap="2">
            <label htmlFor="subTitle" className="text-sm font-medium">
              SubTitle
            </label>
            <TextField.Root size="3">
              <TextField.Input
                defaultValue={product?.subTitle}
                id="subTitle"
                {...register("subTitle")}
              />
            </TextField.Root>
            <ErrorMessage>{errors.subTitle?.message}</ErrorMessage>
          </Flex>
          <Flex direction={"column"} gap="2">
            <label htmlFor="desc" className="text-sm font-medium">
              Description
            </label>
            <TextArea
              defaultValue={product?.description}
              id="desc"
              className="h-44"
              {...register("description")}
            />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
          </Flex>
          <Flex direction={"column"} gap="2">
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
            <Select.Root
              defaultValue={product?.category}
              size="3"
              onValueChange={(value) => setCategory(value)}
            >
              <Select.Trigger placeholder="Category" />
              <Select.Content position="popper" color="gray">
                <Select.Group>
                  {BagsCategories.map((item) => (
                    <Select.Item key={item.value} value={item.value}>
                      {item.label}
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </Flex>
          <Flex direction={"column"} gap="2">
            <label htmlFor="price" className="text-sm font-medium">
              Price
            </label>
            <TextField.Root size="3" className="px-2">
              <TextField.Input
                defaultValue={product?.price}
                type="number"
                id="price"
                {...register("price", { valueAsNumber: true })}
              />
              <TextField.Slot>MAD</TextField.Slot>
            </TextField.Root>
            <ErrorMessage>{errors.price?.message}</ErrorMessage>
          </Flex>
        </Flex>
        <Flex>
          <button
            disabled={isSubmitting}
            type="submit"
            className="btn bg-greenColor btn-ghost border-none"
          >
            {product ? "Update" : "Create"}{" "}
            {isSubmitting && (
              <span className="loading loading-spinner loading-xs"></span>
            )}
          </button>
        </Flex>
        {success && (
          <Text color="green">
            {product ? "Product Updated" : "Product Created"} successfull !
          </Text>
        )}
        {error && <Text color="red">{error}</Text>}
      </Flex>
    </form>
  );
};

export default ProductForm;
