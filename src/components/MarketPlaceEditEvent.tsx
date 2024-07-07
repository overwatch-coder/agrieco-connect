import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { axiosInstance } from "@/lib/utils";
import { MarketplaceEventsSchema } from "@/schema/marketplace.schema";
import { MarketplaceEvents } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/shared/CustomFormField";
import CustomFileUpload from "@/components/shared/CustomFileUpload";
import { MarketPlaceEventType } from "@/pages/shared/MyEvents";

type MarketPlaceEditEventProps = {
  item: MarketPlaceEventType;
  openEditModal: boolean;
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const MarketPlaceEditEvent = ({
  item,
  openEditModal,
  setOpenEditModal,
}: MarketPlaceEditEventProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Partial<MarketplaceEvents>>({
    resolver: zodResolver(MarketplaceEventsSchema.partial()),
    defaultValues: {
      title: item.title,
      startTime: new Date().toLocaleTimeString().split(" ")[0],
      endTime: new Date().toLocaleTimeString().split(" ")[0],
      date: new Date().toISOString().split("T")[0],
      description: item.title,
    },
    mode: "all",
  });

  const { mutateAsync, isPending, error, isError } = useMutation({
    mutationFn: async (data: Partial<MarketplaceEvents>) => {
      const res = await axiosInstance.post("/users", data);

      return res.data;
    },
    onSuccess: () => {
      toast.success("Item updated successfully");
      reset();
    },
  });

  const handleSubmitForm = async (data: Partial<MarketplaceEvents>) => {
    console.log(data);
    await mutateAsync({ ...data });
  };

  return (
    <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
      <DialogContent className="scrollbar-hide flex flex-col w-full h-screen max-w-2xl gap-5 overflow-y-scroll">
        {/* Header */}
        <div className="flex items-start justify-between">
          <DialogTitle className="flex flex-col gap-3">
            <span className="text-primary-brown md:text-3xl text-2xl font-bold">
              Edit Event
            </span>
            <span className="text-secondary-gray text-sm font-normal">
              Make an edit of the event you created
            </span>
          </DialogTitle>

          <DialogClose
            onClick={() => {
              reset();
            }}
            className="flex items-center justify-center w-6 h-6 border border-red-500 rounded-full"
          >
            <X size={20} className="text-red-500" />
          </DialogClose>
        </div>

        {/* form */}
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
              labelName="Event Title"
              inputName="title"
              placeholderText="Enter event title"
              errors={errors}
              register={register}
              inputType="text"
            />

            <CustomFormField
              labelName="Venue"
              inputName="venue"
              placeholderText="Enter venue"
              errors={errors}
              register={register}
              inputType="text"
            />

            <CustomFormField
              labelName="Price"
              inputName="price"
              placeholderText="Enter price"
              errors={errors}
              register={register}
              inputType="text"
            />
          </div>

          <div className="md:grid-cols-3 grid w-full grid-cols-1 gap-5">
            <CustomFormField
              labelName="Start Time"
              inputName="startTime"
              placeholderText="Enter start Time"
              errors={errors}
              register={register}
              inputType="time"
            />

            <CustomFormField
              labelName="End Time"
              inputName="endTime"
              placeholderText="Enter end Time"
              errors={errors}
              register={register}
              inputType="time"
            />

            <CustomFormField
              labelName="Date"
              inputName="date"
              placeholderText="Enter date"
              errors={errors}
              register={register}
              inputType="date"
            />
          </div>

          <div className="flex flex-col w-full gap-5">
            <CustomFormField
              labelName="Description"
              inputName="description"
              placeholderText="Enter event description"
              errors={errors}
              register={register}
              inputType="textarea"
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
                  className="bg-primary-green hover:bg-primary-green px-7 w-full py-2 text-white rounded-none"
                >
                  {isPending ? (
                    <ClipLoader size={28} loading={isPending} color="white" />
                  ) : (
                    "Update"
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

export default MarketPlaceEditEvent;
