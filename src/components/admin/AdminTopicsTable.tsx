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
import { Topics } from "@/pages/admin/AdminTopics";
import DeleteItemModal from "@/components/DeleteItemModal";
import EditTopic from "@/components/admin/EditTopic";
import { useFetch, useMutateData } from "@/hooks/useFetch";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

type AdminTopicsTableProps = {
  topics: Topics[];
};

const AdminTopicsTable = ({ topics }: AdminTopicsTableProps) => {
  const [auth] = useAuth();
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    refetch: refetchTopics,
  } = useFetch<ITopic[]>({
    queryKey: "topics",
    url: "/topics",
    enabled: true,
  });

  const [filteredTopics, setFilteredTopics] = useState(topics);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState<number>(0);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    if (e.target.value.length > 0) {
      const filtered = filteredTopics.filter((topic) =>
        topic.topic.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredTopics(filtered);
    } else {
      setFilteredTopics(topics);
    }
  };

  // handle delete item
  const {
    mutateAsync,
    isPending: pending,
    error,
  } = useMutateData<null, ITopic>({
    url: `/topics/${itemToDeleteId}`,
    config: {
      method: "DELETE",
      token: auth?.user.token,
      queryKey: "topics",
    },
  });

  const handleDeleteItem = async () => {
    await mutateAsync(null, {
      onError: () => {
        toast.error("Something went wrong");
        console.log({ error });
      },
    });

    toast.success("Topic deleted successfully");

    queryClient.invalidateQueries({
      queryKey: ["topics", "/topics"],
    });

    refetchTopics();

    setOpenModal(false);
  };

  return (
    <section className="flex flex-col w-full h-full gap-5 px-3">
      <div className="bg-secondary-gray/20 md:w-1/2 flex items-center justify-between w-full gap-3 px-3 py-1 rounded-full">
        <input
          type="text"
          className="placeholder:text-secondary-gray/50 focus:outline-none placeholder:text-xs w-full px-3 py-2 text-sm text-black bg-transparent border-none"
          placeholder="Search for topics"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Search size={20} className="me-3 text-black" />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-primary-brown text-sm font-medium">
              Topic
            </TableHead>
            <TableHead className="text-primary-brown text-sm font-medium">
              Category
            </TableHead>
            <TableHead className="text-primary-brown text-sm font-medium">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTopics.length > 0 &&
            filteredTopics.map((topic) => (
              <TableRow key={topic.id}>
                <TableCell className="flex items-center gap-3 text-sm font-normal text-black capitalize">
                  {topic.topic}
                </TableCell>
                <TableCell className="text-sm font-normal text-black">
                  {topic.category}
                </TableCell>
                <TableCell className="flex items-center gap-4">
                  <EditTopic topic={topic} />

                  <button
                    onClick={() => {
                      setItemToDeleteId(parseInt(topic.id));
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

      {filteredTopics.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-5 py-5">
          <h2 className="text-sm font-semibold text-black">No topics found</h2>
        </div>
      )}

      <DeleteItemModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        deleteFn={() => handleDeleteItem()}
        modalTitle="Delete Topic"
        modalDescription="Are you sure you want to delete this topic?"
        pending={pending}
      />
    </section>
  );
};

export default AdminTopicsTable;
