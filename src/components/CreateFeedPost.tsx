import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { FeedType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/shared/CustomFormField";
import CustomFileUpload from "@/components/shared/CustomFileUpload";
import { FeedSchema } from "@/schema/feed.schema";
import { useAuth } from "@/hooks/useAuth";
import LoginModal from "@/components/shared/LoginModal";
import { useFetch, useMutateData } from "@/hooks/useFetch";
import { MultiSelect } from "@/components/ui/multi-select";
import CustomError from "@/components/shared/CustomError";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";

type CreateFeedPostProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetchFeeds?: () => void;
};

const CreateFeedPost = ({
  open,
  setOpen,
  refetchFeeds,
}: CreateFeedPostProps) => {
  const [auth] = useAuth();
  const queryClient = useQueryClient();
  const { data: topics } = useFetch<ITopic[]>({
    url: "/topics",
    queryKey: "topics",
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FeedType>({
    resolver: zodResolver(FeedSchema),
    mode: "all",
  });

  const { mutateAsync, isPending, error, isError } = useMutateData<
    FormData,
    IFeed
  >({
    url: "/feeds",
    config: {
      queryKey: "feeds",
      method: "POST",
      contentType: "multipart/form-data",
      token: auth?.user?.token,
    },
  });

  const handleSubmitForm = async (data: FeedType) => {
    const parsedTopics = data.topics
      ? data.topics.split(",").map((id) => Number(id))
      : [];

    const formData = new FormData();
    formData.append("content", data.content);

    data.photo.forEach((photo) => {
      formData.append("photo", photo as any);
    });

    formData.append("topics", parsedTopics.join(","));

    await mutateAsync(formData);

    toast.success("Feed added successfully");

    reset();

    // Invalidate the feeds query to refetch the data
    queryClient.invalidateQueries({
      queryKey: ["feeds", "/feeds"],
    });

    if (refetchFeeds) {
      refetchFeeds();
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {auth ? (
        <DialogTrigger
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-3 px-4 py-3 bg-white"
        >
          <CreateFeedPostTrigger />
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild onClick={() => setOpen((prev) => !prev)}>
          <LoginModal hasChildren={true}>
            <div className="flex items-center gap-3 px-4 py-3 bg-white">
              <CreateFeedPostTrigger />
            </div>
          </LoginModal>
        </DialogTrigger>
      )}

      <DialogContent className="scrollbar-hide flex flex-col w-full h-[95vh] max-w-2xl gap-5 overflow-y-scroll">
        {/* Header */}
        <div className="flex items-start justify-between">
          <DialogTitle className="flex flex-col gap-3">
            <span className="text-primary-brown md:text-3xl text-2xl font-bold">
              Create a Post
            </span>
            <span className="text-secondary-gray text-sm font-normal">
              What's trending in agriculture today?
            </span>
          </DialogTitle>

          <DialogClose
            onClick={() => reset()}
            className="flex items-center justify-center w-6 h-6 border border-red-500 rounded-full"
          >
            <X size={20} className="text-red-500" />
          </DialogClose>
        </div>

        {/* Create Feed Post Form */}
        <form
          method="post"
          onSubmit={handleSubmit(handleSubmitForm)}
          className="flex flex-col gap-5"
          encType="multipart/form-data"
        >
          {/* Error */}
          <CustomError isError={isError} error={error} />

          <div className="flex flex-col w-full gap-5">
            <CustomFormField
              labelName="Content"
              inputName="content"
              placeholderText="Enter feed/post content"
              errors={errors}
              register={register}
              inputType="textarea"
            />

            <MultiSelect
              options={
                topics
                  ? topics?.map((topic) => ({
                      value: topic.id.toString(),
                      label: topic.name,
                    }))
                  : []
              }
              placeholder="Select Topics"
              defaultValue={[]}
              onValueChange={(values: string[]) => {
                setValue("topics", values.join(","));
              }}
              placeholderClassName="text-secondary-gray"
              className="bg-primary-lightBlue placeholder:text-secondary-gray text-primary-gray/70 focus:outline-none ring-0 placeholder:text-xs hover:bg-primary-lightBlue hover:outline-none w-full p-3 text-sm border-none rounded outline-none"
            />

            <CustomFileUpload
              title="Add Attachment"
              itemName="photo"
              setValue={setValue}
              watch={watch}
              allowMultiple={true}
            />
          </div>

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
                  "Create New"
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFeedPost;

const CreateFeedPostTrigger = () => {
  return (
    <>
      <img
        src="/images/avatar.jpg"
        alt="User Icon"
        className="w-10 h-10 rounded-full"
      />
      <input
        type="text"
        placeholder="What's trending in agriculture today?"
        className="text-primary-gray flex-grow w-full px-3 py-4 text-sm bg-transparent outline-none cursor-default"
      />

      <button>
        <Edit size={25} className="text-secondary-gray" />
      </button>
    </>
  );
};
