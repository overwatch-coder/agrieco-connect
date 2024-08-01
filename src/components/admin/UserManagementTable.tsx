import { useLocation } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserManagement } from "@/pages/admin/Dashboard";
import { useEffect, useState } from "react";
import { Search, Trash2 } from "lucide-react";
import DeleteItemModal from "@/components/DeleteItemModal";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { useFetch, useMutateData } from "@/hooks/useFetch";
import { toast } from "react-toastify";
import { faker } from "@faker-js/faker";

type UserManagementTableProps = {
  users: UserManagement[];
};

declare interface IUser {
  id: number;
  username: string;
  fullname: string;
  email: string;
  occupation: string;
  location: string;
  picture: string;
}

const UserManagementTable = ({ users }: UserManagementTableProps) => {
  const pathname = useLocation().pathname;
  const isDashboard = pathname.includes("dashboard");
  const [auth] = useAuth();
  const queryClient = useQueryClient();

  const { data: usersData, refetch: refetchUsers } = useFetch<IUser[]>({
    queryKey: "users",
    url: "/users",
    enabled: true,
  });

  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState<number>(0);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 7;

  faker.seed(123);

  useEffect(() => {
    if (usersData) {
      setFilteredUsers(
        usersData.map((user) => ({
          ...user,
          picture: faker.image.avatarGitHub(),
          occupation: faker.person.jobTitle(),
          location: faker.location.city(),
        }))
      );
    }
  }, [usersData]);

  // handle delete item
  const {
    mutateAsync,
    isPending: pending,
    error,
  } = useMutateData<null, IUser>({
    url: `/users/${itemToDeleteId}`,
    config: {
      method: "DELETE",
      token: auth?.user.token,
      queryKey: "users",
    },
  });

  const handleDeleteItem = async () => {
    await mutateAsync(null, {
      onError: () => {
        toast.error("Something went wrong");
        console.log({ error });
      },
    });

    toast.success("User deleted successfully");

    queryClient.invalidateQueries({
      queryKey: ["users", "/users"],
    });

    refetchUsers();
    setOpenModal(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!usersData) return;

    setSearchTerm(e.target.value);

    if (e.target.value.length > 0) {
      const filtered = filteredUsers.filter(
        (user) =>
          user.username.toLowerCase().includes(e.target.value.toLowerCase()) ||
          user.fullname.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(
        usersData.map((user) => ({
          ...user,
          picture: faker.image.avatarGitHub(),
          occupation: faker.person.jobTitle(),
          location: faker.location.city(),
        }))
      );
    }

    // Reset to the first page on search
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <section className="flex flex-col w-full h-full gap-5 px-3">
      {!isDashboard && (
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
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-primary-brown text-sm font-medium">
              Username
            </TableHead>
            <TableHead className="text-primary-brown w-full text-sm font-medium">
              Full Name
            </TableHead>
            <TableHead className="text-primary-brown text-sm font-medium">
              Email
            </TableHead>
            <TableHead className="text-primary-brown text-sm font-medium">
              Occupation
            </TableHead>
            {!isDashboard && (
              <TableHead className="text-primary-brown text-sm font-medium">
                Location
              </TableHead>
            )}
            {!isDashboard && (
              <TableHead className="text-primary-brown text-sm font-medium">
                Action
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentUsers.length > 0 &&
            currentUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="flex items-center gap-3 text-sm font-normal text-black capitalize">
                  <img
                    src={user.picture}
                    alt="avatar"
                    className="2xl:block hidden object-cover w-10 h-10 rounded-full"
                  />
                  <span>{user.username}</span>
                </TableCell>
                <TableCell className="w-full text-sm font-normal text-black">
                  {user.fullname}
                </TableCell>
                <TableCell className="text-sm font-normal text-black">
                  {user.email}
                </TableCell>
                <TableCell className="text-sm font-normal text-black">
                  {user.occupation}
                </TableCell>
                {!isDashboard && (
                  <TableCell className="text-sm font-normal text-black">
                    {user.location}
                  </TableCell>
                )}
                {!isDashboard && (
                  <TableCell className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setItemToDeleteId(user.id);
                        setOpenModal(true);
                      }}
                    >
                      <Trash2 size={20} className="text-red-500" />
                    </button>
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {filteredUsers.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-5">
          <h2 className="text-sm font-semibold text-black">No users found</h2>
        </div>
      )}

      {filteredUsers.length > 0 && (
        <div className="flex justify-center pb-5 mt-4">
          <nav>
            <ul className="inline-flex items-center -space-x-px">
              {[...Array(totalPages)].map((_, index) => (
                <li key={index}>
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`px-3 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 ${
                      currentPage === index + 1
                        ? "bg-gray-100 text-gray-900"
                        : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      <DeleteItemModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        deleteFn={() => handleDeleteItem()}
        modalTitle="Delete User"
        modalDescription="Are you sure you want to delete this user?"
        pending={pending}
      />
    </section>
  );
};

export default UserManagementTable;
