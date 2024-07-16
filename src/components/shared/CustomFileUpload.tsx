import ImagePreview from "@/components/shared/ImagePreview";
import { FileDrop } from "@instructure/ui-file-drop";
import { Upload } from "lucide-react";
import {
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

type CustomFileUploadProps<T extends FieldValues> = {
  itemName: Path<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  title: string;
  allowMultiple?: boolean;
};

const CustomFileUpload = <T extends FieldValues>({
  itemName,
  setValue,
  watch,
  title,
  allowMultiple,
}: CustomFileUploadProps<T>) => {
  return (
    <div className="flex flex-col w-full gap-5">
      <label
        htmlFor="attachment"
        className="text-primary-green text-base font-medium"
      >
        {title}
      </label>

      {/* Attachment */}
      <div className="border-secondary-gray bg-secondary-gray/50 flex flex-col w-full gap-4 p-2 border rounded-md">
        <FileDrop
          id="profilePicture"
          name="profilePicture"
          onDropAccepted={(file) => {
            setValue(itemName, file as PathValue<T, Path<T>>);
          }}
          shouldEnablePreview={true}
          shouldAllowMultiple={allowMultiple ? true : false}
          renderLabel={() => (
            <div className="flex flex-col items-center justify-center gap-5 p-5">
              <p className="flex flex-col items-center justify-center w-20 h-20 gap-1 text-sm font-medium bg-white rounded-full">
                <Upload size={40} className="text-primary-green" />
              </p>
              <p className="flex flex-col items-center w-full gap-2 text-sm font-medium text-center">
                <span className="text-black">Drag and Drop here</span>
                <span className="text-secondary-gray/50 text-lg">or</span>
                <span className="w-full p-2 text-center text-red-500 bg-white rounded">
                  Browse File
                </span>
              </p>
            </div>
          )}
        />

        {watch(itemName) && watch(itemName).length > 0 && (
          <div className="scrollbar-hide flex flex-wrap items-center gap-3 overflow-x-scroll">
            {Array.from(watch(itemName)).map((image, idx: number) => (
              <ImagePreview
                image={
                  typeof image === "string"
                    ? image
                    : URL.createObjectURL(image as File)
                }
                key={idx}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomFileUpload;
