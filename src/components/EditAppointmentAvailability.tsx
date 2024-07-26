import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { axiosInstance } from "@/lib/utils";
import { AppointmentsAvailability } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/shared/CustomFormField";
import { AppointmentsAvailabilitySchema } from "@/schema/appointments.schema";

type EditAppointmentAvailabilityProps = {
  item: AppointmentsAvailability;
  openEditModal: boolean;
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditAppointmentAvailability = ({
  item,
  openEditModal,
  setOpenEditModal,
}: EditAppointmentAvailabilityProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<AppointmentsAvailability>>({
    resolver: zodResolver(AppointmentsAvailabilitySchema.partial()),
    defaultValues: item,
    mode: "all",
  });

  const { mutateAsync, isPending, error, isError } = useMutation({
    mutationFn: async (data: Partial<AppointmentsAvailability>) => {
      const res = await axiosInstance.post("/users", data);

      return res.data;
    },
    onSuccess: () => {
      toast.success("Appointment updated successfully");
      reset();
    },
  });

  const handleSubmitForm = async (data: Partial<AppointmentsAvailability>) => {
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
              Update Availability
            </span>
            <span className="text-secondary-gray text-sm font-normal">
              Update your appointment availability details
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
              labelName="Company Name"
              inputName="company_name"
              placeholderText="Enter company Name"
              errors={errors}
              register={register}
              inputType="text"
            />

            <CustomFormField
              labelName="Specialty"
              inputName="specialty"
              placeholderText="Enter specialty"
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

          <div className="md:grid-cols-2 grid w-full grid-cols-1 gap-5">
            <CustomFormField
              labelName="Experience Level"
              inputName="experience_level"
              placeholderText="eg. 4.5"
              errors={errors}
              register={register}
              inputType="text"
            />

            <CustomFormField
              labelName="Contact Information"
              inputName="contact_information"
              placeholderText="Enter contact Information"
              errors={errors}
              register={register}
              inputType="text"
            />
          </div>

          <div className="md:grid-cols-2 grid w-full grid-cols-1 gap-5">
            <CustomFormField
              labelName="Availability Start Slot (with date and time)"
              inputName="availabilitySlotStart"
              placeholderText="Enter availability slot"
              errors={errors}
              register={register}
              inputType="datetime-local"
            />

            <CustomFormField
              labelName="Availability End Slot (with date and time)"
              inputName="availabilitySlotEnd"
              placeholderText="Enter availability slot"
              errors={errors}
              register={register}
              inputType="datetime-local"
            />
          </div>

          <div className="flex flex-col w-full gap-5">
            <CustomFormField
              labelName="Bio"
              inputName="bio"
              placeholderText="Enter bio"
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

export default EditAppointmentAvailability;
