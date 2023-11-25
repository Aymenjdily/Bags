"use client";

import { AlertDialog, Dialog, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/navigation";
import ErrorMessage from "@/app/components/shared/ErrorMessage";

type Props = {
  id: string;
  api: string;
  route: string;
};

const DeleteModal = ({ id, api, route }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const onDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await axios.delete(`${api}/${id}`);
      if (response.status === 201) {
        router.push(route);
        router.refresh();
      }
    } catch (error) {
      setIsDeleting(false);
      setError("Something is Wrong, try again !");
    }
  };

  return (
    <div>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <button className="btn btn-sm btn-error text-white">
            <Flex align={"center"} gap="2">
              <MdOutlineClose />
              <span className="text-sm">
                Delete
              </span>
            </Flex>
          </button>
        </AlertDialog.Trigger>
        <AlertDialog.Content className="flex items-center flex-col">
          <AlertDialog.Title>
            Are you sure you want delete this item ?
          </AlertDialog.Title>
          <Flex gap="3" align={"center"} my="2">
            <AlertDialog.Action>
              <button
                onClick={onDelete}
                disabled={isDeleting}
                className="btn btn-error text-white"
              >
                Delete{" "}
                {isDeleting && (
                  <span className="loading loading-spinner loading-xs"></span>
                )}
              </button>
            </AlertDialog.Action>
            <AlertDialog.Cancel>
              <button className="btn btn-ghost">Cancel</button>
            </AlertDialog.Cancel>
          </Flex>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
};

export default DeleteModal;
