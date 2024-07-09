import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { axiosInstance, IsAuth } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/shared/CustomFormField";
import { Subcommunity } from "@/types";
import { SubcommunitySchema } from "@/schema/subcommunity.schema";
import LoginModal from "@/components/shared/LoginModal";

const CreateSubcommunity = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Subcommunity>({
    resolver: zodResolver(SubcommunitySchema),
    mode: "all",
  });

  const { mutateAsync, isPending, error, isError } = useMutation({
    mutationFn: async (data: Subcommunity) => {
      const res = await axiosInstance.post("/users", data);

      return res.data;
    },
    onSuccess: () => {
      toast.success("Appointment added successfully");
      reset();
    },
  });

  const handleSubmitForm = async (data: Subcommunity) => {
    console.log(data);
    await mutateAsync({ ...data });
  };

  return (
    <Dialog>
      {IsAuth() ? (
        <DialogTrigger className="hover:bg-transparent border-primary-brown text-primary-brown px-5 py-2 text-center bg-transparent border rounded-none">
          {"Create Subcommunity"}
        </DialogTrigger>
      ) : (
        <LoginModal
          className="hover:bg-transparent border-primary-brown text-primary-brown px-5 py-2 text-center bg-transparent border rounded-none"
          hasChildren={true}
        >
          {"Create Subcommunity"}
        </LoginModal>
      )}

      <DialogContent className="scrollbar-hide flex flex-col w-full max-w-2xl gap-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <DialogTitle className="flex flex-col gap-3">
            <span className="text-primary-brown md:text-3xl text-2xl font-bold">
              Add a Subcommunity
            </span>
            <span className="text-secondary-gray text-sm font-normal">
              Create a community to connect with fellow enthusiasts and experts
              in various agricultural fields.
            </span>
          </DialogTitle>

          <DialogClose
            onClick={() => reset()}
            className="flex items-center justify-center w-6 h-6 border border-red-500 rounded-full"
          >
            <X size={20} className="text-red-500" />
          </DialogClose>
        </div>

        {/* Form Component */}
        <form
          method="post"
          onSubmit={handleSubmit(handleSubmitForm)}
          className="flex flex-col gap-5"
        >
          {isError && (
            <div className="flex items-center justify-center p-4 text-center bg-red-200 rounded-md">
              <p className="text-xs text-red-500">{error.message}</p>
            </div>
          )}

          <div className="md:grid-cols-3 grid w-full grid-cols-1 gap-5">
            <CustomFormField
              labelName="Community Name"
              inputName="communityName"
              placeholderText="Enter community name"
              errors={errors}
              register={register}
              inputType="text"
            />

            <CustomFormField
              labelName="Category"
              inputName="category"
              placeholderText="Enter category"
              errors={errors}
              register={register}
              inputType="text"
            />

            <CustomFormField
              labelName="Location"
              inputName="location"
              placeholderText="Enter location"
              errors={errors}
              register={register}
              inputType="text"
            />
          </div>

          <div className="flex flex-col w-full gap-5">
            <CustomFormField
              labelName="Description"
              inputName="description"
              placeholderText="Enter description"
              errors={errors}
              register={register}
              inputType="textarea"
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
                    "Create Community"
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

export default CreateSubcommunity;
