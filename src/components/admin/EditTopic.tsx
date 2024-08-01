import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { axiosInstance } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/shared/CustomFormField";
import { useAuth } from "@/hooks/useAuth";
import { CreateTopicSchema, TopicsType } from "@/components/admin/AddTopic";
import { useMutateData } from "@/hooks/useFetch";
import CustomError from "@/components/shared/CustomError";
import { useState } from "react";

type EditTopicProps = {
  topic: ITopic;
  refetchTopics?: () => void;
};

const EditTopic = ({ topic, refetchTopics }: EditTopicProps) => {
  const [auth] = useAuth();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TopicsType>({
    resolver: zodResolver(CreateTopicSchema),
    defaultValues: {
      name: topic.name,
      description: topic.description as string,
      id: topic.id.toString(),
    },
    mode: "all",
  });

  const { mutateAsync, isPending, error, isError } = useMutateData<
    TopicsType,
    ITopic
  >({
    url: `/topics/${topic.id}`,
    config: {
      method: "PUT",
      token: auth?.user.token,
      contentType: "application/json",
      queryKey: "topics",
      reset: () =>
        reset({
          name: "",
          id: "",
          description: "",
        }),
      resetValues: {
        name: "",
        id: "",
        description: "",
      },
    },
  });

  const handleSubmitForm = async (data: TopicsType) => {
    await mutateAsync({ ...data });

    queryClient.invalidateQueries({
      queryKey: ["topics", "/topics", `/topics/${topic.id}`],
    });

    if (refetchTopics) {
      refetchTopics();
    }

    reset();

    toast.success("Topic updated successfully");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => setOpen(true)}>
        <Edit size={20} className="text-green-500" />
      </DialogTrigger>

      <DialogContent className="scrollbar-hide flex flex-col w-full max-w-xl gap-5 overflow-y-scroll">
        {/* Header */}
        <div className="flex items-start justify-between">
          <DialogTitle className="flex flex-col gap-3">
            <span className="text-primary-brown md:text-3xl text-2xl font-bold">
              Edit Topic
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

        {/* Edit a Topic Form */}
        <form
          method="post"
          onSubmit={handleSubmit(handleSubmitForm)}
          className="flex flex-col gap-5"
        >
          <CustomError isError={isError} error={error} />

          <div className="grid w-full grid-cols-1 gap-5">
            <CustomFormField
              labelName="Topic"
              inputName="name"
              placeholderText="Enter topic name"
              errors={errors}
              register={register}
              inputType="text"
            />

            <CustomFormField
              labelName="Description"
              inputName="description"
              placeholderText="Enter description"
              errors={errors}
              register={register}
              inputType="text"
            />

            <CustomFormField
              labelName="ID"
              inputName="id"
              placeholderText="Enter ID"
              errors={errors}
              register={register}
              inputType="hidden"
            />
          </div>

          <div className="flex flex-col w-full gap-5">
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
                    "Update Topic"
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

export default EditTopic;
