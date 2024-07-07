import { cn } from "@/lib/utils";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type CustomFormFieldProps<FormData extends FieldValues> = {
  labelName: string;
  inputName: Path<FormData>;
  errors: FieldErrors<FormData>;
  register: UseFormRegister<FormData>;
  inputType:
    | "text"
    | "date"
    | "select"
    | "textarea"
    | "time"
    | "datetime-local"
    | "hidden";
  value?: string;
  placeholderText?: string;
  className?: string;
  selectOptions?: { value: string; label: string }[];
  isInputPassword?: boolean;
  disabled?: boolean;
};

const CustomFormField = <FormData extends FieldValues>({
  labelName,
  inputName,
  errors,
  register,
  placeholderText,
  value,
  inputType,
  className,
  selectOptions,
  isInputPassword,
  disabled,
}: CustomFormFieldProps<FormData>) => {
  return (
    <div className={cn("flex flex-col space-y-4 w-full", className)}>
      {inputType !== "hidden" && (
        <label htmlFor={inputName} className="text-sm font-medium text-black">
          {labelName}
        </label>
      )}

      {inputType === "hidden" && (
        <input type="hidden" {...register(inputName)} defaultValue={value} />
      )}

      {inputType === "date" && (
        <input
          type="date"
          className="bg-primary-lightBlue placeholder:text-secondary-gray text-primary-gray/70 focus:outline-none ring-0 placeholder:text-xs w-full p-3 text-sm border-none rounded outline-none"
          {...register(inputName)}
          placeholder={placeholderText}
          defaultValue={value}
          disabled={disabled}
        />
      )}

      {inputType === "datetime-local" && (
        <input
          type="datetime-local"
          className="bg-primary-lightBlue placeholder:text-secondary-gray text-primary-gray/70 focus:outline-none ring-0 placeholder:text-xs w-full p-3 text-sm border-none rounded outline-none"
          {...register(inputName)}
          placeholder={placeholderText}
          defaultValue={value}
          disabled={disabled}
        />
      )}

      {inputType === "time" && (
        <input
          type="time"
          className="bg-primary-lightBlue placeholder:text-secondary-gray text-primary-gray/70 focus:outline-none ring-0 placeholder:text-xs w-full p-3 text-sm border-none rounded outline-none"
          {...register(inputName)}
          placeholder={placeholderText}
          defaultValue={value}
          disabled={disabled}
        />
      )}

      {inputType === "select" && (
        <select
          className="bg-primary-lightBlue placeholder:text-secondary-gray text-primary-gray/70 focus:outline-none ring-0 placeholder:text-xs w-full p-3 text-sm border-none rounded outline-none"
          {...register(inputName)}
          defaultValue={value}
          disabled={disabled}
        >
          <option value="">Select one</option>
          {selectOptions &&
            selectOptions.map((option, index) => (
              <option
                className="text-secondary-gray"
                key={index}
                value={option.value.toLowerCase()}
              >
                {option.label}
              </option>
            ))}
        </select>
      )}

      {inputType === "text" && (
        <input
          type={isInputPassword ? "password" : "text"}
          className="bg-primary-lightBlue placeholder:text-secondary-gray text-primary-gray/70 focus:outline-none ring-0 placeholder:text-xs w-full p-3 text-sm border-none rounded outline-none"
          {...register(inputName)}
          placeholder={placeholderText}
          defaultValue={value}
          disabled={disabled}
        />
      )}

      {inputType === "textarea" && (
        <textarea
          rows={5}
          className="bg-primary-lightBlue placeholder:text-secondary-gray text-primary-gray/70 focus:outline-none ring-0 placeholder:text-xs w-full p-3 text-sm border-none rounded outline-none"
          {...register(inputName)}
          placeholder={placeholderText}
          defaultValue={value}
          disabled={disabled}
        />
      )}

      {inputType !== "hidden" && errors[inputName] && (
        <p className="py-2 text-xs text-red-500">
          {errors[inputName]?.message as string}
        </p>
      )}
    </div>
  );
};

export default CustomFormField;
