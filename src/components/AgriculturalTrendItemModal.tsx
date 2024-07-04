import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { AgriculturalTrendsItemType } from "@/pages/user/AgriculturalTrends";
import { X } from "lucide-react";

type AgriculturalTrendItemModalProps = {
  item: AgriculturalTrendsItemType;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const AgriculturalTrendItemModal = ({
  item,
  openModal,
  setOpenModal,
}: AgriculturalTrendItemModalProps) => {
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="flex flex-col w-full h-[95vh] max-w-3xl gap-5 bg-white rounded-none overflow-y-scroll scrollbar-hide">
        {/* Header */}
        <div className="flex items-start justify-between">
          <DialogTitle className="flex flex-col gap-3">
            <span className="text-primary-brown md:text-2xl text-xl font-bold">
              Trend Details
            </span>
          </DialogTitle>

          <DialogClose className="flex items-center justify-center w-6 h-6 border border-red-500 rounded-full">
            <X size={20} className="text-red-500" />
          </DialogClose>
        </div>

        {/* Description */}
        <DialogDescription>
          <div className=" flex flex-col w-full h-full gap-3">
            <div className="w-full h-full md:h-[350px] xl:h-[400px] overflow-hidden">
              <img
                src={item.image}
                alt-={item.title}
                className="object-cover w-full h-full rounded"
              />
            </div>

            <div className="flex flex-col flex-1 gap-4 pb-3">
              <p className="flex flex-col gap-1 capitalize">
                <span className="text-primary-brown text-xl font-bold">
                  {item.title}
                </span>

                <span className="text-black/80 text-sm font-medium">
                  {item.category}
                </span>
              </p>

              <p className="text-secondary-gray text-sm leading-loose">
                {item.description}
              </p>

              <p className="flex flex-col gap-2 text-sm">
                <span className="text-primary-green font-semibold">
                  {item.postedBy}
                </span>
                <span className="text-secondary-gray"> {item.datePosted}</span>
              </p>

              <div className="flex flex-wrap items-center gap-5">
                {item.hashtags.map((hashtag) => (
                  <p key={hashtag} className="text-black/80 text-sm">
                    #{hashtag}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default AgriculturalTrendItemModal;
