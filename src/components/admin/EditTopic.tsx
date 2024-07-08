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
import { TopicsType } from "@/types";
import { TopicsSchema } from "@/schema/topics.schema";

type EditTopicProps = {
  topic: TopicsType;
};

const EditTopic = ({ topic }: EditTopicProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TopicsType>({
    resolver: zodResolver(TopicsSchema),
    defaultValues: {
      ...topic,
      id: topic.id,
    },
    mode: "all",
  });

  const { mutateAsync, isPending, error, isError } = useMutation({
    mutationFn: async (data: TopicsType) => {
      const res = await axiosInstance.post("/users", data);

      return res.data;
    },
    onSuccess: () => {
      toast.success("Topic added successfully");
      reset();
    },
  });

  const handleSubmitForm = async (data: TopicsType) => {
    console.log(data);
    await mutateAsync({ ...data });
  };

  return (
    <Dialog>
      <DialogTrigger>
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
            onClick={() => reset()}
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
          {isError && (
            <div className="flex items-center justify-center p-4 text-center bg-red-200 rounded-md">
              <p className="text-xs text-red-500">{error.message}</p>
            </div>
          )}

          <div className="grid w-full grid-cols-1 gap-5">
            <CustomFormField
              labelName="Topic"
              inputName="topic"
              placeholderText="Enter topic"
              errors={errors}
              register={register}
              inputType="text"
            />

            <CustomFormField
              labelName="Category"
              inputName="category"
              placeholderText="Enter category"
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
              inputType="textarea"
            />

            <CustomFormField
              labelName="Topic ID"
              inputName="id"
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
