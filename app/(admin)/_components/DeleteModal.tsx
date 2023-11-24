"use client"

import { Dialog, Flex } from "@radix-ui/themes";
import React from "react";
import { MdOutlineClose } from "react-icons/md";

const DeleteModal = () => {
  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <button className="btn btn-sm btn-error text-white">
            <MdOutlineClose />
          </button>
        </Dialog.Trigger>
        <Dialog.Content>
            <Dialog.Title>Are you sure ?</Dialog.Title>
            <Dialog.Description>
                Lorem ipsum dolor sit amet.
            </Dialog.Description>
            <Flex gap="3" align={"center"} mt="5">
                <button className="btn btn-error text-white">
                    Delete
                </button>
                <Dialog.Close>
                    <button className="btn btn-ghost">
                        Cancel
                    </button>
                </Dialog.Close>
            </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default DeleteModal;
