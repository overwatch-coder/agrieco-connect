import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { MarketPlaceItemType } from "@/pages/user/MyItemsMarketPlace";
import { X } from "lucide-react";

type SellerInformationProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  item: MarketPlaceItemType;
};

const SellerInformation = ({
  openModal,
  setOpenModal,
  item,
}: SellerInformationProps) => {
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="flex flex-col w-full max-w-2xl gap-5 bg-white rounded-none">
        {/* Header */}
        <div className="flex items-start justify-between">
          <DialogTitle className="flex flex-col gap-3">
            <span className="text-primary-brown md:text-3xl text-xl font-bold">
              Seller Information
            </span>
            <span className="text-secondary-gray text-sm font-normal">
              Contact seller to purchase the item
            </span>
          </DialogTitle>

          <DialogClose className="flex items-center justify-center w-6 h-6 border border-red-500 rounded-full">
            <X size={20} className="text-red-500" />
          </DialogClose>
        </div>

        {/* Contact Seller */}
        <div className="flex flex-col w-full gap-4">
          <div className="place-content-start place-items-start text-secondary-gray grid grid-cols-2 gap-5 text-base">
            <h3>Name</h3>
            <p>{item.seller}</p>
          </div>
          <div className="place-content-start place-items-start text-secondary-gray grid grid-cols-2 gap-5 text-base">
            <h3>Location</h3>
            <p>{item.location}</p>
          </div>
          <div className="place-content-start place-items-start text-secondary-gray grid grid-cols-2 gap-5 text-base">
            <h3>Contact Details</h3>
            <p>{item.contact}</p>
          </div>
          <div className="place-content-start place-items-start text-secondary-gray grid grid-cols-2 gap-5 text-base">
            <h3>Company</h3>
            <p>{item.seller}</p>
          </div>
          <div className="place-content-start place-items-start text-secondary-gray grid grid-cols-2 gap-5 text-base">
            <h3>Others</h3>
            <p>{item.other}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SellerInformation;
