import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { MarketplaceEventsSchema } from "@/schema/marketplace.schema";
import { MarketplaceEvents } from "@/types";
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
import { useMutateData } from "@/hooks/useFetch";
import CustomError from "@/components/shared/CustomError";
import ImagePreview from "@/components/shared/ImagePreview";

type MarketPlaceEditEventProps = {
  item: IEvent;
  openEditModal: boolean;
  refetchEvents: () => void;
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const MarketPlaceEditEvent = ({
  item,
  openEditModal,
  setOpenEditModal,
  refetchEvents,
}: MarketPlaceEditEventProps) => {
  const [auth] = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MarketplaceEvents>({
    resolver: zodResolver(MarketplaceEventsSchema),
    defaultValues: {
      title: item.title,
      start_time: item.start_time.slice(0, 5),
      end_time: item.end_time.slice(0, 5),
      date: new Date(item.date).toISOString().split("T")[0],
      description: item.title,
      location: item.location,
    },
    mode: "all",
  });

  const { mutateAsync, isPending, error, isError } = useMutateData<
    FormData,
    IEvent
  >({
    url: `/events/${item.id}`,
    config: {
      method: "PUT",
      token: auth?.user.token,
      contentType: "multipart/form-data",
      queryKey: "events",
      reset: () =>
        reset({
          title: "",
          location: "",
          start_time: "",
          end_time: "",
          // price: 0,
          date: "",
          description: "",
          image: null,
        }),
      resetValues: {
        title: "",
        location: "",
        start_time: "",
        end_time: "",
        date: "",
        // price: 0,
        description: "",
        image: null,
      },
    },
  });

  const handleSubmitForm = async (data: MarketplaceEvents) => {
    console.log(data);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("location", data.location);
    formData.append("date", data.date);
    formData.append("start_time", data.start_time);
    formData.append("end_time", data.end_time);
    formData.append("description", data.description);
    // formData.append("price", data.price.toString());
    formData.append("image", data.image ? data.image[0] : item.image);

    const res = await mutateAsync(formData);

    console.log({ res });

    queryClient.invalidateQueries({
      queryKey: ["events", `/events/${item.id}`],
    });

    refetchEvents();

    toast.success("Event updated successfully");

    setOpenEditModal(false);
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
              Edit your existing event
            </span>
          </DialogTitle>

          <DialogClose
            onClick={() => reset()}
            className="flex items-center justify-center w-6 h-6 border border-red-500 rounded-full"
          >
            <X size={20} className="text-red-500" />
          </DialogClose>
        </div>

        {/* Edit an Event Form */}
        <form
          method="post"
          onSubmit={handleSubmit(handleSubmitForm)}
          className="flex flex-col gap-5"
          encType="multipart/form-data"
        >
          <CustomError isError={isError} error={error} />

          <div className="md:grid-cols-2 grid w-full grid-cols-1 gap-5">
            <CustomFormField
              labelName="Event Title"
              inputName="title"
              placeholderText="Enter event title"
              errors={errors}
              register={register}
              inputType="text"
            />

            <CustomFormField
              labelName="Venue/Location"
              inputName="location"
              placeholderText="Enter venue/location"
              errors={errors}
              register={register}
              inputType="text"
            />

            {/* <CustomFormField
              labelName="Price"
              inputName="price"
              placeholderText="Enter price"
              errors={errors}
              register={register}
              inputType="number"
            /> */}
          </div>

          <div className="md:grid-cols-2 grid w-full grid-cols-1 gap-5">
            <CustomFormField
              labelName="Start Time"
              inputName="start_time"
              errors={errors}
              register={register}
              inputType="time"
            />

            <CustomFormField
              labelName="End Time"
              inputName="end_time"
              errors={errors}
              register={register}
              inputType="time"
            />
          </div>

          <div className="md:grid-cols-2 grid w-full grid-cols-1 gap-5">
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
              itemName="image"
              setValue={setValue}
              watch={watch}
              allowMultiple={false}
            />

            {!watch("image") &&
              item.image &&
              item.image.includes("res.cloudinary.com") && (
                <ImagePreview image={item.image} />
              )}

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
                    "Update Event"
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
