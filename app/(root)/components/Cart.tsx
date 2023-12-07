"use client";

import { AlertDialog, Flex } from "@radix-ui/themes";
import { useCart } from "@/context/CartContext";
import { MdDelete, MdOutlineShoppingCart } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";

const Cart = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, cartCount, getTotalPrice, clearCart } = useCart();
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <button>
          <Flex
            className="bg-gray-50 relative rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            p="3"
          >
            <MdOutlineShoppingCart className="text-xl" />
            <div className="absolute top-[-10px] right-[-10px]">
              <div className="text-white rounded-full items-center justify-center flex p-3 font-semibold text-sm bg-redColor w-3 h-3">
                {cartItems.length}
              </div>
            </div>
          </Flex>
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>
            Cart Items
        </AlertDialog.Title>
        {
            cartItems.map((item) => (
                <Flex align={"center"} mb="3" px="5" gap="5" py="5" key={item.id} className="bg-gray-50 rounded-2xl" justify={"between"} wrap={"wrap"}>
                    <Flex align={"center"} gap="3">
                        <Image
                            src={item.photo}
                            alt={item.name}
                            width={70}
                            height={70}
                            quality={100}
                            className="rounded-full"
                        />
                        <Flex direction={"column"}>
                            <h1 className="text-xl font-semibold">
                                {item.name}
                            </h1>
                            <p className="text-redColor font-medium">{item.price} MAD</p>
                        </Flex>
                    </Flex>
                    <Flex align={"center"} gap="5">
                        <Flex align={"center"} gap="2">
                            <button className="btn btn-neutral text-white btn-sm text-xl" onClick={() => decreaseQuantity(item.id)}>
                                -
                            </button>
                            <span className="mx-2 font-bold text-xl">
                                {item.quantity}
                            </span>
                            <button className="btn btn-neutral text-white btn-sm text-xl" onClick={() => increaseQuantity(item.id)}>
                                +
                            </button>
                        </Flex>
                        <button type="button" className="btn btn-error text-white rounded-full text-2xl" onClick={() => removeFromCart(item.id)}>
                            <MdDelete />
                        </button>
                    </Flex>
                </Flex>
            ))
        }
        <Flex align={"end"} justify={"end"}>
            <button className="btn btn-error text-white" onClick={() => clearCart()}>
                Clear Cart
            </button>
        </Flex>
        <Flex justify={"between"} align={"center"} mt="5" className="bg-gray-100 rounded-2xl" p="4">
            <Flex direction={"column"}>
                <h1 className="font-bold text-xl">
                    Total
                </h1>
                <p className="text-gray-500 font-semibold">
                    {cartCount} Item
                </p>
            </Flex>
            <p className="font-bold text-redColor text-xl">
                {getTotalPrice()} MAD
            </p>
        </Flex>
        <Flex align={"center"} justify={"end"} gap="3" mt="5">
            <AlertDialog.Cancel>
                <button className="btn btn-ghost bg-gray-100">
                    Cancel
                </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
                <Link href="/Checkout" className="btn btn-ghost bg-greenColor text-black">
                    Checkout
                </Link>
            </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default Cart;
