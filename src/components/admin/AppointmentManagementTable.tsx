import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Search, Trash2 } from "lucide-react";
import DeleteItemModal from "@/components/DeleteItemModal";
import EditAppointment from "@/components/admin/EditAppointment";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useFetch, useMutateData } from "@/hooks/useFetch";

type AppointmentManagementTableProps = {
  filteredAppointments: IAppointment[];
  setFilteredAppointments: React.Dispatch<React.SetStateAction<IAppointment[]>>;
  appointments: IAppointment[];
  appointmentType: string;
};
const tableHeaderNames = [
  "Appointment Title",
  "Name of Expert",
  "Email",
  "Speciality",
  "Status",
  "Action",
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "#4CAF5033";
    case "pending":
      return "#79554833";
    case "rejected":
      return "#FF634733";
    default:
      return "#79554833";
  }
};

const AppointmentManagementTable = ({
  filteredAppointments,
  setFilteredAppointments,
  appointments,
  appointmentType,
}: AppointmentManagementTableProps) => {
  const [auth] = useAuth();
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    refetch: refetchAppointments,
  } = useFetch<ITopic[]>({
    queryKey: "appointments",
    url: "/appointments",
    enabled: true,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState<number>(0);

  // handle delete item
  const {
    mutateAsync,
    isPending: pending,
    error,
  } = useMutateData<null, ITopic>({
    url: `/appointments/${itemToDeleteId}`,
    config: {
      method: "DELETE",
      token: auth?.user.token,
      queryKey: "appointments",
    },
  });

  const handleDeleteItem = async () => {
    await mutateAsync(null, {
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Something went wrong");
        console.log({ error });
        setOpenModal(false);
      },
    });

    toast.success("Appointment deleted successfully");

    queryClient.invalidateQueries({
      queryKey: ["appointments", "/appointments"],
    });

    refetchAppointments();

    setOpenModal(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    if (e.target.value.length > 0) {
      const filtered = filteredAppointments.filter(
        (appointment) =>
          appointment.company_name
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          appointment.specialty
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
      );
      setFilteredAppointments(filtered);
    } else {
      setFilteredAppointments(
        appointmentType === "all"
          ? appointments
          : appointments.filter((appointment) => appointment.is_booked)
      );
    }
  };

  return (
    <section className="flex flex-col w-full h-full gap-5 px-3">
      <div className="bg-secondary-gray/20 md:w-1/2 flex items-center justify-between w-full gap-3 px-3 py-1 rounded-full">
        <input
          type="text"
          className="placeholder:text-secondary-gray/50 focus:outline-none placeholder:text-xs w-full px-3 py-2 text-sm text-black bg-transparent border-none"
          placeholder="Search for users by name or username"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Search size={20} className="me-3 text-black" />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {tableHeaderNames.map((name, index) => (
              <TableHead
                className="text-primary-brown text-sm font-medium"
                key={index}
              >
                {name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAppointments.length > 0 &&
            filteredAppointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="flex items-center gap-3 text-sm font-normal text-black capitalize">
                  <span>{appointment.bio}</span>
                </TableCell>
                <TableCell className="text-sm font-normal text-black">
                  {appointment.company_name}
                </TableCell>
                <TableCell className="text-sm font-normal text-black">
                  {appointment.user.email}
                </TableCell>
                <TableCell className="text-sm font-normal text-black">
                  {appointment.specialty}
                </TableCell>
                <TableCell className="text-sm font-normal text-center text-black rounded">
                  <span
                    className="p-2 capitalize rounded"
                    style={{
                      backgroundColor: getStatusColor(
                        appointment.is_booked ? "approved" : "pending"
                      ),
                    }}
                  >
                    {appointment.is_booked ? "Approved" : "Pending"}
                  </span>
                </TableCell>
                <TableCell className="flex items-center gap-4">
                  <EditAppointment appointment={appointment} />

                  <button
                    onClick={() => {
                      setItemToDeleteId(appointment.id);
                      setOpenModal(true);
                    }}
                  >
                    <Trash2 size={20} className="text-red-500" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {filteredAppointments.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-5 py-4">
          <h2 className="text-sm font-semibold text-black">
            No appointments found
          </h2>
        </div>
      )}

      <DeleteItemModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        deleteFn={() => handleDeleteItem()}
        modalTitle="Delete Appointment"
        modalDescription="Are you sure you want to delete this appointment?"
        pending={pending}
      />
    </section>
  );
};

export default AppointmentManagementTable;
