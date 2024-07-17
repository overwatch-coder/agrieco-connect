import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ClipLoader from "react-spinners/ClipLoader";

type DeleteItemModalProps<T> = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  deleteFn: (
    id?: T | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void>;
  modalTitle: string;
  modalDescription: string;
  pending?: boolean;
};

const DeleteItemModal = <T,>({
  openModal,
  setOpenModal,
  deleteFn,
  modalTitle,
  modalDescription,
  pending,
}: DeleteItemModalProps<T>) => {
  return (
    <AlertDialog open={openModal} onOpenChange={setOpenModal}>
      <AlertDialogContent
        id="hide"
        className="flex flex-col gap-4 px-5 rounded-none"
      >
        <AlertDialogHeader className="flex flex-col gap-3">
          <AlertDialogTitle className="flex items-center justify-between">
            <span className="text-primary-brown text-2xl font-bold">
              {modalTitle}
            </span>
            <AlertDialogCancel className="hover:bg-transparent hover:outline-none bg-transparent border-0 outline-none">
              <X
                className="text-red-500 border border-red-500 rounded-full"
                size={20}
              />
            </AlertDialogCancel>
          </AlertDialogTitle>

          <AlertDialogDescription className="flex flex-col gap-5">
            <p className="text-secondary-gray font-semibold">
              {modalDescription}
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form
          method="post"
          className="ms-auto md:w-1/2 flex items-center justify-end w-full gap-3"
        >
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <Button
            onClick={(e) => {
              e.preventDefault();
              deleteFn();
            }}
            className="bg-primary-green md:px-10 md:w-fit w-full py-3 text-white"
          >
            {pending ? (
              <ClipLoader size={20} loading={pending} color="white" />
            ) : (
              "Confirm"
            )}
          </Button>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteItemModal;
