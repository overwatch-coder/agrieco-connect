import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { axiosInstance, cn } from "@/lib/utils";
import { MarketplaceProductsSchema } from "@/schema/marketplace.schema";
import { MarketplaceProducts } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Upload, X } from "lucide-react";
import { useForm, UseFormRegister } from "react-hook-form";
import { toast } from "react-toastify";
import { FileDrop } from "@instructure/ui-file-drop";
import ClipLoader from "react-spinners/ClipLoader";
import { Button } from "@/components/ui/button";

const MarketPlaceAddItem = () => {
  const [attachements, setAttachements] =
    useState<ArrayLike<File | DataTransferItem>>();
  const {
    register,
    handleSubmit,
    reset,
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
    await mutateAsync({ ...data, attachments: attachements });
  };

  return (
    <Dialog>
      <DialogTrigger className="hover:bg-transparent border-primary-brown text-primary-brown text-center bg-transparent border rounded-none px-5 py-2">
        {"Sell Item"}
      </DialogTrigger>

      <DialogContent className="w-full max-w-2xl flex flex-col gap-5 h-screen overflow-y-scroll scrollbar-hide">
        {/* Header */}
        <div className="flex items-start justify-between">
          <DialogTitle className="flex flex-col gap-3">
            <span className="text-primary-brown text-2xl md:text-3xl font-bold">
              Sell an Item
            </span>
            <span className="text-sm text-secondary-gray font-normal">
              Add and item you will like to sell
            </span>
          </DialogTitle>

          <DialogClose className="h-6 w-6 flex items-center justify-center rounded-full border-red-500 border">
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
            <div className="flex items-center justify-center text-center p-4 bg-red-200 rounded-md">
              <p className="text-xs text-red-500">{error.message}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
            <InputForm
              labelName="Item Name"
              inputName="name"
              placeholder="Please enter your item name"
              hasError={errors.name !== undefined}
              errorMessage={errors.name?.message}
              register={register}
            />

            <InputForm
              labelName="Price"
              inputName="price"
              placeholder="Please enter your price"
              hasError={errors.price !== undefined}
              errorMessage={errors.price?.message}
              register={register}
            />

            <InputForm
              labelName="Location"
              inputName="location"
              placeholder="Please enter your location"
              hasError={errors.location !== undefined}
              errorMessage={errors.location?.message}
              register={register}
            />
          </div>

          <div className="flex flex-col gap-5 w-full">
            <InputForm
              labelName="Description"
              inputName="description"
              placeholder="Please enter a description for your item"
              hasError={errors.description !== undefined}
              errorMessage={errors.description?.message}
              register={register}
            />

            <InputForm
              labelName="Seller Info"
              inputName="seller"
              placeholder="Enter your seller info"
              hasError={errors.seller !== undefined}
              errorMessage={errors.seller?.message}
              register={register}
            />

            <label
              htmlFor="attachment"
              className="text-primary-green font-medium text-base"
            >
              Add Attachment
            </label>
            <div className="flex flex-col gap-4 p-5 w-full rounded-md border border-secondary-gray bg-secondary-gray/50">
              <FileDrop
                id="attachements"
                name="attachements"
                onDropAccepted={(file) => {
                  setAttachements(file);
                }}
                shouldEnablePreview={true}
                shouldAllowMultiple={true}
                renderLabel={() => (
                  <div className="flex flex-col gap-5 p-5 items-center justify-center">
                    <Upload size={40} className="text-white" />
                    <p className="text-sm flex flex-col text-center items-center gap-1 font-medium w-full">
                      <span className="text-black">Drag and Drop here</span>
                      <span className="text-secondary-gray/50">or</span>
                      <span className="text-red-500 p-2 text-center rounded bg-white w-full">
                        Browse Files
                      </span>
                    </p>
                  </div>
                )}
              />

              {attachements && attachements.length > 0 && (
                <div className="flex items-center gap-3 flex-wrap overflow-x-scroll scrollbar-hide">
                  {Array.from(attachements).map((image, idx: number) => (
                    <ImagePreview
                      image={URL.createObjectURL(image as File)}
                      key={idx}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex items-center w-full justify-end">
              <div className="flex items-center gap-4">
                <DialogClose
                  onClick={() => {
                    setAttachements(undefined);
                    reset();
                  }}
                  disabled={isPending}
                  className="bg-transparent hover:bg-transparent text-secondary-gray px-7 py-2 rounded-none border border-secondary-gray"
                  type="reset"
                >
                  Cancel
                </DialogClose>

                <Button
                  disabled={isPending}
                  className="bg-primary-green hover:bg-primary-green px-7 py-2 text-white rounded-none"
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

type InputFormProps = {
  labelName: string;
  inputName: keyof MarketplaceProducts;
  inputType?: string;
  placeholder?: string;
  hasError?: boolean;
  errorMessage?: string;
  isTextArea?: boolean;
  register: UseFormRegister<MarketplaceProducts>;
  defaultValue?: string;
  containerClassName?: string;
};
const InputForm = ({
  labelName,
  inputName,
  inputType,
  placeholder,
  hasError,
  errorMessage,
  isTextArea,
  register,
  defaultValue,
  containerClassName,
}: InputFormProps) => {
  return (
    <div className={cn("flex flex-col gap-2", containerClassName)}>
      <label htmlFor={inputName} className="text-sm font-medium text-black">
        {labelName}
      </label>

      {isTextArea ? (
        <textarea
          {...register(inputName)}
          id={inputName}
          className="bg-primary-lightBlue placeholder:text-secondary-gray text-primary-gray/70 focus:outline-none ring-0 w-full p-3 text-sm border-none rounded outline-none"
          placeholder={placeholder}
          rows={10}
          defaultValue={defaultValue || ""}
        />
      ) : (
        <input
          type={inputType || "text"}
          id={inputName}
          {...register(inputName)}
          className="bg-primary-lightBlue placeholder:text-secondary-gray text-primary-gray/70 focus:outline-none ring-0 w-full p-3 text-sm border-none rounded outline-none"
          placeholder={placeholder || labelName}
          defaultValue={defaultValue || ""}
        />
      )}
      {hasError && (
        <p className="text-start py-1 text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

type ImagePreviewProps = {
  image: string;
};

const ImagePreview = ({ image }: ImagePreviewProps) => {
  return (
    <img
      src={image}
      alt="Preview"
      loading="lazy"
      width={60}
      height={60}
      className="rounded object-contain w-16 h-16"
    />
  );
};
