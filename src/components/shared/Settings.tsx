import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { axiosInstance, cn } from "@/lib/utils";
import { SettingsSchema } from "@/schema/settings.schema";
import { SettingsType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useForm, UseFormRegister } from "react-hook-form";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

const Settings = () => {
  const [auth] = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsType>({
    resolver: zodResolver(SettingsSchema),
    mode: "all",
  });

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: async (data: SettingsType) => {
      const res = await axiosInstance.post("/users", data);
      return res.data;
    },

    onSuccess: () => {
      toast.success("Settings saved successfully");
    },
  });

  const handleSettingsSubmit = async (data: SettingsType) => {
    console.log({ data });
    await mutateAsync(data);
  };

  return (
    <div className="-mt-7 md:-mt-5 flex flex-col w-full min-h-screen gap-5 bg-white">
      <Helmet>
        <title>Account Settings - Agrieco-Connect</title>
        <meta name="description" content="Settings" />
      </Helmet>

      <section className="border-b-secondary-gray flex flex-col w-full gap-4 px-5 pt-5 pb-3 border-b">
        <Link
          to="/user/feed"
          className="text-primary-green group w-fit flex items-center gap-2 mt-5 text-sm"
        >
          <ArrowLeft size={20} className="text-primary-green" />
          <span className="group-hover:underline">Back to Dashboard</span>
        </Link>
        <h2 className="text-primary-brown text-2xl font-bold">Settings</h2>
      </section>

      <section className="flex flex-col h-full gap-5 px-5 pb-20">
        {/* User Profile */}
        <div className="border-secondary-gray gap-7 flex flex-col pb-4 border-b">
          <h3 className="text-primary-green border-secondary-gray w-fit px-6 py-2 font-bold border rounded-md">
            User Profile
          </h3>

          <div className="flex items-center justify-center w-full">
            <div className="md:flex-row flex flex-col items-center gap-5">
              <div className="flex flex-col gap-2">
                <img
                  src="/images/profile.png"
                  alt="Profile Image"
                  className="object-cover w-32 h-32 rounded-full"
                />
              </div>

              <div className="md:text-start flex flex-col gap-1 text-center">
                <h3 className="text-primary-green">Adetokunbo Adebayo</h3>
                <p className="text-primary-brown text-xs font-semibold">
                  Veterinarian and Poultry Farm Owner
                </p>
                <p className="text-secondary-gray/50 text-xs">
                  Passionate poultry farmer with 20 years of experience in
                  sustainable farming practices.
                </p>
              </div>
            </div>
          </div>
        </div>

        <form
          method="form"
          onSubmit={handleSubmit(handleSettingsSubmit)}
          className="flex flex-col gap-10"
        >
          {isError && (
            <div className="flex items-center justify-center p-4 text-center bg-red-200 rounded-md">
              <p className="text-xs text-red-500">{error.message}</p>
            </div>
          )}
          {/* Personal and Contact Information */}
          <div className="border-secondary-gray gap-7 flex flex-col pb-4 border-b">
            <h3 className="text-primary-brown font-medium">
              Personal and Contact Information
            </h3>

            <div className="flex flex-col w-full gap-5">
              {/* First Row */}
              <div className="sm:grid-cols-2 lg:grid-cols-3 grid w-full grid-cols-1 gap-6">
                <InputForm
                  labelName="Full Name"
                  inputName="name"
                  placeholder="Please enter your full name"
                  hasError={errors.name !== undefined}
                  errorMessage={errors.name?.message}
                  register={register}
                  defaultValue={auth?.name}
                  isTextArea={false}
                />

                <InputForm
                  labelName="Email"
                  inputName="email"
                  placeholder="Please enter your email"
                  hasError={errors.email !== undefined}
                  errorMessage={errors.email?.message}
                  register={register}
                  defaultValue={auth?.email}
                  isTextArea={false}
                />

                <InputForm
                  labelName="Username"
                  inputName="username"
                  placeholder="Please enter your username"
                  hasError={errors.username !== undefined}
                  errorMessage={errors.username?.message}
                  register={register}
                  defaultValue={"@AgriExpert123"}
                  isTextArea={false}
                />
              </div>

              {/* Second Row */}
              <div className="sm:grid-cols-2 lg:grid-cols-3 grid w-full grid-cols-1 gap-6">
                <InputForm
                  labelName="Phone number"
                  inputName="phone"
                  placeholder="Please enter your phone number"
                  hasError={errors.phone !== undefined}
                  errorMessage={errors.phone?.message}
                  register={register}
                  defaultValue={"00000 00000  00000"}
                  isTextArea={false}
                />

                <InputForm
                  labelName="Location"
                  inputName="location"
                  placeholder="Please enter your location"
                  hasError={errors.location !== undefined}
                  errorMessage={errors.location?.message}
                  register={register}
                  defaultValue={"Des Moines, Iowa, USA"}
                  isTextArea={false}
                />
              </div>

              {/* Third Row */}
              <div className="md:w-1/2 w-full">
                <InputForm
                  labelName="Bio"
                  inputName="bio"
                  placeholder="Tell us about yourself"
                  hasError={errors.bio !== undefined}
                  errorMessage={errors.bio?.message}
                  register={register}
                  defaultValue={
                    "Passionate poultry farmer with 20 years of experience in sustainable farming practices."
                  }
                  isTextArea={true}
                />
              </div>
            </div>
          </div>

          {/* Professional Details */}
          <div className="border-secondary-gray gap-7 flex flex-col pb-4 border-b">
            <h3 className="text-primary-brown font-medium">
              Professional Details
            </h3>

            <div className="flex flex-col w-full gap-5">
              {/* First Row */}
              <div className="sm:grid-cols-2 lg:grid-cols-3 grid w-full grid-cols-1 gap-6">
                <InputForm
                  labelName="Occupation/Role"
                  inputName="occupation"
                  placeholder="Please enter your occupation"
                  hasError={errors.occupation !== undefined}
                  errorMessage={errors.occupation?.message}
                  register={register}
                  defaultValue={"Veterinarian and Poultry Farm Owner"}
                  isTextArea={false}
                />

                <InputForm
                  labelName="Company/Farm Name"
                  inputName="company"
                  placeholder="Please enter your company or farm name"
                  hasError={errors.company !== undefined}
                  errorMessage={errors.company?.message}
                  register={register}
                  defaultValue={"Green Pastures Poultry Farm"}
                  isTextArea={false}
                />

                <InputForm
                  labelName="Experience Level"
                  inputName="experience"
                  placeholder="Please enter your experience Level"
                  hasError={errors.experience !== undefined}
                  errorMessage={errors.experience?.message}
                  register={register}
                  defaultValue={"20 years"}
                  isTextArea={false}
                />
              </div>

              {/* Second Row */}
              <div className="sm:grid-cols-2 lg:grid-cols-3 grid w-full grid-cols-1 gap-6">
                <InputForm
                  labelName="Primary Expertise"
                  inputName="primaryExpertise"
                  placeholder="Please enter your primary expertise"
                  hasError={errors.primaryExpertise !== undefined}
                  errorMessage={errors.primaryExpertise?.message}
                  register={register}
                  defaultValue={"Poultry Farming"}
                  isTextArea={false}
                />

                <InputForm
                  labelName="SecondaryExpertise"
                  inputName="secondaryExpertise"
                  placeholder="Please enter your secondary expertise"
                  hasError={errors.secondaryExpertise !== undefined}
                  errorMessage={errors.secondaryExpertise?.message}
                  register={register}
                  defaultValue={"Animal Health and Nutrition"}
                  isTextArea={false}
                />

                <InputForm
                  labelName="Interests"
                  inputName="interests"
                  placeholder="Please enter your interests"
                  hasError={errors.interests !== undefined}
                  errorMessage={errors.interests?.message}
                  register={register}
                  defaultValue={
                    "Organic farming, disease prevention, farm management"
                  }
                  isTextArea={false}
                />
              </div>

              {/* Third Row */}
              <div className="sm:grid-cols-2 lg:grid-cols-3 grid w-full grid-cols-1 gap-6">
                <InputForm
                  labelName="Degrees/Certifications"
                  inputName="certifications"
                  placeholder="Please enter your degrees or certifications"
                  hasError={errors.certifications !== undefined}
                  errorMessage={errors.certifications?.message}
                  register={register}
                  defaultValue={"DVM (Doctor of Veterinary Medicine)"}
                  isTextArea={false}
                />

                <InputForm
                  labelName="Institutions Attended"
                  inputName="instuitionsAttended"
                  placeholder="Please enter your institutions Attended"
                  hasError={errors.instuitionsAttended !== undefined}
                  errorMessage={errors.instuitionsAttended?.message}
                  register={register}
                  defaultValue={"University of Agriculture"}
                  isTextArea={false}
                />

                <InputForm
                  labelName="Awards and Recognitions"
                  inputName="awards"
                  placeholder="Please enter your awards and recognitions"
                  hasError={errors.awards !== undefined}
                  errorMessage={errors.awards?.message}
                  register={register}
                  defaultValue={
                    "“Best Poultry Farm” - Iowa State Agriculture Awards 2023"
                  }
                  isTextArea={false}
                />
              </div>
            </div>
          </div>

          {/* Contributions and Achievements */}
          <div className="border-secondary-gray gap-7 flex flex-col pb-4 border-b">
            <h3 className="text-primary-brown font-medium">
              Contributions and Achievements
            </h3>

            <div className="flex flex-col w-full gap-5">
              {/* First Row */}
              <div className="sm:grid-cols-2 lg:grid-cols-3 grid w-full grid-cols-1 gap-6">
                <InputForm
                  labelName="Projects"
                  inputName="projects"
                  placeholder="list your projects"
                  hasError={errors.projects !== undefined}
                  errorMessage={errors.projects?.message}
                  register={register}
                  defaultValue={
                    "Lead project on “Sustainable Poultry Practices” in collaboration with local farmers."
                  }
                  isTextArea={false}
                />

                <InputForm
                  labelName="Publications"
                  inputName="publications"
                  placeholder="Please enter your publications"
                  hasError={errors.publications !== undefined}
                  errorMessage={errors.publications?.message}
                  register={register}
                  defaultValue={
                    "Co-author of “The Complete Guide to Poultry Farming."
                  }
                  isTextArea={false}
                />

                <InputForm
                  labelName="Groups/Associations"
                  inputName="groups"
                  placeholder="Please enter your groups/associations"
                  hasError={errors.groups !== undefined}
                  errorMessage={errors.groups?.message}
                  register={register}
                  defaultValue={"Member of the American Poultry Association"}
                  isTextArea={false}
                />
              </div>

              {/* Second Row */}
              <div className="sm:grid-cols-2 lg:grid-cols-3 grid w-full grid-cols-1 gap-6">
                <InputForm
                  labelName="Community Contributions"
                  inputName="contributions"
                  placeholder="Please enter your community contributions"
                  hasError={errors.contributions !== undefined}
                  errorMessage={errors.contributions?.message}
                  register={register}
                  defaultValue={
                    "Volunteer at the local 4-H Club, Mentor for young farmers"
                  }
                  isTextArea={false}
                />

                <InputForm
                  labelName="Videos"
                  inputName="videos"
                  placeholder="Please enter your videos"
                  hasError={errors.videos !== undefined}
                  errorMessage={errors.videos?.message}
                  register={register}
                  defaultValue={"Link to tutorial on poultry farm setup"}
                  isTextArea={false}
                />

                <InputForm
                  labelName="Documents"
                  inputName="documents"
                  placeholder="Please enter your documents"
                  hasError={errors.documents !== undefined}
                  errorMessage={errors.documents?.message}
                  register={register}
                  defaultValue={
                    "Link to research paper on disease control in poultry"
                  }
                  isTextArea={false}
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="sm:flex-row sm:items-center flex flex-col w-full gap-5 pb-5">
            <Button
              disabled={isPending}
              variant="destructive"
              className="sm:w-40 w-full px-5 py-2"
            >
              {isPending ? (
                <ClipLoader size={28} loading={isPending} color="white" />
              ) : (
                "Update Profile"
              )}
            </Button>

            <Button
              disabled={isPending}
              variant={"link"}
              className="text-primary-green"
            >
              Reset
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Settings;

type InputFormProps = {
  labelName: string;
  inputName: keyof SettingsType;
  inputType?: string;
  placeholder?: string;
  hasError?: boolean;
  errorMessage?: string;
  isTextArea?: boolean;
  register: UseFormRegister<SettingsType>;
  defaultValue?: string;
  containerClassName?: string;
};
const InputForm = ({
  labelName,
  inputName,
  inputType,
  placeholder,
  hasError,
  errorMessage,
  isTextArea,
  register,
  defaultValue,
  containerClassName,
}: InputFormProps) => {
  return (
    <div className={cn("flex flex-col gap-2", containerClassName)}>
      <label htmlFor={inputName} className="text-sm font-medium text-black">
        {labelName}
      </label>

      {isTextArea ? (
        <textarea
          {...register(inputName)}
          id={inputName}
          className="bg-primary-lightBlue placeholder:text-secondary-gray text-primary-gray/70 focus:outline-none ring-0 w-full p-3 text-sm border-none rounded outline-none"
          placeholder={placeholder}
          rows={10}
          defaultValue={defaultValue || ""}
        />
      ) : (
        <input
          type={inputType || "text"}
          id={inputName}
          {...register(inputName)}
          className="bg-primary-lightBlue placeholder:text-secondary-gray text-primary-gray/70 focus:outline-none ring-0 w-full p-3 text-sm border-none rounded outline-none"
          placeholder={placeholder || labelName}
          defaultValue={defaultValue || ""}
        />
      )}
      {hasError && (
        <p className="text-start py-1 text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};
