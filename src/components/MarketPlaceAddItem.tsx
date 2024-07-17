import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/shared/CustomFormField";
import CustomFileUpload from "@/components/shared/CustomFileUpload";
import { useAuth } from "@/hooks/useAuth";
import LoginModal from "@/components/shared/LoginModal";
import { useMutateData } from "@/hooks/useFetch";
import CustomError from "@/components/shared/CustomError";
import { z } from "zod";
import React from "react";

type MarketPlaceAddItemProps = {
  refetch?: () => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MarketPlaceSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().trim().min(1, "Description is required"),
  price: z.coerce.number().min(1, "Price is required"),
  image: z.any({ required_error: "Image is required" }),
});

type MarketplaceProducts = z.infer<typeof MarketPlaceSchema>;

const MarketPlaceAddItem = ({
  refetch,
  open,
  setOpen,
}: MarketPlaceAddItemProps) => {
  const [auth] = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MarketplaceProducts>({
    resolver: zodResolver(MarketPlaceSchema),
    mode: "all",
  });

  const { mutateAsync, isPending, error, isError } = useMutateData<
    FormData,
    IMarketPlace
  >({
    url: "/marketplaces/items",
    config: {
      method: "POST",
      token: auth?.user.token,
      contentType: "multipart/form-data",
      queryKey: "marketplace",
      reset: () => reset({ description: "", name: "", price: 0, image: null }),
      resetValues: { description: "", name: "", price: 0, image: null },
    },
  });

  const handleSubmitForm = async (data: MarketplaceProducts) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("image", data.image[0] as File);

    const res = await mutateAsync(formData);

    console.log({ res });

    toast.success("Market product added successfully");
    reset();

    queryClient.invalidateQueries({
      queryKey: ["marketplace", `/marketplaces/items`],
    });

    if (refetch) {
      refetch();
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {auth ? (
        <DialogTrigger className="hover:bg-transparent border-primary-brown text-primary-brown px-5 py-2 text-center bg-transparent border rounded-none">
          {"Sell Item"}
        </DialogTrigger>
      ) : (
        <LoginModal
          hasChildren={true}
          className="hover:bg-transparent border-primary-brown text-primary-brown px-5 py-2 text-center bg-transparent border rounded-none"
        >
          Sell Item
        </LoginModal>
      )}

      <DialogContent className="scrollbar-hide flex flex-col w-full h-screen max-w-2xl gap-5 overflow-y-scroll">
        {/* Header */}
        <div className="flex items-start justify-between">
          <DialogTitle className="flex flex-col gap-3">
            <span className="text-primary-brown md:text-3xl text-2xl font-bold">
              Sell an Item
            </span>
            <span className="text-secondary-gray text-sm font-normal">
              Add an item you will like to sell
            </span>
          </DialogTitle>

          <DialogClose
            onClick={() => reset()}
            className="flex items-center justify-center w-6 h-6 border border-red-500 rounded-full"
          >
            <X size={20} className="text-red-500" />
          </DialogClose>
        </div>

        {/* Sell An Item Form */}
        <form
          method="post"
          onSubmit={handleSubmit(handleSubmitForm)}
          className="flex flex-col gap-5"
          encType="multipart/form-data"
        >
          <CustomError isError={isError} error={error} />

          <div className="md:grid-cols-2 grid w-full grid-cols-1 gap-5">
            <CustomFormField
              labelName="Item Name"
              inputName="name"
              placeholderText="Please enter your item name"
              errors={errors}
              register={register}
              inputType="text"
            />

            <CustomFormField
              labelName="Price (Enter only numbers)"
              inputName="price"
              placeholderText="Please enter your price"
              errors={errors}
              register={register}
              inputType="number"
            />
          </div>

          <div className="flex flex-col w-full gap-5">
            <CustomFormField
              labelName="Description"
              inputName="description"
              placeholderText="Please enter a description for your item"
              errors={errors}
              register={register}
              inputType="textarea"
            />

            <CustomFileUpload
              title="Add Attachment"
              itemName="image"
              setValue={setValue}
              watch={watch}
              allowMultiple={false}
            />

            {/* Submit Button */}
            <SubmitButton isPending={isPending} reset={reset} />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MarketPlaceAddItem;

interface SubmitButtonProps {
  isPending: boolean;
  reset: () => void;
}

const SubmitButton = ({ isPending, reset }: SubmitButtonProps) => {
  return (
    <div className="flex items-center justify-end w-full">
      <div className="flex items-center gap-4">
        <DialogClose
          onClick={() => {
            reset();
          }}
          disabled={isPending}
          className="hover:bg-transparent text-secondary-gray px-7 border-secondary-gray w-full py-2 bg-transparent border rounded-none"
          type="reset"
        >
          Cancel
        </DialogClose>

        <Button
          disabled={isPending}
          type="submit"
          className="bg-primary-green hover:bg-primary-green w-full px-10 py-2 text-white rounded-none"
        >
          {isPending ? (
            <ClipLoader size={28} loading={isPending} color="white" />
          ) : (
            "Post"
          )}
        </Button>
      </div>
    </div>
  );
};
