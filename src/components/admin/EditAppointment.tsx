import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { axiosInstance } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Edit, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/shared/CustomFormField";
import { AppointmentsSchema } from "@/schema/appointments.schema";
import { AppointmentsType } from "@/types";

type EditAppointmentProps = {
  appointment: AppointmentsType;
};

const EditAppointment = ({ appointment }: EditAppointmentProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<AppointmentsType>>({
    resolver: zodResolver(AppointmentsSchema.partial()),
    defaultValues: {
      ...appointment,
      status: appointment.status.toLowerCase(),
      id: appointment.id,
    },
    mode: "all",
  });

  const { mutateAsync, isPending, error, isError } = useMutation({
    mutationFn: async (data: Partial<AppointmentsType>) => {
      const res = await axiosInstance.post("/users", data);

      return res.data;
    },
    onSuccess: () => {
      toast.success("Appointment updated successfully");
      reset();
    },
  });

  const handleSubmitForm = async (data: Partial<AppointmentsType>) => {
    console.log(data);
    await mutateAsync({ ...data });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Edit size={20} className="text-green-500" />
      </DialogTrigger>

      <DialogContent className="scrollbar-hide flex flex-col w-full h-screen max-w-2xl gap-5 overflow-y-scroll">
        {/* Header */}
        <div className="flex items-start justify-between">
          <DialogTitle className="flex flex-col gap-3">
            <span className="text-primary-brown md:text-3xl text-2xl font-bold">
              Edit Appointment ({appointment.id})
            </span>
          </DialogTitle>

          <DialogClose
            onClick={() => reset()}
            className="flex items-center justify-center w-6 h-6 border border-red-500 rounded-full"
          >
            <X size={20} className="text-red-500" />
          </DialogClose>
        </div>

        {/* Edit an Appointment Form */}
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
              labelName="Full Name"
              inputName="fullName"
              placeholderText="Enter full name"
              errors={errors}
              register={register}
              inputType="text"
            />

            <CustomFormField
              labelName="Speciality"
              inputName="speciality"
              placeholderText="Enter speciality"
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
              labelName="Appointment Title"
              inputName="title"
              placeholderText="Enter appointment title"
              errors={errors}
              register={register}
              inputType="text"
            />

            <CustomFormField
              labelName="Appointment Status"
              inputName="status"
              errors={errors}
              register={register}
              value="pending"
              inputType="select"
              selectOptions={[
                { label: "Pending", value: "pending" },
                { label: "Approved", value: "approved" },
                { label: "Rejected", value: "rejected" },
              ]}
            />

            <CustomFormField
              labelName="Contact Information"
              inputName="email"
              placeholderText="Enter contact information (email)"
              errors={errors}
              register={register}
              inputType="text"
            />
          </div>

          <div className="md:grid-cols-2 grid w-full grid-cols-1 gap-5">
            <CustomFormField
              labelName="Experience Level"
              inputName="experienceLevel"
              placeholderText="Enter experience level"
              errors={errors}
              register={register}
              inputType="text"
            />

            <CustomFormField
              labelName="Availability Slots (with date and time)"
              inputName="availabilitySlot"
              errors={errors}
              register={register}
              inputType="datetime-local"
            />
          </div>

          <div className="flex flex-col w-full gap-5">
            <CustomFormField
              labelName="Appointment ID"
              inputName="id"
              errors={errors}
              register={register}
              value={appointment.id}
              inputType="hidden"
            />

            <CustomFormField
              labelName="Bio"
              inputName="bio"
              placeholderText="Enter bio (max 1000 characters)"
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

export default EditAppointment;
