import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { axiosInstance } from "@/lib/utils";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormType = z.infer<typeof contactFormSchema>;

const ContactUsForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormType>({
    resolver: zodResolver(contactFormSchema),
  });

  // submit login form
  const { mutateAsync, isPending: pending } = useMutation({
    mutationFn: async (data: ContactFormType) => {
      const response = await axiosInstance.post("/users", data);
      return data;
    },
    onSuccess: (data) => {
      setFormSubmitted(true);
      reset();

      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    },
  });

  const contactFormSubmission = async (data: ContactFormType) => {
    console.log({ data });
    await mutateAsync(data);
  };

  return (
    <>
      {formSubmitted ? (
        <div className="flex flex-col items-center justify-center h-full">
          <SuccessMessage setFormSubmitted={setFormSubmitted} />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(contactFormSubmission)}
          className="flex flex-col gap-10"
          method="POST"
        >
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="my-1 text-sm text-white">
              Name
            </label>

            <input
              type="text"
              id="name"
              {...register("name")}
              className="border-b-white/80 focus:border-b-white focus:outline-none placeholder:text-sm w-full py-2 text-white bg-transparent border-b-2 rounded"
              placeholder="Enter name"
            />

            {errors.name && (
              <p className="py-2 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="my-1 text-sm text-white">
              Email
            </label>

            <input
              type="email"
              id="email"
              {...register("email")}
              className="border-b-white/80 focus:border-b-white focus:outline-none placeholder:text-sm w-full py-2 text-white bg-transparent border-b-2 rounded"
              placeholder="Enter email address"
            />

            {errors.email && (
              <p className="py-2 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div className="flex flex-col">
            <label htmlFor="message" className="my-1 text-sm text-white">
              Message
            </label>

            <textarea
              id="message"
              {...register("message")}
              rows={4}
              className="border-b-white/80 focus:border-b-white focus:outline-none placeholder:text-sm w-full py-2 text-white bg-transparent border-b-2 rounded"
              placeholder="Enter your message here..."
            ></textarea>

            {errors.message && (
              <p className="py-2 text-xs text-red-500">
                {errors.message.message}
              </p>
            )}
          </div>

          <SubmitButton pending={pending} />
        </form>
      )}
    </>
  );
};

const SubmitButton = ({ pending }: { pending: boolean }) => {
  return (
    <div className="flex flex-col items-center w-full gap-5">
      <Button
        disabled={pending}
        className="bg-primary-yellow/80 hover:bg-primary-yellow/70 w-full py-3 text-center text-white"
      >
        {pending ? (
          <ClipLoader size={28} loading={pending} color="white" />
        ) : (
          "Send Message"
        )}
      </Button>
    </div>
  );
};

const SuccessMessage = ({
  setFormSubmitted,
}: {
  setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className="relative flex flex-col items-center justify-center w-full gap-4 px-4 py-5 text-green-700 bg-green-100 border border-green-400 rounded"
      role="alert"
    >
      <strong className="text-2xl font-semibold">Thank You!</strong>
      <span className="sm:inline block">We will get back to you shortly.</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg
          className="w-6 h-6 text-green-500 fill-current"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          onClick={() => setFormSubmitted(false)}
        >
          <title>Close</title>
          <path
            fillRule="evenodd"
            d="M2.293 2.293a1 1 0 011.414 0L10 8.586l6.293-6.293a1 1 0 111.414 1.414L11.414 10l6.293 6.293a1 1 0 01-1.414 1.414L10 11.414l-6.293 6.293a1 1 0 01-1.414-1.414L8.586 10 2.293 3.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </div>
  );
};

export default ContactUsForm;
