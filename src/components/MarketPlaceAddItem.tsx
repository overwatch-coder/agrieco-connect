import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { axiosInstance } from "@/lib/utils";
import { MarketplaceProductsSchema } from "@/schema/marketplace.schema";
import { MarketplaceProducts } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/shared/CustomFormField";
import CustomFileUpload from "@/components/shared/CustomFileUpload";
import { useAuth } from "@/hooks/useAuth";
import LoginModal from "@/components/shared/LoginModal";

const MarketPlaceAddItem = () => {
  const [auth] = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MarketplaceProducts>({
    resolver: zodResolver(MarketplaceProductsSchema),
    mode: "all",
  });

  const { mutateAsync, isPending, error, isError } = useMutation({
    mutationFn: async (data: MarketplaceProducts) => {
      const res = await axiosInstance.post("/users", data);

      return res.data;
    },
    onSuccess: () => {
      toast.success("Item added successfully");
      reset();
    },
  });

  const handleSubmitForm = async (data: MarketplaceProducts) => {
    console.log(data);
    await mutateAsync({ ...data });
  };

  return (
    <Dialog>
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
          {isError && (
            <div className="flex items-center justify-center p-4 text-center bg-red-200 rounded-md">
              <p className="text-xs text-red-500">{error.message}</p>
            </div>
          )}

          <div className="md:grid-cols-3 grid w-full grid-cols-1 gap-5">
            <CustomFormField
              labelName="Item Name"
              inputName="name"
              placeholderText="Please enter your item name"
              errors={errors}
              register={register}
              inputType="text"
            />

            <CustomFormField
              labelName="Price"
              inputName="price"
              placeholderText="Please enter your price"
              errors={errors}
              register={register}
              inputType="text"
            />

            <CustomFormField
              labelName="Location"
              inputName="location"
              placeholderText="Please enter your location"
              errors={errors}
              register={register}
              inputType="text"
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

            <CustomFormField
              labelName="Seller Info"
              inputName="seller"
              placeholderText="Enter your seller info"
              errors={errors}
              register={register}
              inputType="text"
            />

            <CustomFileUpload
              title="Add Attachment"
              itemName="attachments"
              setValue={setValue}
              watch={watch}
              allowMultiple={true}
            />

            {/* Submit Button */}
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
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MarketPlaceAddItem;
