import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { axiosInstance } from "@/lib/utils";
import { FeedType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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

const CreateFeedPost = () => {
  const [auth] = useAuth();

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

  const { mutateAsync, isPending, error, isError } = useMutation({
    mutationFn: async (data: FeedType) => {
      const res = await axiosInstance.post("/users", data);

      return res.data;
    },
    onSuccess: () => {
      toast.success("Post added successfully");
      reset();
    },
  });

  const handleSubmitForm = async (data: FeedType) => {
    console.log(data);
    await mutateAsync({ ...data });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {auth ? (
          <CreateFeedPostTrigger />
        ) : (
          <LoginModal hasChildren={true}>
            <CreateFeedPostTrigger />
          </LoginModal>
        )}
      </DialogTrigger>

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
          {isError && (
            <div className="flex items-center justify-center p-4 text-center bg-red-200 rounded-md">
              <p className="text-xs text-red-500">{error.message}</p>
            </div>
          )}
          <div className="flex flex-col w-full gap-5">
            <CustomFormField
              labelName="Content"
              inputName="content"
              placeholderText="Enter feed/post content"
              errors={errors}
              register={register}
              inputType="textarea"
            />

            <CustomFormField
              labelName="Tags"
              inputName="tags"
              placeholderText="eg. #food, #health, #travel"
              errors={errors}
              register={register}
              inputType="text"
            />

            <CustomFileUpload
              title="Add Attachment"
              itemName="images"
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
    <div className="flex items-center gap-3 px-4 py-3 bg-white">
      <img
        src="/images/avatar.png"
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
    </div>
  );
};
