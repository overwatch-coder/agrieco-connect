import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Edit, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/shared/CustomFormField";
import { AppointmentsAvailabilitySchema } from "@/schema/appointments.schema";
import { AppointmentsAvailability } from "@/types";
import { useMutateData } from "@/hooks/useFetch";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import CustomError from "@/components/shared/CustomError";

type AddAppointmentProps = {
  refetchAppointments?: () => void;
  appointment: IAppointment;
};

const EditAppointment = ({
  refetchAppointments,
  appointment,
}: AddAppointmentProps) => {
  const [auth] = useAuth();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentsAvailability>({
    resolver: zodResolver(AppointmentsAvailabilitySchema),
    defaultValues: {
      company_name: appointment.company_name,
      specialty: appointment.specialty,
      location: appointment.location,
      experience_level: appointment.experience_level,
      availabilitySlotStart: new Date(
        appointment.availability_slot_start.replace(" ", "T")
      )
        .toISOString()
        .replace("Z", ""),
      availabilitySlotEnd: new Date(
        appointment.availability_slot_end.replace(" ", "T")
      )
        .toISOString()
        .replace("Z", ""),
      contact_information: appointment.contact_information ?? "",
      bio: appointment.bio,
    },
    mode: "all",
  });

  const { mutateAsync, isPending, error, isError } = useMutateData<FormData>({
    url: "/appointments/" + appointment.id,
    config: {
      method: "PUT",
      token: auth?.user?.token,
      contentType: "application/x-www-form-urlencoded",
      queryKey: "appointments",
    },
  });

  const handleSubmitForm = async (values: AppointmentsAvailability) => {
    const data = {
      ...values,
      availabilitySlotStart: new Date(
        values.availabilitySlotStart
      ).toISOString(),
      availabilitySlotEnd: new Date(values.availabilitySlotEnd).toISOString(),
    };

    const formData = new FormData();
    formData.append("company_name", data.company_name);
    formData.append("specialty", data.specialty);
    formData.append("location", data.location);
    formData.append("experience_level", data.experience_level);
    formData.append("contact_information", data.contact_information);
    formData.append("availabilitySlotStart", data.availabilitySlotStart);
    formData.append("availabilitySlotEnd", data.availabilitySlotEnd);
    formData.append("bio", data.bio);

    await mutateAsync(formData);
    queryClient.invalidateQueries({
      queryKey: ["appointments"],
    });
    if (refetchAppointments) {
      refetchAppointments();
    }
    toast.success("Appointment updated successfully");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => setOpen(true)}>
        <Edit size={20} className="text-primary-green" />
      </DialogTrigger>

      <DialogContent className="scrollbar-hide flex flex-col w-full h-screen max-w-2xl gap-5 overflow-y-scroll">
        {/* Header */}
        <div className="flex items-start justify-between">
          <DialogTitle className="flex flex-col gap-3">
            <span className="text-primary-brown md:text-3xl text-2xl font-bold">
              Edit Appointment{" "}
              {appointment.id > 10 ? appointment.id : "0" + appointment.id}
            </span>
          </DialogTitle>

          <DialogClose
            onClick={() => {
              reset();
              setOpen(false);
            }}
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
          <CustomError error={error} isError={isError} />

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

export default EditAppointment;
