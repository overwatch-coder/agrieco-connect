import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { AppointmentsItemType } from "@/pages/user/Appointments";
import { X } from "lucide-react";

type AppointmentExpertInformationProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  item: AppointmentsItemType;
};

const AppointmentExpertInformation = ({
  openModal,
  setOpenModal,
  item,
}: AppointmentExpertInformationProps) => {
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="w-full max-w-2xl h-[90vh] flex bg-white rounded-none flex-col gap-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <DialogTitle className="flex flex-col gap-3">
            <span className="text-primary-brown md:text-3xl text-xl font-bold">
              Expert Information
            </span>
            <span className="text-secondary-gray text-sm font-normal">
              Contact expert to schedule an appointment
            </span>
          </DialogTitle>

          <DialogClose className="flex items-center justify-center w-6 h-6 border border-red-500 rounded-full">
            <X size={20} className="text-red-500" />
          </DialogClose>
        </div>

        {/* Contact Seller */}
        <div className="flex flex-col w-full gap-4">
          <div className="place-content-start place-items-start text-secondary-gray grid grid-cols-2 gap-5 text-sm">
            <h3>Full Name:</h3>
            <p>{item.fullname}</p>
          </div>

          <div className="place-content-start place-items-start text-secondary-gray grid grid-cols-2 gap-5 text-sm">
            <h3>Location:</h3>
            <p>{item.location}</p>
          </div>

          <div className="place-content-start place-items-start text-secondary-gray grid grid-cols-2 gap-5 text-sm">
            <h3>Contact Details:</h3>
            <p>{item.contact_information || "N/A"}</p>
          </div>

          <div className="place-content-start place-items-start text-secondary-gray grid grid-cols-2 gap-5 text-sm">
            <h3>Specialty:</h3>
            <p>{item.specialty}</p>
          </div>

          <div className="place-content-start place-items-start text-secondary-gray md:grid-cols-2 grid grid-cols-1 gap-5 text-sm">
            <h3>Bio:</h3>
            <p>{`"${item.bio}"`}</p>
          </div>

          <div className="place-content-start place-items-start text-secondary-gray grid grid-cols-2 gap-5 text-sm">
            <h3>Experience Level:</h3>
            <p>{`${item.experience_level}/5`}</p>
          </div>

          <div className="place-content-start place-items-start text-secondary-gray md:grid-cols-2 grid grid-cols-1 gap-5 text-sm">
            <h3>Availabilie Slot:</h3>
            <p>{`${new Date(item.availability_slot_start)
              .toLocaleString("en-US", {
                dateStyle: "long",
                timeStyle: "short",
              })
              .replace("at", ",")} - ${new Date(
              item.availability_slot_end
            ).toLocaleTimeString("en-US", {
              timeStyle: "short",
            })}`}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentExpertInformation;
