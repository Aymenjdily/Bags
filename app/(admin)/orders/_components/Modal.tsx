"use client";

import { AlertDialog, Flex, Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaPencil } from "react-icons/fa6";
import axios from "axios";

const statuses = [
  { label: "pending", value: "PENDING" },
  { label: "delivered", value: "DELIVERED" },
  { label: "canceled", value: "CANCELED" },
];

const OrderModal = ({ id }: { id: string }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, setState] = useState("")
  const updatedOrder = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.patch(`/api/order/${id}`,{
        state: state
      });
      if (response.status === 201) {
        router.push("/orders");
        router.refresh();
        setIsSubmitting(false)
      }
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <button className="btn btn-info btn-sm text-white">
          <Flex align={"center"} gap="2">
            <FaPencil />
            <span className="text-sm">Edit</span>
          </Flex>
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <Flex justify={"between"} align={"center"}>
          <Select.Root onValueChange={(value) => setState(value)} size={"3"}>
            <Select.Trigger className="w-64" placeholder="Status" />
            <Select.Content position="popper" color="gray">
              <Select.Group>
                {statuses.map((item) => (
                  <Select.Item key={item.value} value={item.value}>
                    {item.label}
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
          <Flex gap="3">
            <AlertDialog.Action>
              <button onClick={updatedOrder} className="btn bg-greenColor hover:bg-greenColor text-black hover:text-black border-none">
                Update {isSubmitting && (
                  <span className="loading loading-spinner loading-xs"></span>
                )}
              </button>
            </AlertDialog.Action>
            <AlertDialog.Cancel>
              <button className="btn btn-ghost">Cancel</button>
            </AlertDialog.Cancel>
          </Flex>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default OrderModal;
