import { useLocation } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserManagement } from "@/pages/admin/Dashboard";
import { useEffect, useState } from "react";
import { Search, Trash2 } from "lucide-react";
import DeleteItemModal from "@/components/DeleteItemModal";

type UserManagementTableProps = {
  users: UserManagement[];
};

const UserManagementTable = ({ users }: UserManagementTableProps) => {
  const pathname = useLocation().pathname;
  const isDashboard = pathname.includes("dashboard");

  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState<string>("0");

  const handleDelete = (id: string) => {
    const filtered = filteredUsers.filter((user) => user.id !== id);
    setFilteredUsers(filtered);

    setOpenModal(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    if (e.target.value.length > 0) {
      const filtered = filteredUsers.filter(
        (user) =>
          user.username.toLowerCase().includes(e.target.value.toLowerCase()) ||
          user.fullName.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  };

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
            <TableHead className="text-primary-brown text-sm font-medium">
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
          {filteredUsers.length > 0 &&
            filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="flex items-center gap-3 text-sm font-normal text-black capitalize">
                  <img
                    src={user.image}
                    alt="avatar"
                    className="object-cover w-10 h-10 rounded-full"
                  />
                  <span>{user.username}</span>
                </TableCell>
                <TableCell className="text-sm font-normal text-black">
                  {user.fullName}
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

      <DeleteItemModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleDelete={() => handleDelete(itemToDeleteId)}
        modalTitle="Delete User"
        modalDescription="Are you sure you want to delete this user?"
        toastMessage="User has been deleted successfully"
      />
    </section>
  );
};

export default UserManagementTable;
