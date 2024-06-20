import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { toast } from "react-toastify";
import { X } from "lucide-react";

type DeleteItemModalProps = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
};

const DeleteItemModal = ({ openModal, setOpenModal }: DeleteItemModalProps) => {
  // handle delete item
  const handleDeleteItem = async () => {
    toast.success("Item has been deleted successfully");
  };

  return (
    <AlertDialog open={openModal} onOpenChange={setOpenModal}>
      <AlertDialogContent
        id="hide"
        className="flex flex-col gap-4 px-5 rounded-none"
      >
        <AlertDialogHeader className="flex flex-col gap-3">
          <AlertDialogTitle className="flex items-center justify-between">
            <span className="text-primary-brown text-2xl font-bold">
              Delete Item
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
              Are you sure you want to delete this item?
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteItem}
            className="bg-primary-green md:px-10 md:w-fit w-full py-3 text-white"
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteItemModal;
