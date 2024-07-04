import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, X } from "lucide-react";
import { AiOutlineSearch } from "react-icons/ai";
import { userFeeds as allUsers } from "@/constants";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type UserType = Pick<
  (typeof allUsers)[number],
  "authorName" | "authorImage" | "id"
>;

const SearchUser = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<UserType[]>([]);

  const showFilteredUsers = useCallback(() => {
    const filteredUsers: UserType[] = allUsers.filter((user: UserType) => {
      return user.authorName.toLowerCase().includes(search.toLowerCase());
    });

    setUsers(filteredUsers);
  }, [search]);

  useEffect(() => {
    showFilteredUsers();

    return () => {
      setUsers([]);
    };
  }, [search, showFilteredUsers]);

  return (
    <Dialog>
      <DialogTrigger className="md:bg-secondary-gray/10 md:rounded-full hover:scale-105 bg-white/30 md:items-center md:flex-col flex flex-row gap-3 p-4 transition rounded">
        <AiOutlineSearch
          size={20}
          className={"text-white md:text-primary-brown"}
        />
        <span className="md:hidden text-base text-white">Search</span>
      </DialogTrigger>

      <DialogContent className="w-full max-w-2xl h-[90vh] flex bg-white rounded-none flex-col gap-5 overflow-y-scroll scrollbar-hide">
        {/* Header */}
        <div className="flex items-start justify-between">
          <DialogTitle className="flex flex-col gap-3">
            <span className="text-primary-brown md:text-2xl text-xl font-bold">
              Search
            </span>
            <span className="text-secondary-gray text-sm font-normal">
              Search and follow
            </span>
          </DialogTitle>

          <DialogClose className="flex items-center justify-center w-6 h-6 border border-red-500 rounded-full">
            <X size={20} className="text-red-500" />
          </DialogClose>
        </div>

        {/* Contact Seller */}
        <div className="flex flex-col w-full gap-4">
          <div className="border-secondary-gray flex items-center gap-3 px-2 py-1 border rounded-md">
            <input
              type="text"
              placeholder="Search for a user..."
              className="text-primary-gray flex-grow w-full px-3 py-2 text-sm bg-transparent outline-none"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />

            <button>
              <Search size={25} className="text-secondary-gray" />
            </button>
          </div>

          <div className="gap-7 flex flex-col w-full pt-5 pb-10">
            {users.length === 0 ? (
              <div className="flex items-center justify-center w-full h-full">
                <p className="text-primary-brown text-xl font-bold text-center">
                  No users found
                </p>
              </div>
            ) : (
              users.map((user) => <SearchUserItem key={user.id} user={user} />)
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchUser;

const SearchUserItem = ({ user }: { user: UserType }) => {
  return (
    <div key={user.id} className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src={user.authorImage}
          alt="profile"
          className="object-cover w-10 h-10 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <p className="text-primary-green text-sm font-medium">
            {user.authorName}
          </p>
        </div>
      </div>

      <Button
        variant={"link"}
        className="text-primary-green hover:no-underline"
      >
        Follow
      </Button>
    </div>
  );
};
